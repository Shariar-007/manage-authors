import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/authors'},
  {path: 'authors', loadChildren: () => import('./authors/authors.module').then(m => m.AuthorsModule)},
  {
    path: 'favourite-authors',
    loadChildren: () => import('./fav-authors/fav-authors.module').then(m => m.FavAuthorsModule)
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
