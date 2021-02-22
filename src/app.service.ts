import { MikroORM } from '@mikro-orm/core';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnModuleInit {
  private _logger: Logger;
  private _isDevelopment: boolean;

  constructor(private _orm: MikroORM, _configService: ConfigService) {
    this._logger = new Logger(this.constructor.name);
    this._isDevelopment = _configService.get('NODE_ENT') !== 'production';
  }

  async onModuleInit(): Promise<void> {
    if (this._isDevelopment) {
      this._logger.debug('Updating database schema');
      await this._orm.getSchemaGenerator().updateSchema();
      this._logger.debug('Database schema updated');
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
