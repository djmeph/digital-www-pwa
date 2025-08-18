import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { FeedController } from './feed.controller';
import { ShiftsController } from './shifts.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('VPATE_JWT_SECRET'),
        verifyOptions: {
          algorithms: ['HS256'],
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, FeedController, ShiftsController],
  providers: [],
})
export class AppModule {}
