import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { MyContext, OkResponse } from '../../../types';
import { UsersService } from '../../../users/services';
import { LoginDto, RegisterDto } from '../../types';
import * as argon2 from 'argon2';
import { COOKIE_NAME } from '../../../constants';

@Resolver()
export class AuthResolver {
    constructor(private usersService: UsersService) {}

    @Mutation(() => OkResponse)
    async register(
        @Args('registerDto') registerDto: RegisterDto,
        @Context() { req }: MyContext,
    ): Promise<OkResponse> {
        const { name, email, password } = registerDto;

        const userExists = await this.usersService.findOneByEmail(email);
        if (userExists) {
            return {
                ok: false,
                errors: [{ field: 'email', message: 'Email already in use' }],
            };
        }

        const hashedPassword = await argon2.hash(password);

        const user = await this.usersService.create({
            name,
            email,
            password: hashedPassword,
        });

        req.session.userId = user.id;

        return { ok: true };
    }

    @Mutation(() => OkResponse)
    async login(
        @Args('loginDto') loginDto: LoginDto,
        @Context() { req }: MyContext,
    ): Promise<OkResponse> {
        const { email, password } = loginDto;

        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            return {
                ok: false,
                errors: [{ field: 'email', message: 'User not found' }],
            };
        }

        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return {
                ok: false,
                errors: [{ field: 'password', message: 'Incorrect password' }],
            };
        }

        req.session.userId = user.id;

        return { ok: true };
    }

    @Mutation(() => Boolean)
    logout(@Context() { req, res }: MyContext): Promise<boolean> {
        return new Promise((resolve) =>
            req.session.destroy((error) => {
                if (error) {
                    resolve(false);
                }
                res.clearCookie(COOKIE_NAME);
                resolve(true);
            }),
        );
    }
}
