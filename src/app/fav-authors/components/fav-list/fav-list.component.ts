import {Component, OnInit} from '@angular/core';
import {IAuthor} from "../../../authors/models/i-author.model";
import {DataConfig, RowData} from "../../../shared-module/models/list-table.model";

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss']
})
export class FavListComponent implements OnInit {

  favAuthors: IAuthor[] = [];
  tableConfig: DataConfig = {
    tableTitle: "Favourite Author List",
    columns: [
      {title: "S/L", dataField: "serial", sortable: false, filterable: false, width: '80px'},
      {title: "NAME", dataField: "name", sortable: false, filterable: true, width: '10%'},
      {title: "BIO", dataField: "bio", sortable: false, filterable: true, width: 'auto'},
      {title: "LINK", dataField: "link", sortable: false, filterable: true, width: '25%'},
      {title: "ACTION", dataField: "ROW_ACTION", width: '180px'},
    ],
    rowActions: [
      {label: "Remove", actionIdToReturn: "remove", showOption: (x: any) => true},
    ],
  }

  constructor() {
  }

  ngOnInit(): void {
    if (JSON.parse(<string>localStorage.getItem('fav-authors'))) {
      this.favAuthors = JSON.parse(<string>localStorage.getItem('fav-authors'));
      for (let i = 0; i < this.favAuthors.length; i++) {
        this.favAuthors[i].serial = i + 1;
        this.favAuthors[i].isFavourite = true;
      }
    }
  }

  onRemoveFromFavList(event: RowData) {
    this.favAuthors = this.favAuthors?.filter((item: IAuthor) => item.name != event.rowData.name);
    localStorage.setItem('fav-authors', JSON.stringify(this.favAuthors));
    this.ngOnInit();
  }

}
