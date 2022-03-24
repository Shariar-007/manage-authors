import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/authors' },
  { path: 'authors', loadChildren: () => import('./authors/authors.module').then(m => m.AuthorsModule)},
  { path: 'favourite-authors', loadChildren: () => import('./fav-authors/fav-authors.module').then(m => m.FavAuthorsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
