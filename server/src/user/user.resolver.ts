import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async users(@Args('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
  }

  @Mutation(() => User)
  async createUser(
    @Args('displayName') displayName: string,
    @Args('password') password: string,
    @Args('email') email: string,
  ): Promise<User> {
    return this.userService.createUser(email, password, displayName);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('displayName') displayName: string,
    @Args('password') password: string,
    @Args('email') email: string,
  ): Promise<User> {
    return this.userService.updateUser(email, displayName, password);
  }

  @Mutation(() => User)
  async deleteUser(@Args('email') email: string): Promise<User> {
    return this.userService.deleteUser(email);
  }
}
