import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const validateUser = await this.validateUser(email, password);
    if (!validateUser) {
      throw new Error('Invalid credentials');
    }
    const payload = { email: validateUser.email, id: validateUser.id };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      ...validateUser,
      access_token: token,
    };
  }

  async getMe(user: any) {
    return await this.usersService.getUserByEmail(user.email);
  }
}
