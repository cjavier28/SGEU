import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch,withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptores/interceptorer-peticiones/interceptorer-peticiones.component';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideHttpClient(withFetch()),]
};
