import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsRoutingModule } from './authors-routing.module';
import { ListComponent } from './components/list/list.component';
import {SharedModuleModule} from "../shared-module/shared-module.module";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzAlertModule} from "ng-zorro-antd/alert";


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    SharedModuleModule,
    NzSpinModule,
    NzAlertModule
  ]
})
export class AuthorsModule { }
