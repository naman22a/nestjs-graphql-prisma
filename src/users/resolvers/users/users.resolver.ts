import { Context, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../../services';
import { User } from '../../types';
import { User as IUser } from '@prisma/client';
import { MyContext } from '../../../types';
import { AuthGuard } from '../../../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('User')
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Query(() => [User])
    async users(): Promise<IUser[]> {
        return await this.usersService.findAll();
    }

    @Query(() => User)
    @UseGuards(AuthGuard)
    async me(@Context() { req }: MyContext): Promise<IUser> {
        return await this.usersService.findOneById(req.session.userId);
    }
}
