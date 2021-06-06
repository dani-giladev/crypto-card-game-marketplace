import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'mint-card',
    loadChildren: () => import('./pages/mint-card/mint-card.module').then( m => m.MintCardPageModule)
  },
  {
    path: 'showcase',
    loadChildren: () => import('./pages/showcase/showcase.module').then( m => m.ShowcasePageModule)
  },
  {
    path: 'my-cards',
    loadChildren: () => import('./pages/my-cards/my-cards.module').then( m => m.MyCardsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
