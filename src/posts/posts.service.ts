import {
  EntityRepository,
  FilterQuery,
  MikroORM,
  NotFoundError,
  Reference,
  wrap,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private _postsRepository: EntityRepository<PostEntity>,
    private _orm: MikroORM,
  ) {}

  async getPosts(userid?: string): Promise<PostEntity[]> {
    let filter: FilterQuery<PostEntity> = {};

    if (userid != null) {
      filter = { ...filter, createdBy: { id: userid } };
    }

    const posts = await this._postsRepository.find(filter);

    return posts;
  }

  async getPost(id: string): Promise<PostEntity> {
    const post = await this._postsRepository.findOne({ id });

    if (post == null) {
      throw new NotFoundError('Post dont exist');
    }

    return post;
  }

  async createPost(content: string, authorId: string): Promise<PostEntity> {
    const post = new PostEntity();

    wrap(post).assign({ content });

    post.createdBy = this._orm.em.getReference(UserEntity, authorId, true);

    await this._postsRepository.persistAndFlush(post);

    return post;
  }
}
