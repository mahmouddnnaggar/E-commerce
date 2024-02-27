import { WishlistService } from './../../shared/service/wishlist.service';
import { Category } from './../../shared/interface/category';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from 'src/app/shared/service/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/shared/interface/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}
  products: Product[] = [];
  categories: Category[] = [];

  wishListData: string[] = [];

  inputValue: string = '';

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    margin: 10,
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
  customOptions_2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    margin: 10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      980: {
        items: 6,
      },
    },
    nav: false,
  };

  ngOnInit(): void {
    this._ProductsService.getProductsApi().subscribe({
      next: (products) => {
        this.products = products.data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._ProductsService.getCategoriesApi().subscribe({
      next: (data) => {
        console.log(data.data);
        this.categories = data.data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._WishlistService.getWishList().subscribe({
      next: (response) => {

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
