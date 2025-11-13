import { Routes } from '@angular/router';
import { PersonnelnewComponent } from './pages/personnel-new/personnel.component';
import { OffreDetailComponent } from './pages/offre-detail/offre-detail.component';
import { HomePageComponent} from './pages/home-page-new/home-page.component';
import { CandidatDetailComponent } from './pages/candidat-detail/candidat-detail.component';
export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'personnel', component: PersonnelnewComponent },
  { path: 'personnel/offre/:id', component: OffreDetailComponent },
  { path: 'personnel/candidat/:id', component: CandidatDetailComponent },
  { path: '**', redirectTo: '' }
];

