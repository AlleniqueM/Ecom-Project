import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/user/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedProduct: any = null;
  sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' }
  ];
  selectedSort = 'name-asc';

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getAllProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...products];
      this.sortProducts();
    });
  }

  sortProducts(): void {
    this.filteredProducts.sort((a, b) => {
      switch(this.selectedSort) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }

  onSortChange(): void {
    this.sortProducts();
  }

  viewProductDetails(product: any): void {
    this.productsService.getProductById(product.product_id).subscribe({
      next: (response) => {
        this.selectedProduct = Array.isArray(response) ? response[0] : response;
      },
      error: (err) => console.error('Error loading product', err)
    });
  }
  // In your component class
getProductPrice(price: any): string {
  if (price === null || price === undefined) return '$0.00';
  const num = Number(price);
  return isNaN(num) ? '$0.00' : num.toFixed(2);
}

handleImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  imgElement.style.display = 'none';

}
}
