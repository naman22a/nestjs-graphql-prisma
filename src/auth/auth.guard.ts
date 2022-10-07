import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MyContext } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const { req } = GqlExecutionContext.create(
            context,
        ).getContext() as MyContext;

        if (!req.session.userId) {
            throw new UnauthorizedException();
        }

        return true;
    }
}
