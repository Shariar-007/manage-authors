import {Component, OnInit} from '@angular/core';
import {AuthorsService} from "../../services/authors.service";
import {Authors} from "../../models/authors.model";
import {IAuthor} from "../../models/i-author.model";
import {DataConfig, RowData, TablePaginationConfig} from "../../../shared-module/models/list-table.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  authors: Authors | undefined;
  page: number = 1;
  size: number = 20;

  tableConfig: DataConfig = {
    tableTitle: "Author List",
    columns: [
      {title: "S/L", dataField: "serial", sortable: false, filterable: false, width: '80px'},
      {title: "NAME", dataField: "name", sortable: false, filterable: true, width: '10%'},
      {title: "BIO", dataField: "bio", sortable: false, filterable: true, width: 'auto'},
      {title: "LINK", dataField: "link", sortable: false, filterable: true, width: '25%'},
      {title: "ACTION", dataField: "ROW_ACTION", width: '180px'},
      // {title: "STATUS", dataField: "status", sortable: false, filterable: true},
    ],
    rowActions: [
      {label: "Add Favourite", actionIdToReturn: "add", showOption: (x: any) => true},
      {label: "Remove Favourite", actionIdToReturn: "remove", showOption: (x: any) => true},
    ],
  }

  tablePaginationConfig: TablePaginationConfig = {
    itemPerPage: 20,
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
      for (let i = 0; i < this.authors.results.length; i++) {
        this.authors.results[i].serial = this.getSerialOnPage(i, this.authors.page - 1, this.authors.count);
        this.authors.results[i].isFavourite = false;
      }
      this.tablePaginationConfig.total = this.authors?.totalCount;
      this.isFavourite();
    });
  }

  onPageNumberChange(e: any) {
    this.page = e?.page;
    this.getAuthors();
  }

  getSerialOnPage(currentIndex: number, currentPage: number, pageSize: number) {
    return (currentIndex + 1 + (currentPage * pageSize));
  }

  onClickAddFavBtn(event: RowData) {
    this.saveFavAuthors(event.rowData);
  }

  saveFavAuthors(author: IAuthor) {
    if (JSON.parse(<string>localStorage.getItem('fav-authors'))) {
      const authors: IAuthor[] = JSON.parse(<string>localStorage.getItem('fav-authors'));
      authors.push(author);
      localStorage.setItem('fav-authors', JSON.stringify(authors));
    } else {
      const authors: IAuthor[] = [];
      authors.push(author);
      localStorage.setItem('fav-authors', JSON.stringify(authors));
    }
    this.getAuthors();
  }

  onRemoveFromFavList(event: RowData) {
    // @ts-ignore
    this.authors?.results[event.index]?.isFavourite = false;
    const favAuthors: IAuthor[] = JSON.parse(<string>localStorage.getItem('fav-authors'));
    if (favAuthors?.length > 0) {
      const authors = favAuthors?.filter((item: IAuthor) => item.name != event.rowData.name);
      localStorage.setItem('fav-authors', JSON.stringify(authors));
    }
    this.getAuthors();
  }

  isFavourite() {
    const authors: IAuthor[] = JSON.parse(<string>localStorage.getItem('fav-authors'));
    if (authors && authors?.length > 0) {
      this.authors?.results.forEach((author: IAuthor) => {
        for (let i = 0; i < authors.length; i++) {
          if (author.name == authors[i].name) {
            author.isFavourite = true;
          }
        }
      });
    }
  }
}
