import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  imageUrl?: string;
  abilities: string[];
  weight: number;
  height: number;
  stats: Stat[];
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  isHidden: boolean;
  slot: number;
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonResult {
  id: number;
  name: string;
  url: string;
  imageUrl?: string;
  abilities: string[];
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "https://pokeapi.co/api/v2";

  pokemons: Pokemon[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadPokemons();
  }

  loadPokemons(offset = 0) {
    this.httpClient.get<any>(`${this.baseUrl}/pokemon?offset=${offset}&limit=300`).subscribe(requisicao => {
      this.pokemons = requisicao.results.map((result: Pokemon) => ({
        ...result,
        abilities: [],
      }));

      setTimeout(() => {
        this.pokemons.forEach((pokemon) => {
          this.getPokemonDetails(pokemon.url);
        });
      }, 1000);
    });
  }

  getPokemonDetails(url: string): void {
    this.httpClient.get<any>(url).subscribe((response: any) => {
      const dreamWorldImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${response.id}.svg`;

      const pokemon = this.pokemons.find(poke => poke.name === response.name);

      if (pokemon) {
        pokemon.imageUrl = dreamWorldImageUrl;
        pokemon.abilities = response.abilities.map((ability: Ability) => ability.ability.name).join(" | ");
        pokemon.id = response.id;
        pokemon.name = response.name;
        pokemon.weight = response.weight;
        pokemon.height = response.height;
        pokemon.stats = response.stats.map((stat: { stat: { name: string }; base_stat: number }) => ({
          stat: stat.stat.name,
          base_stat: stat.base_stat
        }));
      }
    },
      error => console.error(error)
    );
  }

  loadSomePokemons(currentPage: number = 1) {
    return this.httpClient.get<any>(`${this.baseUrl}/pokemon?offset=${(currentPage - 1) * 100}&limit=100`);
  }

}
