import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './resolvers';

@Module({
    imports: [UsersModule],
    providers: [AuthResolver],
})
export class AuthModule {}
