import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenPriceModule } from './token-price/token-price.module';

@Module({
  imports: [TokenPriceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
