// src/token-price/token-price.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ethers } from 'ethers';
import axios from 'axios';

@Injectable()
export class TokenPriceService {
  private provider: ethers.JsonRpcProvider;
  private POL_TOKEN_ADDRESS = '0x0000000000000000000000000000000000001010';

  constructor() {
    this.provider = new ethers.JsonRpcProvider('https://polygon-rpc.com');
  }

  async getPrice() {
    try {
      const decimals = await this.getDecimals(this.POL_TOKEN_ADDRESS);
      const priceUSD = await this.getPriceFromCoinGecko();
      return {
        token: 'POL',
        priceUSD: Number(priceUSD),
        decimals: Number(decimals),
        source: 'CoinGecko',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Unable to retrieve token price: ${error.message}`,
      );
    }
  }

  private async getDecimals(contractAddress: string): Promise<number> {
    const abi = ['function decimals() view returns (uint8)'];
    const contract = new ethers.Contract(contractAddress, abi, this.provider);
    const d = await contract.decimals();
    return Number(d.toString());
  }

  private async getPriceFromCoinGecko(): Promise<number> {
    try {
      const url = 'https://api.coingecko.com/api/v3/simple/price';
      const response = await axios.get(url, {
        params: {
          ids: 'matic-network',
          vs_currencies: 'usd',
        },
      });
      if (
        !response.data['matic-network'] ||
        typeof response.data['matic-network'].usd !== 'number'
      ) {
        throw new Error('CoinGecko did not return a valid price');
      }
      return response.data['matic-network'].usd;
    } catch (error) {
      throw new InternalServerErrorException(
        `Unable to retrieve token price: ${error.message}`,
      );
    }
  }
}
