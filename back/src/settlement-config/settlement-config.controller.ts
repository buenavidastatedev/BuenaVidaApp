import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SettlementConfigService } from './settlement-config.service';
import { CreateSettlementConfigDto } from './dto/create-settlement-config.dto';
import { UpdateSettlementConfigDto } from './dto/update-settlement-config.dto';
import { Roles } from '../auth/decorators/auth.decorators';
import { UserRole } from '../users/enums/user.enum';

@ApiTags('Settlement Config')
@ApiBearerAuth()
@Controller('settlement-config')
export class SettlementConfigController {
  constructor(
    private readonly settlementConfigService: SettlementConfigService,
  ) {}

  @Roles(UserRole.OWNER)
  @Post()
  @ApiOperation({ summary: 'Crear configuración de liquidación' })
  create(@Body() createSettlementConfigDto: CreateSettlementConfigDto) {
    return this.settlementConfigService.create(createSettlementConfigDto);
  }

  @Roles(UserRole.OWNER)
  @Get()
  @ApiOperation({ summary: 'Listar configuraciones de liquidación' })
  findAll() {
    return this.settlementConfigService.findAll();
  }

  @Roles(UserRole.OWNER)
  @Get('active')
  @ApiOperation({ summary: 'Obtener configuración activa' })
  findActive() {
    return this.settlementConfigService.findActive();
  }

  @Roles(UserRole.OWNER)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener configuración por ID' })
  findOne(@Param('id') id: string) {
    return this.settlementConfigService.findOne(id);
  }

  @Roles(UserRole.OWNER)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar configuración de liquidación' })
  update(
    @Param('id') id: string,
    @Body() updateSettlementConfigDto: UpdateSettlementConfigDto,
  ) {
    return this.settlementConfigService.update(id, updateSettlementConfigDto);
  }

  @Roles(UserRole.OWNER)
  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activar configuración de liquidación' })
  activate(@Param('id') id: string) {
    return this.settlementConfigService.activate(id);
  }

  @Roles(UserRole.OWNER)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar configuración de liquidación' })
  remove(@Param('id') id: string) {
    return this.settlementConfigService.remove(id);
  }
}