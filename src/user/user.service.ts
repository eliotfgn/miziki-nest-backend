import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateUserDto): Promise<User> {
    payload.password = await bcrypt.hash(payload.password, 10);

    const user: User = await this.prismaService.user.create({
      data: payload,
    });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user: User = await this.prismaService.user.findUniqueOrThrow({
      where: { id }
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.prismaService.user.findUniqueOrThrow({
      where: { email }
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
}
