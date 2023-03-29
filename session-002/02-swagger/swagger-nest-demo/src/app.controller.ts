import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/cat/:name')
  getHelloCat(@Param('name') name: string): string {
    return this.appService.getHelloCat(name);
  }

  @Post('/cat')
  @HttpCode(HttpStatus.GONE)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      },
    },
  })
  createCat(@Body() body: { name: string }): string {
    return this.appService.postHelloCat(body.name);
  }
}
