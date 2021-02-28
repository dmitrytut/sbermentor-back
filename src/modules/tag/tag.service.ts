import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChannelCategory } from '../../entity/channelCategory.entity';
import { Tag } from '../../entity/tag.entity';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ) {}

    private readonly logger = new Logger(TagService.name);

    async getAll(): Promise<ChannelCategory[]> {
        return this.tagRepository.find();
    }
}
