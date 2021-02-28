import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { UserDto } from './dto/user.dto';
import { userMapper } from './mappers/user.mapper';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id?')
    public async get(@Req() req: any, @Param() params: any): Promise<UserDto> {
        let userId = params.id;
        if (!userId) {
            userId = req.user.id;
        }

        const user = await this.userService.findById(userId, true);

        return userMapper.toDto(user, true);
    }
}
