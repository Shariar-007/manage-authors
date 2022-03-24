import {IAuthor} from "./i-author.model";

export interface Authors {
  count: number,
  totalCount: number,
  page: number,
  totalPages: number,
  lastItemIndex: number,
  results: IAuthor[]
}
