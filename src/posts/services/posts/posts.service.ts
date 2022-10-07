import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from '../../types';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.post.findMany({ include: { user: true } });
    }

    async findMyAll(userId: number) {
        return await this.prisma.post.findMany({
            where: { userId },
        });
    }

    async create(userId: number, post: CreatePostDto) {
        return await this.prisma.post.create({
            data: {
                ...post,
                userId,
            },
        });
    }

    async delete(userId: number, id: number) {
        return await this.prisma.post.deleteMany({
            where: { id, userId },
        });
    }

    async update(userId: number, id: number, post: UpdatePostDto) {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: {
                    posts: { update: { where: { id }, data: { ...post } } },
                },
            });
        } catch (error) {
            if (error.code === 'P2016') {
                return null;
            }
            console.error(error);
            return null;
        }
    }
}
