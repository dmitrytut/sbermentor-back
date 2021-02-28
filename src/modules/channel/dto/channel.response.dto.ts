import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { UserDto } from '../../user/dto/user.dto';
import { EntityResponseDto } from '../../entity/dto/entity.response.dto';

import { ChannelCategoryResponseDto } from './channel-category.response.dto';
import { TagResponseDto } from 'src/modules/tag/dto/tag.response.dto';
import { PostResponseDto } from './post.response.dto';

export class ChannelResponseDto extends EntityResponseDto {
    @ApiProperty()
    public readonly category: ChannelCategoryResponseDto;

    @ApiProperty()
    public readonly createdBy: UserDto;

    @ApiPropertyOptional()
    public readonly startDate?: string;

    @ApiPropertyOptional()
    public readonly subscribersCount?: number;

    @ApiPropertyOptional()
    public readonly postsCount?: number;

    @ApiPropertyOptional()
    public readonly posts?: PostResponseDto[];

    @ApiPropertyOptional()
    public readonly tags?: TagResponseDto[];

    @ApiPropertyOptional()
    public readonly subscribers?: UserDto[];

    @ApiPropertyOptional()
    public readonly authors?: UserDto[];
}
