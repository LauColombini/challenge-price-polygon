import { Module } from '@nestjs/common';
import { TokenPriceController } from './token-price.controller';
import { TokenPriceService } from './token-price.service';

@Module({
  controllers: [TokenPriceController],
  providers: [TokenPriceService],
})
export class TokenPriceModule {}
