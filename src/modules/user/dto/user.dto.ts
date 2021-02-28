import {
    ApiModelProperty,
    ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ChannelResponseDto } from 'src/modules/channel/dto/channel.response.dto';
import { PostDto } from '../../channel/dto/post.dto';
import { PostResponseDto } from '../../channel/dto/post.response.dto';

export class UserDto {
    @ApiModelProperty()
    id: string;

    @ApiModelProperty()
    firstName: string;

    @ApiModelProperty()
    lastName: string;

    @ApiModelPropertyOptional()
    lastLoginAt?: string;

    @ApiModelPropertyOptional()
    points?: number;

    @ApiModelPropertyOptional()
    channels?: ChannelResponseDto[];

    @ApiModelPropertyOptional()
    subscriptions?: ChannelResponseDto[];

    @ApiModelPropertyOptional()
    completedPosts?: PostResponseDto[];
}
