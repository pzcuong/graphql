import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  id: string;

  @Field()
  displayName: string;

  @Field()
  email: string;

  @Field()
  access_token: string;
}
