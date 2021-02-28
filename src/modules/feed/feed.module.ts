import { Module } from '@nestjs/common';

import { ChannelModule } from '../channel/channel.module';

import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
    imports: [ChannelModule],
    controllers: [FeedController],
    providers: [FeedService],
    exports: [FeedService],
})
export class FeedModule {}
