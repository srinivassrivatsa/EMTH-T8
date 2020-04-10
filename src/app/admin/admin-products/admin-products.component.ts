import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs/Subscription';
import { SnapshotAction } from '@angular/fire/database/database';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products;
  filteredProducts;
  subscription: Subscription;
  
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => this.filteredProducts = this.products = products);
  }

  filter(query: String) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) : this.products
  }

  ngOnInit(): void {}

  ngOnDestroy() :void {
    this.subscription.unsubscribe();
  }
}
