import React, {ReactNode} from "react";

export enum TableName {
  customers_table = "customers_table",
  suppliers_table = "suppliers_table"
}

export interface ITableHeaderItem {
  columnType: string;
  title: string;
  value: string;
}
export interface ISupplierData {
  rowId: string,
  avatar: string,
  supplierName: string,
  supplierId: string,
  supplierAddress: string,
  mainCargo: string,
  contactEmail: string,
  contactPhone: string,
  status: string,
  status___color: string
}

export interface ICustomerData {
  rowId: string,
  customerName: string,
  customerId: string,
  customerAddress: string,
  loadingSite: string,
  contactEmail: string,
  contactPhone: string,
  status: string,
  status___color: string
  priority: string
  priority___color: string
}

export interface ITooltip {
  title: string;
  value: string;
}
export type IActiveTooltip = null | HTMLElement;

export interface ITableDataCellObj {
  content: string | ReactNode,
  bgColor: string | null
}

export type SortDirectionType = "asc" | "desc"
export type SortFieldType = string
export interface ISortParams {
  sortDirection: SortDirectionType,
  sortField: SortFieldType,
}
export type IFilterParams = Record<string, string>;

export type Fetch = (sortParams: ISortParams, filterParams: IFilterParams) => void;

export interface DataTableProps {
  columns: ITableHeaderItem[];
  data: ITableDataCellObj[][],
  tooltips: ITooltip[],
  activeTooltip: IActiveTooltip,
  setActiveTooltip: React.Dispatch<React.SetStateAction<IActiveTooltip>>;
  fetchData: Fetch
}

