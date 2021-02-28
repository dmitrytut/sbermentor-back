import { Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Channel } from './channel.entity';

/**
 * Entity 'Channel category'.
 */
@Entity()
export class ChannelCategory extends BaseEntity {
    @OneToMany(() => Channel, (channel) => channel.category)
    public channels?: Channel[];
}
