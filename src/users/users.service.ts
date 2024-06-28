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

  async getUsers(level?: 'premium' | 'vip'): Promise<any[]> {
    if (level) {
      return this.users.filter((user) => user.level === level);
    }
    return this.users;
  }

  async getUser(id?: number): Promise<any> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const newUser = {
      ...createUserDto,
      id: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.getUser(id);
  }

  async removeUser(id: number): Promise<any> {
    const toBeRemoved = await this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return toBeRemoved;
  }
}
