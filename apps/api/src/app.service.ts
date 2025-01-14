import { add } from '@autospace/sample-lib';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World, Kishor Kumar Paroi ' + add(290, 40);
  }
}
