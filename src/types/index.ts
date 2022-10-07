import { Field, ObjectType } from '@nestjs/graphql';
import { Request, Response } from 'express';

@ObjectType()
export class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
export class OkResponse {
    @Field()
    ok: boolean;

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
}

export interface MyContext {
    req: Request;
    res: Response;
}
