// export interface ListTable {
// }

import {FormGroup} from "@angular/forms";

export interface ParamedicTable {
  isActive: boolean;
  tableName: string;
}

export interface ColumnTable {
  title: string;
  dataField: string;
  editable?: boolean,
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

export interface RowActions {
  label: string;
  actionIdToReturn: string;
  // visible: boolean;
  // iconImgUrl?: string;
  showOption?(x: any): any;
}

export interface DataConfig {
  tableTitle?: string,
  columns: ColumnTable[];
  rowActions: RowActions[];
  rowsPerPage?: number;
}

export interface RowActionWithData {
  actionType: string,
  index: number,
  rowData: any
}

export interface RowData {
  index: number,
  rowData: any
}

export interface ModalFormFormat {
  value?: number | string,
  label: string,
  type: string,
}

export interface ModalFormGroup {
  forms: ModalFormFormat[],
  formGroup: FormGroup
}

export interface TablePaginationConfig {
  totalPage?: number,
  itemPerPage: number,
  page: number,
  total: number
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface ColumnSortingOptions {
  dataField: string,
  sortingOrder: SortOrder
}
