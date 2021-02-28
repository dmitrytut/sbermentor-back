import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { User } from '../../entity/user.entity';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async findByUsername(username: string): Promise<User | null> {
        return await this.userRepository.findOne({ username });
    }

    public async findById(id: string, extended = false): Promise<User> {
        let user: User;
        if (extended) {
            user = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.channels', 'channels')
                .leftJoinAndSelect('user.subscriptions', 'subscriptions')
                .leftJoinAndSelect('user.completedPosts', 'completedPosts')
                .where(`user.id = '${id}'`)
                .getOne();
        } else {
            user = await this.userRepository.findOneOrFail(id);
        }
        if (!user.id) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    public async create(user: CreateUserDto): Promise<User> {
        return await this.userRepository.save(user);
    }

    public async update(id: number, newValue: CreateUserDto): Promise<User | null> {
        const user = await this.userRepository.findOneOrFail(id);
        if (!user.id) {
            throw new NotFoundException('User not found');
        }
        await this.userRepository.update(id, newValue);
        return await this.userRepository.findOne(id);
    }

    public async updateLastLoginAt(id: string): Promise<User> {
        return await this.userRepository.save({
            id,
            lastLoginAt: new Date().toISOString(),
        });
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    public async register(userDto: CreateUserDto): Promise<User> {
        const { username } = userDto;
        let user = await this.userRepository.findOne({ where: { username } });
        if (user) {
            throw new BadRequestException('User already exists');
        }
        user = await this.userRepository.create(userDto);

        return await this.userRepository.save(user);
    }

    public async isPostCompleted(userId: string, postId: string): Promise<boolean> {
        const isPostCompleted = await this.userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.completedPosts', 'completedPosts', 'completedPosts.id = :postId', { postId })
            .where(`user.id = '${userId}'`)
            .getCount();

        return Boolean(isPostCompleted);
    }

    public async addPoints(userId: string, points: number): Promise<void> {
        const user = await this.findById(userId);
        await this.userRepository.update(userId, { points: (user.points || 0) + points });
    }
}
