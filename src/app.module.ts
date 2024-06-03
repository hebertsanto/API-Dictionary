import { Module } from '@nestjs/common';
import { HttpModule } from './modules/http/http.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    HttpModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
