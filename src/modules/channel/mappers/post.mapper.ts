import { IMapper } from '../../../common/interfaces/IMapper';
import { Post } from '../../../entity/post.entity';
import { entityMapper } from '../../entity/mappers/entity.mapper';
import { userMapper } from '../../user/mappers/user.mapper';
import { PostDto } from '../dto/post.dto';
import { PostResponseDto } from '../dto/post.response.dto';
import { channelMapper } from './channel.mapper';

export class PostMapper implements IMapper<Post, PostDto, PostResponseDto> {
    toDto(entity: Post, userId?: string): PostResponseDto {
        return {
            ...entityMapper.toDto(entity),
            type: entity.type,
            content: entity.content,
            durationInMinutes: entity.durationInMinutes,
            points: entity.points,
            viewsCount: entity.viewsCount,
            likesCount: entity.likesCount,
            completed: userId && entity.completedUsers?.some((u) => u.id === userId),
            channel: entity.channel && channelMapper.toDto(entity.channel),
            createdBy: entity.createdBy && userMapper.toDto(entity.createdBy),
            tags: entity.tags?.map((tag) => entityMapper.toDto(tag)) || [],
            completedUsers: entity.completedUsers?.map((user) => userMapper.toDto(user)) || [],
        };
    }
}

export const postMapper = new PostMapper();
