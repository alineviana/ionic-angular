import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private currentPage = new BehaviorSubject<number>(0);
  itemsPerPage = 10;
  totalItems = 1000; 

  constructor() {}

  get currentPage$(): Observable<number> {
    return this.currentPage.asObservable();
  }

  nextPage(): void {
    if (this.currentPage.value + 1 < Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage.next(this.currentPage.value + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage.value > 0) {
      this.currentPage.next(this.currentPage.value - 1);
    }
  }
}
