import { Injectable } from '@nestjs/common';
import dev from './Dev';
import local from './Local';
import prod from './Prod';
import { SupportNodeEnv } from './enum/config.enum';
import { Configuration } from './type/config.type';

@Injectable()
export class ConfigService {
  constructor() {}

  static getConfig(): Configuration {
    switch (process.env.NODE_ENV) {
      case SupportNodeEnv.LOCAL:
        return local;
      case SupportNodeEnv.DEV:
        return dev;
      case SupportNodeEnv.PROD:
        return prod;
      default:
        return dev;
    }
  }
}
