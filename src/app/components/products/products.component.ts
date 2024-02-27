import { WishlistService } from './../../shared/service/wishlist.service';
import { CartService } from './../../shared/service/cart.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interface/product';
import { ProductsService } from 'src/app/shared/service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _Renderer2: Renderer2,
    private _ToastrService: ToastrService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  products: Product[] = [];

  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;

  wishListData: string[] = [];

  inputValue: string = '';
  ngOnInit(): void {

    this._ProductsService.getProductsApi().subscribe({
      next: (response) => {
        console.log(response.data);
        this.products = response.data;

        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        console.log(response);

        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addProduct(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');

    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message, '🛍️');
        this._Renderer2.removeAttribute(element, 'disabled');

        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (error) => {
        console.log(error);
        this._ToastrService.error(error);
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  pageChanged(event: any): void {
    this._ProductsService.getProductsApi(event).subscribe({
      next: (response) => {
        console.log(response.data);
        this.products = response.data;

        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToWish(prod_id: string): void {
    this._WishlistService.addToWishList(prod_id).subscribe({
      next: (response) => {
        console.log(response.message);
        this._ToastrService.success(response.message, '❤️');
        this.wishListData = response.data;
        this._WishlistService.WishNumber.next(response.data.length);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeFromWish(id: string): void {
    this._WishlistService.removeFromWishList(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.info(response.message);
        this.wishListData = response.data;
        this._WishlistService.WishNumber.next(response.data.length);
      },
      error: (error) => {
        console.log(error); 
      },
    });
  }
}
