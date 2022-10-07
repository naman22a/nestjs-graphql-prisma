import { Field, Int, ObjectType } from '@nestjs/graphql';

export class CreateUserDto {
    name: string;
    email: string;
    password: string;
}

@ObjectType()
export class User {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;
}
