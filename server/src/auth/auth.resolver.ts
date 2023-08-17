import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Resolver } from '@nestjs/graphql';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { AuthGuard } from './auth.guard';
import { GetCurrentUser } from 'src/decorators/get-current-user.decorator';
import { LoginResponse, UserProfile } from './dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.authService.login(email, password);
  }

  @Query(() => UserProfile)
  @UseGuards(AuthGuard)
  async getMe(@GetCurrentUser() user: any) {
    return await this.authService.getMe(user);
  }
}
