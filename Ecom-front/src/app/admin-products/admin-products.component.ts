import { Component, OnInit } from '@angular/core';
import { AdminProductsService } from '../services/admin/admin-products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../components/back-button/back-button.component';


@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, FormsModule, BackButtonComponent],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];
  isEditing = false;
  currentproduct_id: number | null = null;

  productData: any = {
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    category: ''
  };

  constructor(private adminProductsService: AdminProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.adminProductsService.getProducts().subscribe({
      next: (products) => this.products = products,
      error: (err) => alert('Failed to load products')
    });
  }

  onSubmit(): void {
    if (!this.productData.name || !this.productData.price) {
      alert('Name and price are required!');
      return;
    }

    const operation = this.isEditing && this.currentproduct_id
      ? this.adminProductsService.updateProduct(this.currentproduct_id, this.productData)
      : this.adminProductsService.createProduct(this.productData);

    operation.subscribe({
      next: (res: any) => {
        alert(res.message);
        this.resetForm();
        this.loadProducts();
        if (this.isEditing) {
          this.isEditing = false;
          this.currentproduct_id = null;
        }
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Operation failed';
        alert(`Error: ${errorMsg}`);
        console.error('Error details:', err);
      }
    });
  }
  onEdit(product: any): void {
    this.isEditing = true;
    this.currentproduct_id = product.product_id;
    this.productData = { ...product };
  }


  onDelete(product: any): void {
    // Debug: Confirm what's being received
    console.log('Product received for deletion:', product);

    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.adminProductsService.deleteProduct(product.product_id).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.loadProducts(); // Refresh the list
        },
        error: (err) => {
          console.error('Delete error:', err);
          alert('Delete failed. Please check console for details.');
        }
      });
    }
  }
  resetForm(): void {
    this.productData = {
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      category: ''
    };
    this.isEditing = false;
    this.currentproduct_id = null;
  }
}
