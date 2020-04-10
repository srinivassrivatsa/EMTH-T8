import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products;
  subscription: Subscription;
  tableResource: DataTableResource<any>;
  items = [];
  itemCount;
  
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products = products;
      this.initializeTable(products);
    });
  }

  private initializeTable(products) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset: 0}).then(itmes => this.items = itmes);
    this.tableResource.count().then(count => this.itemCount = count);
  }

  filter(query: String) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) : this.products;
    
    this.initializeTable(filteredProducts);
  }

  reloadItems(params) {
    if(!this.tableResource) return;
    this.tableResource.query(params).then(itmes => this.items = itmes);
  }

  ngOnInit(): void {}

  ngOnDestroy() :void {
    this.subscription.unsubscribe();
  }
}
