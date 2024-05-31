import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {

  selectedPokemonId: number | null = null;
  filteredPokemons: any[] = [];
  @Input() filteredPokemon!: any[];
  @Input() pokemonsToShow?: any[];
  
  constructor(public apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.pokemonsToShow = [...this.apiService.pokemons];
  }

  selectPokemon(pokemonId: number): void {
    this.selectedPokemonId = pokemonId;
    if (this.selectedPokemonId!== null && this.selectedPokemonId!== undefined) {
      this.router.navigate(['/details', this.selectedPokemonId.toString()]);
      this.filterPokemons();
    } else {
      this.filteredPokemons = [];
    }
  }
  
  filterPokemons(): void {
    if (this.selectedPokemonId) {
      this.pokemonsToShow = this.apiService.pokemons.filter(pokemon => pokemon.id === this.selectedPokemonId);
    } else {
      this.pokemonsToShow = [...this.apiService.pokemons];
    }
  }
}
