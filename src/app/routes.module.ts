import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component'
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';

import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutComponent } from './components/about/about.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { AuthGuard } from './services/auth/authGuard';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ProductComponent } from './components/product/product.component';

// Define routes here
const routes: Routes = [
 // Shop routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'product' , component: ProductComponent},
  { path: 'product/:id', component: ProductComponent },
  { path: 'contactUs', component: ContactUsComponent},
  { path: 'about', component: AboutComponent},
  { path: 'collections', component: CollectionsComponent},
  { path: 'cart', component: CartComponent },
  { path: 'loginSignup', component: LoginSignupComponent},
// User specific routes
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
// Admin routes
{ path: 'admin', canActivate: [AuthGuard],
  children: [
    { path: '', component: DashboardComponent,  canActivate: [AuthGuard],},
    { path: 'products', component: AdminProductsComponent , canActivate: [AuthGuard],},
    { path: 'orders', component: AdminOrdersComponent,  canActivate: [AuthGuard],},
    { path: 'users', component: AdminUsersComponent,  canActivate: [AuthGuard],}
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesModule {

}
