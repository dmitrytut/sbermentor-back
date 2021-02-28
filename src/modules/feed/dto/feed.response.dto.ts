import { ApiProperty } from '@nestjs/swagger';
import { ChannelResponseDto } from 'src/modules/channel/dto/channel.response.dto';
import { PostResponseDto } from 'src/modules/channel/dto/post.response.dto';

export class FeedResponseDto {
    @ApiProperty()
    data: (ChannelResponseDto | PostResponseDto)[];
}
