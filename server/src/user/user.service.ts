import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async createUser(email: string, password: string, displayName: string) {
    if (await this.getUserByEmail(email)) {
      throw new Error('User already exists');
    }
    password = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        displayName,
      },
    });
    return user;
  }

  async updateUser(email: string, displayName: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (displayName === '') displayName = user.displayName;

    if (password === '') password = user.password;
    else password = await bcrypt.hash(password, 10);

    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        displayName,
        password,
      },
    });
    return updatedUser;
  }

  async deleteUser(email: string) {
    const user = await this.getUserByEmail(email);
    const deletedUser = await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    return deletedUser;
  }
}
