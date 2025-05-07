import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { AdminProductsService } from '../../services/admin/admin-products.service';
@Component({
  selector: 'app-admin',
  imports: [ CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent implements OnInit {
  products: any[] = [];
  newProduct: any = {
    name: '',
    description: '',
    price: 0,
    image_url: ''
  };

  currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private productsService: AdminProductsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe(
      data => this.products = data,
      error => console.error('Error loading products', error)
    );
  }

  addProduct(): void {
    this.productsService.createProduct(this.products).subscribe(
      () => {
        this.loadProducts();
        this.newProduct = { name: '', description: '', price: 0, image_url: '' };
      },
      error => console.error('Error adding product', error)
    );
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.removeProduct(productId).subscribe({
        next: () => {
          alert('Product deleted successfully');
          this.loadProducts();
        },
        error: (err) => {
          alert('Delete failed: ' + err.message);
        }
      });
    }
  }

  logout(){
    this.authService.logout().subscribe({ next: () => {
      console.log('Logout successful');
    }, error: (err) => {
      console.error('Logout failed: ', err)
    }})
  }

}
