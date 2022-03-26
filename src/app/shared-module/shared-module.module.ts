import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListItemComponent} from './list-item/list-item.component';
import {InputInlineEditorComponent} from './input-inline-editor/input-inline-editor.component';
import {NzPaginationModule} from "ng-zorro-antd/pagination";


@NgModule({
  declarations: [
    ListItemComponent,
    InputInlineEditorComponent
  ],
  exports: [
    ListItemComponent
  ],
  // exports: [
  //   ListItemComponent
  // ],
  imports: [
    CommonModule,
    NzPaginationModule
  ]
})
export class SharedModuleModule {
}
