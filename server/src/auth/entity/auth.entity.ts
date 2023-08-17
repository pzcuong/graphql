import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
