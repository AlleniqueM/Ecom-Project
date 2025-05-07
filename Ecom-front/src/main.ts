import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { RoutesModule } from './app/routes.module';
import { provideHttpClient, withInterceptors, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const token = localStorage.getItem('auth_token');
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(req);
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot([])),
    importProvidersFrom(RoutesModule),
    importProvidersFrom(FormsModule),
    importProvidersFrom(CommonModule),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
}).catch((err) => console.error(err));
