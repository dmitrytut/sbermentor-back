import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { entityMapper } from '../entity/mappers/entity.mapper';

import { TagService } from './tag.service';
import { TagResponseDto } from './dto/tag.response.dto';

@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get()
    public async getAll(): Promise<TagResponseDto[]> {
        const tags = await this.tagService.getAll();

        return tags.map((tag) => entityMapper.toDto(tag));
    }
}
