import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}
  cartId: string = '';
  orderForm = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  });

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe({
      next: (id) => {
        console.log(id);
        this.cartId = id['id'];
        console.log(this.cartId);
      },
    });
  }

  handleForm(): void {
    console.log(this.orderForm.value);
    this._CartService.checkOut(this.cartId, this.orderForm.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status == 'success') {
          window.open(response.session.url, '_self');
        }
      },
      error: (error) => {
        console.log(error); 
      },
    });
  }
}
