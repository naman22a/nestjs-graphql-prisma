import { Module } from '@nestjs/common';
import { UsersService } from './services';
import { UsersResolver } from './resolvers';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
})
export class UsersModule {}
