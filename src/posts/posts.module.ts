import { Module } from '@nestjs/common';
import { PostsService } from './services';
import { PostsResolver } from './resolvers';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [PostsService, PostsResolver],
})
export class PostsModule {}
