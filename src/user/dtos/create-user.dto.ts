import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, Min } from 'class-validator';

class CreateUserDto {
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
