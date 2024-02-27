import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}
  isLogin: boolean = false;
  cartNum: number = 0;
  wishNum: number = 0;

  @ViewChild('navbar') navElement!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 500) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.addClass(this.navElement.nativeElement, 'shadow');
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow');
    }
  }

  ngOnInit(): void {
    this._AuthService.userDataVariable.subscribe(() => {
      if (this._AuthService.userDataVariable.getValue() == null) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartNum = data;
      },
    });

    this._WishlistService.WishNumber.subscribe({
      next: (data) => {
        this.wishNum = data;
      },
    });

    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartNum = response.numOfCartItems;
      },
    });

    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        console.log('for test', response);

        this.wishNum = response.count;
      },
    });
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this._AuthService.saveUserDataMethod();
    this._Router.navigate(['/login']);
  }
}
