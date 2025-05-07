import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { RoutesModule } from './routes.module';
import { HttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    RoutesModule,
    HttpClient,
  ],
};
