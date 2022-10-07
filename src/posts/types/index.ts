import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { MinLength, ValidateIf } from 'class-validator';
import { User } from '../../users/types';

@ObjectType()
export class Post {
    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    content: string;
}

@ObjectType()
export class PostAndUser {
    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field(() => User)
    user: User;
}

@InputType()
export class CreatePostDto {
    @MinLength(5)
    @Field()
    title: string;

    @MinLength(10)
    @Field()
    content: string;
}

@InputType()
export class UpdatePostDto {
    @ValidateIf((o: UpdatePostDto) => typeof o.content === 'undefined')
    @MinLength(5)
    @Field(() => String, { nullable: true })
    title: string;

    @ValidateIf((o: UpdatePostDto) => typeof o.title === 'undefined')
    @MinLength(10)
    @Field(() => String, { nullable: true })
    content: string;
}
