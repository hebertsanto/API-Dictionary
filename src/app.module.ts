import { Module } from '@nestjs/common';
import { HttpModule } from './modules/http/http.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthGuard } from './modules/auth/auth.guards';
import { APP_GUARD } from '@nestjs/core';

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
