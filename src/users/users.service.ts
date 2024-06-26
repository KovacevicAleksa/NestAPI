import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 0,
      name: 'PremiumKorisnik',
      level: 'premium',
    },
    { id: 1, name: 'VipKorisnik', level: 'vip' },
  ];

  getUsers(level?: 'premium' | 'vip') {
    if (level) {
      return this.users.filter((user) => user.level === level);
    }
    return this.users;
  }

  getUser(id?: number) {
    const user = this.users.filter((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      id: Date.now(),
    };
    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }

      return user;
    });
    return this.getUser(id);
  }

  removeUser(id: number) {
    const toBeRemoved = this.getUser(id);

    this.users = this.users.filter((user) => user.id !== id);

    return toBeRemoved;
  }
}
