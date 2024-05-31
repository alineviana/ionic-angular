import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  pokemonId?: number;
  pokemonDetails: any;

  constructor(public apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pokemonId = Number(this.route.snapshot.paramMap.get('id'));

    this.pokemonDetails = this.apiService.pokemons.find(pokemon => pokemon.id === this.pokemonId);
  }
}
