import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { RegistroComponent } from './start/register/register.component';
import { MainLayoutComponent } from './mainlayout/main-layout';
import { HomeComponent } from './Home/HomeComponent';
import { AmortizacionComponent } from './amortizacion/amortizacion.component';
import { FormulaComponent } from './Formula/FormulasComponent';
import { DocumentacionComponent } from './documentation/documentation.component';
import { AcercaComponent } from './nosotros/nosotros.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter([
      // Ruta directa
      {
        path: 'registro',
        component: RegistroComponent
      },
      // Redirección de raíz a registro
      {
        path: '',
        redirectTo: 'registro',
        pathMatch: 'full'
      },
      // Layout con sidebar
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'calculo', component: AmortizacionComponent },
          { path: 'formula', component: FormulaComponent },
          { path: 'documentacion', component: DocumentacionComponent },
          { path: 'nosotros', component: AcercaComponent },
          // Ya no se necesita redirección aquí
        ]
      },
      // Ruta comodín
      {
        path: '**',
        redirectTo: 'registro'
      }
    ])
  ]
};
