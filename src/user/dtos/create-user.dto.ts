import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export interface CreateUser {
  email: string;
  username: string;
  password: string;
  profilePic?: string;
  role: Role;
}

export class CreateUserDto implements CreateUser {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @Matches('^[a-zA-Z0-9!@#$%^&*_~]{8,32}$\n')
  password: string;

  @IsString()
  @IsOptional()
  profilePic?: string;

  @IsNotEmpty()
  role: Role;
}
