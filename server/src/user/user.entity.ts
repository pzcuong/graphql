import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  displayName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
