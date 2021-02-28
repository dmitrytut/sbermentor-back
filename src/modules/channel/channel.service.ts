import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareAsc, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

import { Channel } from '../../entity/channel.entity';
import { ChannelCategory } from '../../entity/channelCategory.entity';

import { ChannelDto } from './dto/channel.dto';
import { PostDto } from './dto/post.dto';
import { EPostType } from './post/enums';
import { PostService } from './post/post.service';

@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Channel)
        private readonly channelRepository: Repository<Channel>,
        @InjectRepository(ChannelCategory)
        private readonly categoryRepository: Repository<ChannelCategory>,
        private readonly postService: PostService,
    ) {}

    private readonly logger = new Logger(ChannelService.name);

    async getCategories(): Promise<ChannelCategory[]> {
        return this.categoryRepository.find();
    }

    async findAll(): Promise<Channel[]> {
        return this.channelRepository.find({
            relations: ['category', 'tags', 'createdBy', 'authors', 'posts'],
        });
    }

    async saveChannel(data: ChannelDto, userId: string): Promise<Channel> {
        let channelDto = { ...data };
        let channel: Channel;
        if (!data.id) {
            // Create.
            channelDto = {
                ...channelDto,
                createdBy: { id: userId },
                authors: [...(channelDto.authors || []), { id: userId }],
            } as ChannelDto;

            channel = await this.channelRepository.save(channelDto);

            // If start date is after today.
            if (!channel.startDate || compareAsc(new Date(channel.startDate), new Date()) === 1) {
                let title = `Анонс канала '${channel.title}'`;
                if (channel.startDate) {
                    title = `${title}. Стартует ${format(new Date(channel.startDate), 'dd MMMM yyyy', { locale: ru })}`;
                }
                // Create announcement post.
                const postData: PostDto = {
                    id: undefined,
                    type: EPostType.ANNOUNCEMENT,
                    title,
                    description: channel.description,
                    order: undefined,
                };
                await this.postService.savePost(postData, channel.id, userId);
            }
        } else {
            // Update.
            channel = await this.channelRepository.save(channelDto);
        }

        return this.channelRepository.findOne(channel.id, {
            relations: ['category', 'tags', 'createdBy', 'authors', 'posts'],
        });
    }

    async toggleSubscribe(id: string, userId: string): Promise<Channel> {
        let channel = await this.channelRepository
            .createQueryBuilder('channel')
            .leftJoinAndSelect('channel.subscribers', 'subscribers')
            .where(`channel.id = '${id}'`)
            .getOne();
        if (!channel.id) {
            throw new NotFoundException('Channel not found');
        }
        if (channel.subscribers) {
            const userIndex = channel.subscribers.findIndex((i) => i.id === userId);
            if (userIndex > -1) {
                // Unsubscribe.
                channel.subscribers.splice(userIndex, 1);
            } else {
                // Subscribe.
                channel.subscribers.push({ id: userId } as User);
            }
        } else {
            channel.subscribers = [{ id: userId } as User];
        }

        await this.channelRepository.save(channel);

        channel = await this.channelRepository
            .createQueryBuilder('channel')
            .leftJoinAndSelect('channel.subscribers', 'subscribers')
            .leftJoinAndSelect('channel.createdBy', 'createdBy')
            .where(`channel.id = '${id}'`)
            .getOne();

        return channel;
    }
}
