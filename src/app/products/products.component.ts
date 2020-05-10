import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  category;
  cart: any;
  subscription: Subscription;

  constructor(route: ActivatedRoute, productService: ProductService, private cartService: ShoppingCartService) {
    productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    })).subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? this.products.filter(p => p.payload.val().category === this.category) : this.products;
    });
  }
  
  async ngOnInit() {
    let cart = await this.cartService.getCart();
    this.subscription = cart.valueChanges().subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
