import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { EntityManager, getManager, Repository } from 'typeorm';

import { Post } from '../../../entity/post.entity';
import { UserService } from '../../user/user.service';
import { PostDto } from '../dto/post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly userService: UserService,
    ) {}

    private readonly logger = new Logger(PostService.name);

    async findAll(): Promise<Post[]> {
        return this.postRepository.find();
    }

    async findById(id: string): Promise<Post> {
        const post = await this.postRepository.findOneOrFail(id);
        if (!post.id) {
            throw new NotFoundException('Post not found');
        }
        await this.updateViews(post.id, post.viewsCount);

        return post;
    }

    async updateViews(id: string, viewsCount: number): Promise<void> {
        await this.postRepository.update(id, { viewsCount });
    }

    async savePost(data: PostDto, channelId: string, userId: string): Promise<Post> {
        if (!data.id) {
            // Create.
            (data as any).createdBy = { id: userId };
            if (!data.points) {
                (data as any).points = 10;
            }
        } else {
            // Update.
        }
        (data as any).channel = { id: channelId };

        const post = await this.postRepository.save(data);

        return this.postRepository.findOne(post.id);
    }

    async markAsComplete(postId: string, userId: string): Promise<Post> {
        const post = await this.findById(postId);
        const isPostCompleted = await this.userService.isPostCompleted(userId, postId);
        if (!isPostCompleted) {
            post.completedUsers = [...post.completedUsers, { id: userId } as User];
            await getManager().transaction(async (transactionManager: EntityManager) => {
                await transactionManager.save(post);
                await this.userService.addPoints(userId, post.points);
            });
        }

        return this.postRepository.findOne(post.id);
    }
}
