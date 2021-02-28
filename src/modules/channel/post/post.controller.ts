import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PostResponseDto } from '../dto/post.response.dto';
import { postMapper } from '../mappers/post.mapper';

import { PostService } from './post.service';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get(':id')
    public async getPost(@Req() req: any, @Param() params: any): Promise<PostResponseDto> {
        const post = await this.postService.findById(params.id);

        return postMapper.toDto(post, req.user.id);
    }

    @Patch(':id/complete')
    public async markAsComplete(@Req() req: any, @Param() params: any): Promise<PostResponseDto> {
        const post = await this.postService.markAsComplete(params.id, req.user.id);

        return postMapper.toDto(post, req.user.id);
    }
}
