import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/user/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any = null;
  isLoading = true;
  error = '';
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (!productId) {
      this.error = 'Invalid product ID';
      this.isLoading = false;
      return;
    }

    this.productsService.getProductById(+productId).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Product not found';
        this.isLoading = false;
        console.error('Error loading product:', err);
      }
    });
  }

  addToCart(): void {
    // Implement your cart functionality here
    console.log(`Added ${this.quantity} of ${this.product.name} to cart`);
  }
}
