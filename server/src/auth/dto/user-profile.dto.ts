import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserProfile {
  @Field()
  id: string;

  @Field()
  displayName: string;

  @Field()
  email: string;
}
