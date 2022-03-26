import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-input-inline-editor',
  templateUrl: './input-inline-editor.component.html',
  styleUrls: ['./input-inline-editor.component.scss']
})
export class InputInlineEditorComponent implements OnInit {

  @Input() value?: string | number;
  @Input() isEditable: boolean = false;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() width: number = 200;
  @Input() height: number = 30;
  @Input() alignItem: string = 'center'
  toggleInputView: boolean = false
  private wasInside: boolean = true

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable ? this.toggleInputView = true : this.toggleInputView = false;
  }

  onValuChange(e: any) {
    if (e.target.value === this.value) return;
    this.valueChange.emit(e.target.value)
  }

}
