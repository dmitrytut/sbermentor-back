import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { EntityDto } from '../../entity/dto/entity.dto';
import { TagDto } from '../../tag/dto/tag.dto';
import { UserDto } from '../../user/dto/user.dto';

export class ChannelDto extends EntityDto {
    @ApiProperty()
    public readonly category: { id: string };

    @ApiPropertyOptional()
    public readonly startDate?: string;

    @ApiPropertyOptional()
    public readonly tags?: TagDto[];

    @ApiPropertyOptional()
    public readonly authors?: UserDto[];
}
