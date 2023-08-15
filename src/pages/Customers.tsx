import React, {useEffect, useState} from 'react';
import {Paper, TableContainer} from '@mui/material';
import DataTable from '../components/DataTable';
import {
  ICustomerData,
  IFilterParams,
  ISortParams,
  ITableDataCellObj,
  ITableHeaderItem,
  ITooltip,
  TableName,
} from "../interfaces";
import fetchData from "../helpers/fetchData";
import getActions from "../helpers/getActions";

const CustomersPage: React.FC<{}> = () => {
  const [customersTableHeader, setCustomersTableHeader] = useState<ITableHeaderItem[]>([]);
  const [customersData, setCustomersData] = useState<ITableDataCellObj[][]>([]);
  const [tooltips, setTooltips] = useState<ITooltip[]>([]);
  const [activeTooltip, setActiveTooltip] = useState<null | HTMLElement>(null);

  useEffect(() => {
    fetchCustomersData({sortDirection: "asc", sortField: ""}, {});
  }, [])

  const fetchCustomersData = async (sortParams: ISortParams, filters: IFilterParams) => {
    try {
      const data = await fetchData(TableName.customers_table, sortParams, filters)

      setCustomersTableHeader(getHead(data.fields))
      setTooltips(data.tooltip)
      setCustomersData(getBody(data.fields, data.lines))
    } catch (error) {
      console.error("Error fetching customers data:", error);
    }
  };

  const getHead = (fields: ITableHeaderItem[]) => {
    const columnsWithoutActions = fields.filter((f: ITableHeaderItem) => f.columnType !== "icon")
    return [
      {columnType: "actions", title: "actions", value: "Actions"},
      ...columnsWithoutActions
    ]
  }

  const getBody = (fields: ITableHeaderItem[], data: ICustomerData[]) => {
    const columnNamesWithoutActions = fields
      .filter((f: ITableHeaderItem) => f.columnType !== "icon")
      .map((f: ITableHeaderItem) => f.title)
    const columnActions = fields.filter((f: ITableHeaderItem) => f.columnType === "icon")

    return data.map((item: ICustomerData) => {

      let rowData: ITableDataCellObj[] = [];
      rowData.push(getActions(columnActions, item.customerId, setActiveTooltip));

      columnNamesWithoutActions.forEach((c: string) => {
        const keyName = c as keyof ICustomerData;
        const obj: ITableDataCellObj = {content: item[keyName], bgColor: null}

        if (keyName === "customerName") obj.bgColor = item["priority___color"]
        if (keyName === "status") obj.bgColor = item["status___color"]

        rowData.push(obj)
      })

      return rowData
    })
  }

  return (
    <div>
      <h1>Customers</h1>
      <TableContainer component={Paper}>
        <DataTable columns={customersTableHeader}
                   data={customersData}
                   tooltips={tooltips}
                   activeTooltip={activeTooltip}
                   setActiveTooltip={setActiveTooltip}
                   fetchData={fetchCustomersData}
        />
      </TableContainer>
    </div>
  );
};

export default CustomersPage;
