import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn';
import { ManyToMany } from 'typeorm/decorator/relations/ManyToMany';

import { BaseEntity } from './base.entity';
import { ChannelCategory } from './channelCategory.entity';
import { Post } from './post.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

/**
 * Entity 'Channel'.
 */
@Entity()
export class Channel extends BaseEntity {
    @Column({ type: 'timestamp with time zone', nullable: true })
    public startDate?: string;

    @OneToMany(() => Post, (post) => post.channel, {
        cascade: ['remove'],
    })
    public posts: Post[];

    @ManyToOne(() => User, {
        cascade: ['remove'],
        eager: true,
    })
    public createdBy: User;

    @ManyToOne(() => ChannelCategory, (category) => category.channels, {
        cascade: ['remove'],
    })
    public category: ChannelCategory;

    @ManyToMany(() => Tag, (tag) => tag.channels, {
        cascade: ['insert', 'update'],
    })
    public tags?: Tag[];

    @ManyToMany(() => User, (user) => user.channels, {
        cascade: ['remove'],
    })
    public authors?: User[];

    @ManyToMany(() => User, (user) => user.subscriptions, {
        cascade: ['remove'],
    })
    public subscribers?: User[];
}
