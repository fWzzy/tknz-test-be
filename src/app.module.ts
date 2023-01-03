import { CacheModule, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './services/app.service';
import { TickerUpdatedListener } from './listeners/ticker-updated.listener';
import { TickerService } from './services/ticker.service';

@Module({
  imports: [EventEmitterModule.forRoot(), CacheModule.register()],
  controllers: [AppController],
  providers: [AppService, TickerService, AppGateway, TickerUpdatedListener],
})
export class AppModule {}
