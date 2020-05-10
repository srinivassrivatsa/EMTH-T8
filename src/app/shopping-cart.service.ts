import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { take } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId)
      return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  addToCart(product){
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product){
    this.updateItemQuantity(product, -1);
  }

  async updateItemQuantity(product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ =  this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item:any) => {
      item$.set({product: product.payload.val(), quantity: (item==null ? 0 : item.quantity) + change});
    });
  }
}
