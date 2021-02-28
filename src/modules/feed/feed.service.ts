import { Injectable, Logger } from '@nestjs/common';
import { union, sortBy } from 'lodash';

import { ChannelService } from '../channel/channel.service';
import { channelMapper } from '../channel/mappers/channel.mapper';
import { postMapper } from '../channel/mappers/post.mapper';
import { PostService } from '../channel/post/post.service';

import { FeedResponseDto } from './dto/feed.response.dto';

@Injectable()
export class FeedService {
    constructor(private readonly channelService: ChannelService, private readonly postService: PostService) {}

    private readonly logger = new Logger(FeedService.name);

    async generateFeed(): Promise<FeedResponseDto> {
        const posts = await this.postService.findAll();
        const channels = await this.channelService.findAll();

        const postsDto = posts.map((post) => postMapper.toDto(post));
        const channelsDto = channels.map((channel) => channelMapper.toDto(channel));
        const feed = union(postsDto, channelsDto);

        return {
            data: sortBy(feed, (i) => i.updatedAt),
        };
    }
}
