import { Injectable, Logger } from '@nestjs/common';
import { union, sortBy } from 'lodash';

import { ChannelService } from '../channel/channel.service';
import { PostService } from '../channel/post/post.service';

import { FeedResponseDto } from './dto/feed.response.dto';

@Injectable()
export class FeedService {
    constructor(private readonly channelService: ChannelService, private readonly postService: PostService) {}

    private readonly logger = new Logger(FeedService.name);

    async generateFeed(): Promise<FeedResponseDto> {
        const posts = await this.postService.findAll();
        const channels = await this.channelService.findAll();

        const feed = union(posts, channels);

        return {
            data: sortBy(feed, (i) => i.updatedAt),
        };
    }
}
