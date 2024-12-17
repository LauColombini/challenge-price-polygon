import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { TokenPriceService } from './token-price.service';

@Controller('token-price')
export class TokenPriceController {
  constructor(private readonly tokenPriceService: TokenPriceService) {}

  @Get()
  async getTokenPrice() {
    try {
      const result = await this.tokenPriceService.getPrice();
      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        error: 'Unable to retrieve token price',
      });
    }
  }
}
