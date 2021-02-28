import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Channel } from '../../entity/channel.entity';
import { ChannelCategory } from '../../entity/channelCategory.entity';
import { Post } from '../../entity/post.entity';
import { UserModule } from '../user/user.module';

import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([Channel, ChannelCategory, Post])],
    controllers: [ChannelController, PostController],
    providers: [ChannelService, PostService],
    exports: [ChannelService, PostService],
})
export class ChannelModule {}
