import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { PostEntity } from 'src/posts/post.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity({ tableName: 'users' })
export class UserEntity {
  @PrimaryKey()
  id: string = uuidv4();

  @Property()
  name: string;

  @OneToMany(
    type => PostEntity,
    post => post.createdBy,
  )
  posts = new Collection<PostEntity>(this);
}
