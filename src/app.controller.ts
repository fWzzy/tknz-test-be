import { Body, Controller, Post } from '@nestjs/common';
import { TickerService } from './services/ticker.service';

@Controller()
export class AppController {
  constructor(private readonly tickerService: TickerService) {}

  @Post('set-bid-rule')
  setBidRule(@Body('limit') limit) {
    this.tickerService.setBidRule(limit);
    return true;
  }

  @Post('set-ask-rule')
  setAskRule(@Body('limit') limit) {
    this.tickerService.setAskRule(limit);
    return true;
  }
}
