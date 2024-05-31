import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { PaginationService } from '../../service/pagination.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = window.innerWidth >= 1024 ? 16 : 8;
  totalItems: number = 0;
  pokemonsToShow: any[] = [];
  filteredPokemons: any[] = [];
  pokemons: any[] = [];

  constructor(public apiService: ApiService, public paginationService: PaginationService) { }

ngOnInit(): void {
  this.currentPage = 1;

  this.apiService.loadSomePokemons(this.currentPage).subscribe((data: any[]) => {
    this.pokemons = data; 
    this.updateTotalAndShowInitialPokemons(); 
  }, error => {
    console.error('Error fetching data:', error);
  });

  this.paginationService.currentPage$.subscribe(current => {
    this.currentPage = current;
    this.updatePokemonsToShow();
  });
}

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage++;
      this.updatePokemonsToShow();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePokemonsToShow();
    }
  }

  updatePokemonsToShow(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pokemonsToShow = this.apiService.pokemons.slice(startIndex, endIndex);
  }

  updateTotalAndShowInitialPokemons(): void {
    this.totalItems = this.apiService.pokemons.length;
    this.pokemonsToShow = this.apiService.pokemons.slice(0, this.itemsPerPage);
  }
}