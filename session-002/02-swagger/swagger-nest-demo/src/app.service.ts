import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloCat(name): string {
    return `Hello ${name}!`;
  }

  postHelloCat(name): string {
    return `Hello ${name}!`;
  }
}
