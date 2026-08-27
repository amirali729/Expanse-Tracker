import { BadRequestException } from '@nestjs/common';

export class InsufficientBalance extends BadRequestException {
  constructor() {
    super({
      code: 'AMOUNT_LIMIT_EXCEEDED',
      message: 'Youre account doesnot have this much amount balance',
    });
  }
}
