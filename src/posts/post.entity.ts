import {
  Entity,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UserEntity } from 'src/users/user.entity';
import { v4 as uuid } from 'uuid';

@Entity({ tableName: 'posts' })
export class PostEntity {
  @PrimaryKey()
  id: string = uuid();

  @Property()
  content: string;

  @ManyToOne(type => UserEntity, { wrappedReference: true })
  createdBy: IdentifiedReference<UserEntity>;
}
