import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapter/axios-adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { PokeResponse } from './interface/Poke-Response.interfase';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed(limite: string) {
    await this.pokemonModel.deleteMany({}); // delete * from pokemons;

    const  data  = await this.http.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${+limite}`,
    );
    const insertPromisesArray: {name: string  , no:number }[] = [];
    data.results.forEach(({ name, url }) => {
      const argument = url.split('/');
      const no = +argument[argument.length - 2];
      insertPromisesArray.push({ name, no });
    });
    await this.pokemonModel.insertMany(insertPromisesArray);
    return {
      message: `registro exitoso ${insertPromisesArray.length}`,
    };
  }

  // async executeSeed1(limite: string) {
  //   const  data  = await this.http.get<PokeResponse>(
  //     `https://pokeapi.co/api/v2/pokemon?limit=${+limite}`,
  //   );
  //   data.results.forEach(async ({ name, url }) => {
  //     const argument = url.split('/');
  //     const no = +argument[argument.length - 2];

  //     const pokemon = await this.pokemonModel.create({
  //       name,
  //       no,
  //     });
  //   });

  //   return {
  //     message: 'Seed executed',
  //   };
  // }

  // async executeSeedv2(limite: string) {
  //   await this.pokemonModel.deleteMany({}); // delete * from pokemons;

  //   const data  = await this.http.get<PokeResponse>(
  //     `https://pokeapi.co/api/v2/pokemon?limit=${+limite}`,
  //   );
  //   const insertPromisesArray: Promise<any>[] = [];

  //   data.results.forEach(({ name, url }) => {
  //     const argument = url.split('/');
  //     const no = +argument[argument.length - 2];
  //     insertPromisesArray.push(this.pokemonModel.create({ name, no }));
  //   });

  //   await Promise.all(insertPromisesArray);
  //   return {
  //     message: " registro exitoso",
  //   };
  // }
}
