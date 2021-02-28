import { Channel } from '../../../entity/channel.entity';
import { IMapper } from '../../../common/interfaces/IMapper';
import { entityMapper } from '../../entity/mappers/entity.mapper';
import { ChannelDto } from '../dto/channel.dto';
import { ChannelResponseDto } from '../dto/channel.response.dto';
import { userMapper } from '../../user/mappers/user.mapper';
import { postMapper } from './post.mapper';

export class ChannelMapper implements IMapper<Channel, ChannelDto, ChannelResponseDto> {
    toDto(entity: Channel): ChannelResponseDto {
        let channelDto: ChannelResponseDto = {
            id: entity.id,
            title: entity.title,
            description: entity.description,
            order: entity.order,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            startDate: entity.startDate,
            category: entity.category ? entityMapper.toDto(entity.category) : null,
            tags: entity.tags?.map((tag) => entityMapper.toDto(tag)) || [],
            createdBy: entity.createdBy && userMapper.toDto(entity.createdBy),
            posts: entity.posts?.map((post) => postMapper.toDto(post)) || [],
            postsCount: entity.posts?.length || 0,
            subscribersCount: 0,
        };

        if (entity.subscribers) {
            channelDto = {
                ...channelDto,
                subscribers: entity.subscribers.map((subscriber) => userMapper.toDto(subscriber)),
                subscribersCount: entity.subscribers.length,
            };
        }

        if (entity.authors) {
            channelDto = {
                ...channelDto,
                authors: entity.authors.map((subscriber) => userMapper.toDto(subscriber)),
            };
        }

        return channelDto;
    }
}

export const channelMapper = new ChannelMapper();
