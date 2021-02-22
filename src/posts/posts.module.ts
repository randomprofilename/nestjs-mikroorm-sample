import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { PostsService } from './posts.service';

@Module({
  imports: [MikroOrmModule.forFeature([PostEntity])],
  providers: [PostsService],
})
export class PostsModule {}
