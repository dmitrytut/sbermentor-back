import { Entity } from 'typeorm';
import { JoinTable } from 'typeorm/decorator/relations/JoinTable';
import { ManyToMany } from 'typeorm/decorator/relations/ManyToMany';

import { BaseEntity } from './base.entity';
import { Channel } from './channel.entity';
import { Post } from './post.entity';

/**
 * Entity 'Tag'.
 */
@Entity()
export class Tag extends BaseEntity {
    @ManyToMany(() => Channel, (channel) => channel.tags)
    @JoinTable()
    public channels?: Channel[];

    @ManyToMany(() => Post, (post) => post.tags)
    @JoinTable()
    public posts?: Post[];
}
