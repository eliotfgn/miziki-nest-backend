import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUser } from "../dtos/create-user.dto";
import { UserService } from "../user.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
    ) {}
  async register(payload: CreateUser): Promise<User> {
    return await this.userService.create(payload);
  }

  async login(payload: LoginRequest): Promise<string> {
    const user: User = await this.userService.findByEmail(payload.email);

    const validPassword: boolean = await bcrypt.compare(payload.password, user.password);
    if (validPassword) {
      return await this.jwtService.signAsync({sub: user.id, username: user.username});
    } else {
      throw new UnauthorizedException();
    }
  }
}
