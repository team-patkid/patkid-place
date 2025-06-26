import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('health')
export class AppController {
  constructor() {}

  @ApiTags('시스템')
  @ApiOperation({ summary: '헬스체크', description: '서버 상태 확인' })
  @Get()
  @HttpCode(HttpStatus.OK)
  getHealth(): { status: string; timestamp: string; version: string } {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.0.1',
    };
  }
}
