import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavAuthorsRoutingModule } from './fav-authors-routing.module';
import { FavListComponent } from './components/fav-list/fav-list.component';
import {SharedModuleModule} from "../shared-module/shared-module.module";


@NgModule({
  declarations: [
    FavListComponent
  ],
  imports: [
    CommonModule,
    FavAuthorsRoutingModule,
    SharedModuleModule
  ]
})
export class FavAuthorsModule { }
