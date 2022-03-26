import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FavListComponent} from "./components/fav-list/fav-list.component";


const routes: Routes = [
  {path: '', component: FavListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavAuthorsRoutingModule {
}
