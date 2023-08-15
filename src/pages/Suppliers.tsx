import React, {useEffect, useState} from 'react';
import {Paper, TableContainer} from '@mui/material';
import DataTable from '../components/DataTable';
import {
  ISupplierData, IFilterParams, ISortParams,
  ITableDataCellObj,
  ITableHeaderItem,
  ITooltip, TableName,
} from "../interfaces";
import fetchData from "../helpers/fetchData";
import getActions from "../helpers/getActions";

const SuppliersPage: React.FC<{}> = () => {
  const [suppliersTableHeader, setSuppliersTableHeader] = useState<ITableHeaderItem[]>([]);
  const [suppliersData, setSuppliersData] = useState<ITableDataCellObj[][]>([]);
  const [tooltips, setTooltips] = useState<ITooltip[]>([]);
  const [activeTooltip, setActiveTooltip] = useState<null | HTMLElement>(null);

  useEffect(() => {
    fetchSuppliersData({sortDirection: "asc", sortField: ""}, {});
  }, [])

  const fetchSuppliersData = async (sortParams: ISortParams, filters: IFilterParams) => {
    try {
      const data = await fetchData(TableName.suppliers_table, sortParams, filters)

      setSuppliersTableHeader(getHead(data.fields))
      setTooltips(data.tooltip)
      setSuppliersData(getBody(data.fields, data.lines))
    } catch (error) {
      console.error('Error fetching customers data:', error);
    }
  };

  const CircleTag = ({ text, bgColor }: {text: string, bgColor: string}) => {
    const circleStyle = {
      display: "inline-block",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      textAlign: "center" as const,
      lineHeight: "30px",
      backgroundColor: bgColor,
      color: "white",
      fontSize: "15px",
      fontWeight: "bold",
    };

    return <div style={circleStyle}>{text}</div>;
  };

  const getHead = (fields: ITableHeaderItem[]) => {
    const columnsWithoutActions = fields.filter((f: ITableHeaderItem) => f.columnType !== "icon")
    return [
      ...columnsWithoutActions,
      {columnType: "actions", title: "actions", value: "Actions"}
    ]
  }

  const getBody = (fields: ITableHeaderItem[], data: ISupplierData[]) => {
    const columnNamesWithoutActions = fields
      .filter((f: ITableHeaderItem) => f.columnType !== "icon")
      .map((f: ITableHeaderItem) => f.title)
    const columnActions = fields.filter((f: ITableHeaderItem) => f.columnType === "icon")

    return data.map((item: ISupplierData) => {

      let rowData: ITableDataCellObj[] = [];

      columnNamesWithoutActions.forEach((c: string) => {
        const keyName = c as keyof ISupplierData;
        const obj: ITableDataCellObj = {content: item[keyName], bgColor: null}

        if (keyName === "supplierName") {
          const avatarParts = item["avatar"].split("___");
          if (avatarParts.length === 3) {
            obj.content = CircleTag({text: avatarParts[1], bgColor: `#${avatarParts[2]}`})
          }
        }
        if (keyName === "status") obj.bgColor = item["status___color"]

        rowData.push(obj)
      })

      rowData.push(getActions(columnActions, item.supplierId, setActiveTooltip));

      return rowData
    })
  }

  return (
    <div>
      <h1>Suppliers</h1>
      <TableContainer component={Paper}>
        <DataTable columns={suppliersTableHeader}
                   data={suppliersData}
                   tooltips={tooltips}
                   activeTooltip={activeTooltip}
                   setActiveTooltip={setActiveTooltip}
                   fetchData={fetchSuppliersData}
        />
      </TableContainer>
    </div>
  );
};

export default SuppliersPage;
