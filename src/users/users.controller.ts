import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  //GET /users?level=vip -> [ ... , ...]
  @Get()
  getUsers(@Query('level') level: 'premium' | 'vip') {
    const service = new UsersService();
    return service.getUsers(level);
  }
  //GET /users/:id -> {}
  @Get(':id')
  getOneUsers(@Param('id') id: string) {
    return {
      id,
    };
  }

  //Post /users -> {}
  @Post('')
  createUsers(@Body() createUserDto: CreateUserDto) {
    return {
      name: createUserDto.name,
    };
  }

  //Put /users/:id -> {}
  @Put(':id')
  updateUsers(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return {
      id,
      name: updateUserDto.name,
    };
  }

  //   //Patch /users/:id -> {}
  //   @Patch(':id')
  //   updateAttributeUsers() {
  //     return {};
  //   }

  //Delete /users/:id -> {}
  @Delete(':id')
  removeUsers() {
    return {};
  }
}
