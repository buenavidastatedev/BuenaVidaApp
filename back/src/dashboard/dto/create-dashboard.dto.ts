import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateDashboardDto {
  @ApiPropertyOptional({
    example: '2026-04-01',
    description: 'Fecha inicial para filtrar métricas.',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2026-04-30',
    description: 'Fecha final para filtrar métricas.',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    example: '63eadd94-c1bc-404e-b641-d9fbbce62abf',
    description: 'ID de bodega para filtrar métricas.',
  })
  @IsOptional()
  @IsUUID()
  wineryId?: string;
}