import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
      withDeleted: false,
    });

    if (existingUser) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    const user = this.userRepository.create(createUserDto);

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['seller', 'client'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['seller', 'client'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (
      updateUserDto.email &&
      updateUserDto.email !== user.email
    ) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException(
          `User with email ${updateUserDto.email} already exists`,
        );
      }

      user.email = updateUserDto.email;
    }

    if (updateUserDto.firstname !== undefined) {
      user.firstname = updateUserDto.firstname;
    }

    if (updateUserDto.lastname !== undefined) {
      user.lastname = updateUserDto.lastname;
    }

    if (updateUserDto.avatarUrl !== undefined) {
      user.avatarUrl = updateUserDto.avatarUrl;
    }

    if (updateUserDto.password !== undefined) {
      user.password = updateUserDto.password;
    }

    if (updateUserDto.role !== undefined) {
      user.role = updateUserDto.role;
    }

    if (updateUserDto.provider !== undefined) {
      user.provider = updateUserDto.provider;
    }

    if (updateUserDto.providerId !== undefined) {
      user.providerId = updateUserDto.providerId;
    }

    if (updateUserDto.refreshToken !== undefined) {
      user.refreshToken = updateUserDto.refreshToken;
    }

    if (updateUserDto.isActive !== undefined) {
      user.isActive = updateUserDto.isActive;
    }

    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);

    return {
      message: `User with id ${id} deleted successfully`,
    };
  }
}