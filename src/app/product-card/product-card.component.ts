import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('shopping-cart') shoppingCart;
  constructor(private cartService: ShoppingCartService) { }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  getQuantity() {
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.key];
    return item!=null ? item.quantity : 0;
  }

}
