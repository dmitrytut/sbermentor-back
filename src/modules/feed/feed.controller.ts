import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FeedResponseDto } from './dto/feed.response.dto';
import { FeedService } from './feed.service';

@Controller('feed')
@UseGuards(JwtAuthGuard)
export class FeedController {
    constructor(private readonly feedService: FeedService) {}

    @Get()
    public async generateFeed(): Promise<FeedResponseDto> {
        return this.feedService.generateFeed();
    }
}
