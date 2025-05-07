import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSignupComponent } from "../components/login-signup/login-signup.component";
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ProductSearchResult, ProductsService } from '../services/user/products.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [LoginSignupComponent, CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showLoginPopup = false;
  isLoggedIn = true;
  isAdmin = false;
  userName = '';
  searchTerm = '';
  searchResults: ProductSearchResult[] = [];
  showResults = false;

  private searchInput$ = new Subject<string>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.checkAuthState();
    this.authService.currentUser$.subscribe(() => this.checkAuthState());

    // Debounce search input
    this.searchInput$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      if (term.trim().length > 2) {
        this.productService.searchProducts(term).subscribe({
          next: (results) => {
            this.searchResults = results;
            this.showResults = true;
          },
          error: () => this.searchResults = []
        });
      } else {
        this.searchResults = [];
        this.showResults = false;
      }
    });
  }

  // Template-compatible methods
  onSearchInput() {
    if (this.searchTerm.trim().length > 2) {
      this.productService.searchProducts(this.searchTerm).subscribe({
        next: (results) => {
          this.searchResults = results;
          this.showResults = true;
        },
        error: () => this.searchResults = []
      });
    } else {
      this.searchResults = [];
      this.showResults = false;
    }
  }


onSearch() {  // Just trigger the search - no routing needed
  this.onSearchInput();
}


navigateToProduct(product: any) {
  this.showResults = false;
  this.searchTerm = '';
  this.router.navigate(['/product', product.product_id])
    .then(navSuccess => {
      if (!navSuccess) {
        console.error('Navigation failed to product:', product.product_id);
      }
    })
    .catch(err => {
      console.error('Navigation error:', err);
    });
}


  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!(event.target as HTMLElement).closest('.search-bar')) {
      this.showResults = false;
    }
  }

  // Auth methods
  showLoginForm() { this.showLoginPopup = true; }
  closeModal() { this.showLoginPopup = false; }
  shouldShowNavbar() { return !(this.isLoggedIn && this.isAdmin); }
  private checkAuthState() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
    if (this.isLoggedIn) {
      this.authService.currentUser$.subscribe(user => {
        this.userName = user?.first_name || '';
      });
      this.closeModal();
    } else {
      this.userName = '';
    }
  }
}
