import {IFilterParams, ISortParams, TableName} from "../interfaces";

export default async function fetchData(tableName: TableName, sortParams: ISortParams, filters: IFilterParams) {
  const {sortDirection = "asc", sortField = ""} = sortParams;
  let filterQueryString = "";
  for (const [filterKey, filterValue] of Object.entries(filters)) {
    if (filterValue) {
      filterQueryString += `&${filterKey}=${filterValue}`;
    }
  }

  const response = await fetch(
    `http://localhost:3001/?tableName=${tableName}` +
    `&sortDirection=${sortDirection.toUpperCase()}&sortField=${sortField}` +
    filterQueryString
  );

  return response.json();
}
