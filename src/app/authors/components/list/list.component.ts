import {Component, OnInit} from '@angular/core';
import {AuthorsService} from "../../services/authors.service";
import {Authors} from "../../models/authors.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  page: number = 1;
  size: number = 10;

  constructor(private authorsService: AuthorsService) {
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(page: number = this.page, size = this.size) {
    this.authorsService.getAuthors(page, size).subscribe((res: Authors) => {
      console.log(res);
    });
  }
}
