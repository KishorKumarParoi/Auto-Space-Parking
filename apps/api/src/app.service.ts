import { add } from '@auto-space/sample-lib';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Kishor Kumar Paroi! ' + add(100, 200);
  }
}
