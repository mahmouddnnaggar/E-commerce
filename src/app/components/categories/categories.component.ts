import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private _ProductsService: ProductsService) {}
  categories: any[] = [];
  subCategories: any[] = [];
  subCategories2: number = 0;

  ngOnInit(): void {
    this._ProductsService.getCategoriesApi().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getSubCat(catId: string): void {
    this._ProductsService.getAllSubCategories(catId).subscribe({
      next: (response) => {
        console.log(response);
        this.subCategories = response.data;
        this.subCategories2 = response.results;
      },
      error: (error) => {
        console.log(error); 
      },
    });
  }
}
