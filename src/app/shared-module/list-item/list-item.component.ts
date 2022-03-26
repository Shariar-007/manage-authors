import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  ColumnTable,
  DataConfig,
  RowActionWithData,
  RowData,
  TablePaginationConfig
} from "../../models/list-table.model";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() dataSource: any[] = [];
  @Input() tableConfig = <DataConfig>{};
  @Input() pagination: boolean = false;
  @Input() tablePaginationConfig = <TablePaginationConfig>{};
  @Input() paginationClass: string = '';

  @Output() onRowAddFavBtnClick = new EventEmitter<RowData>();
  @Output() onRowRemoveFavBtnClick = new EventEmitter<RowData>();
  @Output() onPagination = new EventEmitter<TablePaginationConfig>();

  dataSourceClone: any[] = [];
  dataFields: any[] = []

  modalData: any[] = []
  editableColumnCount: number = 0
  isASC: boolean = true;

  constructor() {
    // this.tablePaginationConfig = { ...this.tablePaginationConfig, currentPage: 1, itemsPerPage: 10 }
  }

  ngOnInit(): void {
    this.initialize()
  }

  initialize() {
    this.dataSourceClone = JSON.parse(JSON.stringify(this.dataSource));

    if (!this.tableConfig.columns) return;

    this.tableConfig.columns.forEach(c => this.dataFields.push(c.dataField));
    this.dataSourceClone.forEach(data => {
      let array: any[] = []
      this.tableConfig.columns.forEach(column => {
        array.push({[column.dataField]: false})
      })
      // this.rowEditable.push(array)
    })

    this.tableConfig.columns.forEach(column => {
      if (column.editable) this.editableColumnCount += 1;
    })

    // console.log(this.tableConfig.columns);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initialize()
  }

  onActionButtonClick(name: string, index: number, data: any) {
    const rowData: RowData = {
      index: index, rowData: data
    }
    if (name.toUpperCase() === 'ADD') {
      this.onRowAddFavBtnClick.emit(rowData)
    }
    if (name.toUpperCase() === 'REMOVE') {
      this.onRowRemoveFavBtnClick.emit(rowData)
    }
  }


  onPageChange(pageNum: any) {
    if (pageNum !== this.tablePaginationConfig.page) {
      this.tablePaginationConfig.page = pageNum;
      this.onPagination.emit(this.tablePaginationConfig)
    }
  }

}
