import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../../../auth/auth.guard';
import { MyContext, OkResponse } from '../../../types';
import { PostsService } from '../../services';
import { CreatePostDto, Post, PostAndUser, UpdatePostDto } from '../../types';

@Resolver()
export class PostsResolver {
    constructor(private postsService: PostsService) {}

    @Query(() => [PostAndUser])
    async posts() {
        return await this.postsService.findAll();
    }

    @Query(() => [Post])
    @UseGuards(AuthGuard)
    async myPosts(@Context() { req }: MyContext) {
        const { userId } = req.session;
        return await this.postsService.findMyAll(userId);
    }

    @Mutation(() => Post)
    @UseGuards(AuthGuard)
    async createPost(
        @Args('createPostDto') post: CreatePostDto,
        @Context() { req }: MyContext,
    ) {
        const { userId } = req.session;
        return await this.postsService.create(userId, post);
    }

    @Mutation(() => OkResponse)
    @UseGuards(AuthGuard)
    async deletePost(
        @Args('id', { type: () => Int }) id: number,
        @Context() { req }: MyContext,
    ): Promise<OkResponse> {
        const { userId } = req.session;
        const x = await this.postsService.delete(userId, id);
        if (x.count === 0) {
            return {
                ok: false,
                errors: [{ field: 'id', message: 'No post found' }],
            };
        }
        return { ok: true };
    }

    @Mutation(() => OkResponse)
    @UseGuards(AuthGuard)
    async updatePost(
        @Args('id', { type: () => Int }) id: number,
        @Context() { req }: MyContext,
        @Args('updatePostDto') post: UpdatePostDto,
    ): Promise<OkResponse> {
        const { userId } = req.session;
        const x = await this.postsService.update(userId, id, post);

        if (!x) {
            return {
                ok: false,
                errors: [{ field: 'id', message: 'No post found' }],
            };
        }

        return { ok: true };
    }
}
