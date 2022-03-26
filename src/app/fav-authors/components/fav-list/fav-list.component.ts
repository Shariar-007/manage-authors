import { Component, OnInit } from '@angular/core';
import {Authors} from "../../../authors/models/authors.model";
import {DataConfig, RowData, TablePaginationConfig} from "../../../models/list-table.model";
import {AuthorsService} from "../../../authors/services/authors.service";
import {FavListService} from "../../services/fav-list.service";

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss']
})
export class FavListComponent implements OnInit {

  authors: Authors | undefined;
  page: number = 1;
  size: number = 10;

  tableConfig: DataConfig = {
    tableTitle: "Favourite Author List",
    columns: [
      {title: "S/L", dataField: "serial", sortable: false, filterable: false, width: '80px'},
      {title: "NAME", dataField: "name", sortable: false, filterable: true, width: 'auto'},
      {title: "BIO", dataField: "bio", sortable: false, filterable: true, width: '40%'},
      {title: "LINK", dataField: "link", sortable: false, filterable: true, width: '30%'},
      {title: "ACTION", dataField: "ROW_ACTION", width: 'auto'},
      // {title: "STATUS", dataField: "status", sortable: false, filterable: true},
    ],
    rowActions: [
      {label: "Remove", actionIdToReturn: "remove", showOption: (x: any) => true},
    ],
  }

  tablePaginationConfig: TablePaginationConfig = {
    itemPerPage: 10,
    page: 1,
    total: 0
  }

  constructor(private favListService: FavListService) {
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(page: number = this.page, size = this.size) {
    this.favListService.getFavouriteAuthors(page, size).subscribe((res: Authors) => {
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

  onRemoveFromFavList(event: RowData) {
    console.log(event);
  }
}
