import { IMapper } from '../../../common/interfaces/IMapper';
import { User } from '../../../entity/user.entity';
import { channelMapper } from '../../channel/mappers/channel.mapper';
import { postMapper } from '../../channel/mappers/post.mapper';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';

export class UserMapper implements IMapper<User, CreateUserDto, UserDto> {
    toDto(entity: User, extended = false): UserDto {
        let userDto: UserDto = {
            id: entity.id,
            firstName: entity.firstName,
            lastName: entity.lastName,
            lastLoginAt: entity.lastLoginAt,
        };

        if (extended) {
            userDto = {
                ...userDto,
                points: entity.points,
                channels: entity.channels?.map((channel) => channelMapper.toDto(channel)) || [],
                subscriptions: entity.subscriptions?.map((subscription) => channelMapper.toDto(subscription)) || [],
                completedPosts: entity.completedPosts?.map((post) => postMapper.toDto(post, entity.id)) || [],
            };
        }

        return userDto;
    }
}

export const userMapper = new UserMapper();
