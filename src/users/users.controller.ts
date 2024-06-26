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
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  //GET /users?level=vip -> [ ... , ...]
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getUsers(@Query('level') level?: 'premium' | 'vip') {
    return this.usersService.getUsers(level);
  }

  //GET /users/:id -> {}
  @Get(':id')
  getOneUsers(@Param('id') id: string) {
    try {
      return this.usersService.getUser(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //Post /users -> {}
  @Post('')
  createUsers(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  //Put /users/:id -> {}
  @Put(':id')
  updateUsers(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  //   //Patch /users/:id -> {}
  //   @Patch(':id')
  //   updateAttributeUsers() {
  //     return {};
  //   }

  //Delete /users/:id -> {}
  @Delete(':id')
  removeUsers(@Param('id') id: string) {
    try {
      return this.usersService.removeUser(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
