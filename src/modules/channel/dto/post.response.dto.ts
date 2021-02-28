import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { EntityResponseDto } from '../../entity/dto/entity.response.dto';
import { TagResponseDto } from '../../tag/dto/tag.response.dto';
import { UserDto } from '../../user/dto/user.dto';
import { EPostType } from '../post/enums';

import { ChannelResponseDto } from './channel.response.dto';

export class PostResponseDto extends EntityResponseDto {
    @ApiProperty()
    public readonly type: EPostType;

    @ApiProperty()
    public readonly content: string;

    @ApiProperty()
    public readonly viewsCount: number;

    @ApiProperty()
    public readonly likesCount: number;

    @ApiPropertyOptional()
    public readonly durationInMinutes: number;

    @ApiPropertyOptional()
    public readonly points: number;

    @ApiPropertyOptional()
    public readonly completed: boolean;

    @ApiProperty()
    public readonly channel: ChannelResponseDto;

    @ApiProperty()
    public readonly createdBy: UserDto;

    @ApiPropertyOptional()
    public readonly tags?: TagResponseDto[];

    @ApiPropertyOptional()
    public readonly completedUsers: UserDto[];
}
