import {Component, OnInit} from '@angular/core';
import {AuthorsService} from "../../services/authors.service";
import {Authors} from "../../models/authors.model";
import {DataConfig, RowData, TablePaginationConfig} from "../../../models/list-table.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  authors: Authors | undefined;
  page: number = 1;
  size: number = 10;

  tableConfig: DataConfig = {
    tableTitle: "Author List",
    columns: [
      {title: "S/L", dataField: "serial", sortable: false, filterable: false, width: '80px'},
      {title: "NAME", dataField: "name", sortable: false, filterable: true, width: 'auto'},
      {title: "BIO", dataField: "bio", sortable: false, filterable: true, width: '30%'},
      {title: "LINK", dataField: "link", sortable: false, filterable: true, width: '25%'},
      {title: "ACTION", dataField: "ROW_ACTION", width: '160px'},
      // {title: "STATUS", dataField: "status", sortable: false, filterable: true},
    ],
    rowActions: [
      {label: "Add Favourite", actionIdToReturn: "add", showOption: (x: any) => true},


      // {label: "Add Favourite", actionIdToReturn: "edit", iconImgUrl: "fa fa-edit", showOption: (x: any) => true},
      // {label: "Delete", actionIdToReturn: "delete", iconImgUrl: "fa fa-trash", showOption: (x: any) => !x.isActive},
    ],
  }

  tablePaginationConfig: TablePaginationConfig = {
    itemPerPage: 10,
    page: 1,
    total: 0
  }

  constructor(private authorsService: AuthorsService) {
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(page: number = this.page, size = this.size) {
    this.authorsService.getAuthors(page, size).subscribe((res: Authors) => {
      this.authors = res;
      // console.log(res);
      for (let i = 0; i < this.authors.results.length; i++) {
        this.authors.results[i].serial = this.getSerialOnPage(i, this.authors.page - 1, this.authors.count);
      }
      this.tablePaginationConfig.total = this.authors?.totalCount;
    });
  }

  onPageNumberChange(e: any) {
    this.page = e?.page;
    this.getAuthors();
  }

  getSerialOnPage(currentIndex: number, currentPage: number, pageSize: number){
    return (currentIndex + 1 + (currentPage * pageSize));
  }

  onClickAddFavBtn(event: RowData) {
    console.log(event);
  }
}
