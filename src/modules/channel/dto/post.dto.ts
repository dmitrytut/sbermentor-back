import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { EntityDto } from '../../entity/dto/entity.dto';
import { TagDto } from '../../tag/dto/tag.dto';
import { EPostType } from '../post/enums';

export class PostDto extends EntityDto {
    @ApiProperty()
    @IsEnum(EPostType)
    public readonly type: EPostType;

    @ApiPropertyOptional()
    @IsString()
    public readonly content?: string;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    public readonly durationInMinutes?: number;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    public readonly points?: number;

    @ApiPropertyOptional()
    @IsOptional()
    public readonly tags?: TagDto[];
}
