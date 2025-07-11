import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { authGuard } from '../guard/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
    canActivate: [authGuard]
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Products',
    canActivate: [authGuard]
  },
  {
    path: "product/:productId",
    loadComponent: () => import("./product-details/product-details.component").then(m => m.ProductDetailsComponent),
    title: 'Product Details',
    canActivate: [authGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Us',
    canActivate: [authGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact Us',
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: "login",
    loadComponent: () => import("./login/login.component").then(m => m.LoginComponent),
    title: 'Login',
  },
  {
    path: "register",
    loadComponent: () => import("./register/register.component").then(m => m.RegisterComponent),
    title: 'Register',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page Not Found'
  }
];
