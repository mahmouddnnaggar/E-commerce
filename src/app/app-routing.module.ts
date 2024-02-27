import { PaymentComponent } from './components/payment/payment.component';
import { DetailsComponent } from './components/details/details.component';
import { authGuard } from './auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    component: CartComponent,
    title: 'Cart',
  },
  {
    path: 'wishlist',
    canActivate: [authGuard],
    component: WishlistComponent,
    title: 'Wish List',
  },
  {
    path: 'products',
    canActivate: [authGuard],
    component: ProductsComponent,
    title: 'Products',
  },
  {
    path: 'allorders',
    canActivate: [authGuard],
    component: AllordersComponent,
    title: 'All Orders',
  },
  {
    path: 'payment/:id',
    canActivate: [authGuard],
    component: PaymentComponent,
    title: 'Payment',
  },
  {
    path: 'categories',
    canActivate: [authGuard],
    component: CategoriesComponent,
    title: 'Categories',
  },
  {
    path: 'productDetails/:productId',
    canActivate: [authGuard],
    component: DetailsComponent,
    title: 'Details',
  },
  {
    path: 'brands',
    canActivate: [authGuard],
    component: BrandsComponent,
    title: 'Brands',
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },

  { path: '**', component: NotfoundComponent, title: 'Notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
