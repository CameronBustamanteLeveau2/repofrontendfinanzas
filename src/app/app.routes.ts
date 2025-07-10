import { Routes } from '@angular/router';
import { RegistroComponent } from './start/register/register.component';
import { MainLayoutComponent } from './mainlayout/main-layout'; // Tu layout con sidebar
import { HomeComponent } from './Home/HomeComponent';
import { AmortizacionComponent } from './campos-variables/campos.components';
import { FormulaComponent } from './Formula/FormulasComponent';
import { DocumentacionComponent } from './documentation/documentation.component';
import { AcercaComponent } from './nosotros/nosotros.component';

export const routes: Routes = [
  // Ruta directa de registro
  {
    path: 'registro',
    component: RegistroComponent
  },

  // Redirección de ruta raíz a registro
  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full'
  },

  // Layout principal con sidebar y sus hijos
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'Home', component: HomeComponent },
      { path: 'Calculo', component: AmortizacionComponent },
      { path: 'Formula', component: FormulaComponent },
      { path: 'Documentacion', component: DocumentacionComponent },
      { path: 'Nosotros', component: AcercaComponent },
    ]
  },

  // Ruta comodín
  {
    path: '**',
    redirectTo: 'registro'
  }
];
