import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsRoutingModule } from './authors-routing.module';
import { ListComponent } from './components/list/list.component';
import {SharedModuleModule} from "../shared-module/shared-module.module";


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    SharedModuleModule
  ]
})
export class AuthorsModule { }
