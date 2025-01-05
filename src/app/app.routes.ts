import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ArticleComponent } from './pages/article/article.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path: 'landing/:url', component: LandingPageComponent},
  { path: 'article/:url', component: ArticleComponent},
  { path: 'about', component: AboutComponent},
  { path: '**', redirectTo: '/home' } // Wildcard route for a 404 page
];

export const appRouterProviders = [
  provideRouter(routes)
];
