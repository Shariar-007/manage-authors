import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Authors} from "../models/authors.model";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http: HttpClient,) {
  }

  getAuthors(page: number, size: number) {
    let url = environment.base_url + '/authors?page=' + page + '&limit=' + size;
    return this.http.get<Authors>(url);
  }
}
