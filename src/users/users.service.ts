import { Injectable } from '@nestjs/common';

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
}
