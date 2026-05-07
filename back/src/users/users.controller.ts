import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Roles, Public } from 'src/auth/decorators/auth.decorators';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './enums/user.enum';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @Public()
  @ApiOperation({
    summary: 'Crear un usuario',
    description:
      'Crea un nuevo usuario en el sistema. El email debe ser único.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado correctamente.',
    type: User,
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe un usuario con ese email.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(UserRole.OWNER)
  @Get()
  @ApiOperation({
    summary: 'Listar usuarios',
    description:
      'Obtiene todos los usuarios con sus relaciones disponibles (seller y client). Requiere rol OWNER.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida correctamente.',
    type: [User],
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado por rol.',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(UserRole.OWNER)
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un usuario por ID',
    description:
      'Busca un usuario específico por su ID. Requiere rol OWNER.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del usuario',
    example: '5b7e5e63-ef54-4a9a-8c3c-1a0f34f0f1a2',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado correctamente.',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado por rol.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Roles(UserRole.OWNER)
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un usuario',
    description:
      'Actualiza los datos de un usuario existente. Requiere rol OWNER.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del usuario',
    example: '5b7e5e63-ef54-4a9a-8c3c-1a0f34f0f1a2',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente.',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado por rol.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe otro usuario con ese email.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(UserRole.OWNER)
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description:
      'Elimina un usuario del sistema. Requiere rol OWNER.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del usuario',
    example: '5b7e5e63-ef54-4a9a-8c3c-1a0f34f0f1a2',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado correctamente.',
    schema: {
      example: {
        message:
          'User with id 5b7e5e63-ef54-4a9a-8c3c-1a0f34f0f1a2 deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado por rol.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}