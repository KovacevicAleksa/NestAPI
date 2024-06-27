import { MinLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  name: string;

  @IsEnum(['premium', 'vip', 'vip+'], { message: 'use correct level' })
  level: 'premium' | 'vip' | 'vip+';
}
