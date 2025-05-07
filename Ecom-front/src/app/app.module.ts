import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoutesModule } from './routes.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './auth.intercepter';

// Import services
import { UserService } from './services/user/user.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
    imports: [
      BrowserModule,
      RoutesModule,
      FormsModule,
      CommonModule
      

        ],
    providers: [
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
          ],
        })

export class AppModule { }
