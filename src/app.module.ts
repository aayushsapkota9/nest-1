import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats.controller';
import { AppService } from './app.service';
import { DogsController } from './dogs/dogs.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, DogsController],
  providers: [AppService],
})
export class AppModule {}
