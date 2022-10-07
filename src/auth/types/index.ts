import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
    @IsNotEmpty()
    @Field()
    name: string;

    @IsEmail()
    @Field()
    email: string;

    @MinLength(6)
    @Field()
    password: string;
}

@InputType()
export class LoginDto {
    @IsEmail()
    @Field()
    email: string;

    @IsNotEmpty()
    @Field()
    password: string;
}
