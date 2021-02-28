import { EPostType } from 'src/modules/channel/post/enums';
import { AfterLoad, Column, Entity, ManyToOne } from 'typeorm';
import { JoinTable } from 'typeorm/decorator/relations/JoinTable';
import { ManyToMany } from 'typeorm/decorator/relations/ManyToMany';

import { BaseEntity } from './base.entity';
import { Channel } from './channel.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

/**
 * Entity 'Post'.
 */
@Entity()
export class Post extends BaseEntity {
    @Column('enum', { enum: EPostType })
    public type: EPostType;

    @Column({ type: 'citext', nullable: true })
    public content: string;

    @Column({ type: 'int', nullable: true })
    public durationInMinutes: number;

    @Column({ type: 'int', nullable: true })
    public points: number;

    @Column({ type: 'int', nullable: true })
    public viewsCount: number;

    @Column({ type: 'int', nullable: true })
    public likesCount: number;

    @ManyToOne(() => User, {
        cascade: ['remove'],
        eager: true,
    })
    public createdBy: User;

    @ManyToOne(() => Channel, (channel) => channel.posts, {
        eager: true,
    })
    public channel: Channel;

    @ManyToMany(() => Tag, (tag) => tag.posts, {
        cascade: ['insert', 'update'],
        eager: true,
    })
    public tags?: Tag[];

    @ManyToMany(() => User, (user) => user.completedPosts, {
        eager: true,
    })
    public completedUsers?: User[];

    @AfterLoad()
    async viewsIncrement() {
        this.viewsCount = !this.viewsCount ? 1 : this.viewsCount + 1;
    }
}
