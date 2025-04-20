import { PokemonModule } from 'src/pokemon/pokemon.module';

import { Module } from '@nestjs/common';

import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [
    PokemonModule
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
