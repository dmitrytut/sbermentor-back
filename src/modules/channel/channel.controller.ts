import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { entityMapper } from '../entity/mappers/entity.mapper';

import { ChannelService } from './channel.service';
import { ChannelCategoryResponseDto } from './dto/channel-category.response.dto';
import { ChannelDto } from './dto/channel.dto';
import { ChannelResponseDto } from './dto/channel.response.dto';
import { PostDto } from './dto/post.dto';
import { PostResponseDto } from './dto/post.response.dto';
import { channelMapper } from './mappers/channel.mapper';
import { postMapper } from './mappers/post.mapper';
import { PostService } from './post/post.service';

@Controller('channels')
@UseGuards(JwtAuthGuard)
export class ChannelController {
    constructor(private readonly channelService: ChannelService, private readonly postService: PostService) {}

    @Get('categories')
    public async getCategories(): Promise<ChannelCategoryResponseDto[]> {
        const categories = await this.channelService.getCategories();

        return categories.map((category) => entityMapper.toDto(category));
    }

    @Get()
    public async getChannels(): Promise<ChannelResponseDto[]> {
        const channels = await this.channelService.findAll();

        return channels.map((channel) => channelMapper.toDto(channel));
    }

    @Post()
    public async create(@Req() req: any, @Body() channelData: ChannelDto): Promise<ChannelResponseDto> {
        if (!req.user?.id) {
            throw new BadRequestException('Invalid User object in request');
        }
        const channel = await this.channelService.saveChannel(channelData, req.user.id);

        return channelMapper.toDto(channel);
    }

    @Patch(':id/subscribe')
    public async subscribe(@Req() req: any, @Param() params: any): Promise<ChannelResponseDto> {
        if (!req.user?.id) {
            throw new BadRequestException('Invalid User object in request');
        }
        const channel = await this.channelService.toggleSubscribe(params.id, req.user.id);

        return channelMapper.toDto(channel);
    }

    @Post(':id/posts')
    public async createPost(
        @Param() params: any,
        @Req() req: any,
        @Body() postData: PostDto,
    ): Promise<PostResponseDto> {
        if (!req.user?.id) {
            throw new BadRequestException('Invalid User object in request');
        }
        const post = await this.postService.savePost(postData, params.id, req.user.id);

        return postMapper.toDto(post);
    }
}
