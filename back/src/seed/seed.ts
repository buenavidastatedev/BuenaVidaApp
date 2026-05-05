import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Winery } from '../wineries/entities/winery.entity';
import { Product } from '../products/entities/product.entity';
import { Stock } from '../stock/entities/stock.entity';
import { Seller } from '../sellers/entities/seller.entity';
import { Client } from '../clients/entities/client.entity';
import { UserRole, OAuthProvider } from '../users/enums/user.enum';
import * as bcrypt from 'bcrypt';

export async function seed(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const wineryRepo = dataSource.getRepository(Winery);
  const productRepo = dataSource.getRepository(Product);
  const stockRepo = dataSource.getRepository(Stock);
  const sellerRepo = dataSource.getRepository(Seller);
  const clientRepo = dataSource.getRepository(Client);

  console.log('🌱 Seeding database...');

  // ─────────────────────────────
  // 🍷 WINERY
  // ─────────────────────────────
  let winery = await wineryRepo.findOne({
    where: { name: 'Bodega Demo' },
  });

  if (!winery) {
    winery = wineryRepo.create({
      name: 'Bodega Demo',
      description: 'Vinos de prueba',
    });

    await wineryRepo.save(winery);
  }

  // ─────────────────────────────
  // 👤 SELLER USER
  // ─────────────────────────────
  let sellerUser = await userRepo.findOne({
    where: { email: 'seller@demo.com' },
  });

  if (!sellerUser) {
    sellerUser = userRepo.create({
      email: 'seller@demo.com',
      firstname: 'Seller',
      password: await bcrypt.hash('123456', 10),
      role: UserRole.SELLER,
      provider: OAuthProvider.LOCAL,
    });

    await userRepo.save(sellerUser);
  }

  // ─────────────────────────────
  // 🧑‍💼 SELLER
  // ─────────────────────────────
  let seller = await sellerRepo.findOne({
    where: { user: { id: sellerUser.id } },
    relations: ['user'],
  });

  if (!seller) {
    seller = sellerRepo.create({
      user: sellerUser,
      // 👉 SOLO si ya agregaste la relación
      // winery,
    });

    await sellerRepo.save(seller);
  }

  // ─────────────────────────────
  // 👥 CLIENTES
  // ─────────────────────────────
  const clientEmails = ['cliente1@demo.com', 'cliente2@demo.com'];

  for (const email of clientEmails) {
    let user = await userRepo.findOne({ where: { email } });

    if (!user) {
      user = userRepo.create({
        email,
        firstname: email.split('@')[0],
        password: await bcrypt.hash('123456', 10),
        role: UserRole.CLIENT,
        provider: OAuthProvider.LOCAL,
      });

      await userRepo.save(user);
    }

    let client = await clientRepo.findOne({
      where: { user: { id: user.id } },
      relations: ['user'],
    });

    if (!client) {
      client = clientRepo.create({
        user,
        name: user.firstname,
        address: 'Dirección de prueba',
        phone: '123456789',
        seller, // 👈 clave para relación
      });

      await clientRepo.save(client);
    }
  }

  // ─────────────────────────────
  // 🍷 PRODUCTS
  // ─────────────────────────────
  const productNames = ['Malbec', 'Cabernet', 'Chardonnay'];

  const products: Product[] = [];

  for (const name of productNames) {
    let product = await productRepo.findOne({
      where: { name, winery: { id: winery.id } },
      relations: ['winery'],
    });

    if (!product) {
      product = productRepo.create({
        name,
        price: name === 'Cabernet' ? 14000 : name === 'Malbec' ? 12000 : 11000,
        winery,
      });

      await productRepo.save(product);
    }

    products.push(product);
  }

  // ─────────────────────────────
  // 📦 STOCK
  // ─────────────────────────────
  for (const product of products) {
    const existingStock = await stockRepo.findOne({
      where: { product: { id: product.id } },
      relations: ['product'],
    });

    if (!existingStock) {
      const stock = stockRepo.create({
        product,
        quantity: 100,
        minStock: 10,
      });

      await stockRepo.save(stock);
    }
  }

  console.log('✅ Seed completo con usuarios, seller y clientes');
}
