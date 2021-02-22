import { MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const mikroOrmAsyncOptions: MikroOrmModuleAsyncOptions<PostgreSqlDriver> = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgresql',
    autoLoadEntities: true,
    clientUrl: configService.get('PSQL_URL'),
    debug: true,
  }),
  inject: [ConfigService],
};
