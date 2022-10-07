import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { MyContext } from './types';
import { PostsModule } from './posts/posts.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req, res }): MyContext => ({ req, res }),
        }),
        UsersModule,
        AuthModule,
        PostsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
