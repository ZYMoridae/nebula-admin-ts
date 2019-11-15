
export interface PaginationLink {
  ref: string,
  href: string
}

export default interface Pagination {
  links: Array<PaginationLink>,
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

export interface OrdersPagination {
  
}