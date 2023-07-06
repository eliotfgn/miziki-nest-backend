import { Injectable } from '@nestjs/common';
import { CreateUser } from "../dtos/create-user.dto";
import { UserService } from "../user.service";
import { User } from "@prisma/client";

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(payload: CreateUser): Promise<User> {
    return await this.userService.create(payload);
  }

  async login(payload: LoginRequest) {

  }
}
