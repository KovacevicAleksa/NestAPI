import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Query,
  Body,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/admin/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query('level') level?: 'premium' | 'vip') {
    return await this.usersService.getUsers(level);
  }

  @Get(':id')
  async getOneUsers(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.usersService.getUser(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @UseGuards(AdminGuard)
  @Post('')
  async createUsers(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  async updateUsers(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async removeUsers(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.usersService.removeUser(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
