import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TableSortLabel,
  TextField,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import {ITableHeaderItem, ITooltip, DataTableProps, ITableDataCellObj} from "../interfaces";
import {useFilterAndSortTable} from "../hooks/useFilterAndSortTable";

const DataTable: React.FC<DataTableProps> = ({columns,
                                               data,
                                               tooltips,
                                               activeTooltip,
                                               setActiveTooltip,
                                               fetchData}) => {
  const { sortField, sortDirection, filters, handleSort, handleFilterChange, handleResetFilters } = useFilterAndSortTable(fetchData);

  const handleCloseTooltip = () => {
    setActiveTooltip(null);
  };

  const getTooltips = () => {
    return <Menu
      anchorEl={activeTooltip}
      open={Boolean(activeTooltip)}
      onClose={handleCloseTooltip}
    >
      {tooltips.map((tooltip: ITooltip) => (
        <MenuItem key={tooltip.title} onClick={handleCloseTooltip}>
          {tooltip.value}
        </MenuItem>
      ))}
    </Menu>
  }

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Button variant="outlined" size="small" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column: ITableHeaderItem) => {
                if (column.columnType === "actions") return <TableCell key={column.title}>{column.value}</TableCell>

                return <TableCell key={column.title}>
                  <div>
                    <TableSortLabel
                      active={sortField === column.title}
                      direction={sortDirection}
                      onClick={() => handleSort(column.title)}
                    >
                      {column.value}
                    </TableSortLabel>
                    <TextField
                      variant="filled"
                      size="small"
                      label={`Filter ${column.value}`}
                      value={filters[`search_${column.title}`] || ''}
                      onChange={(e) => handleFilterChange(`search_${column.title}`, e.target.value)}
                    />
                  </div>
                </TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((rowData: ITableDataCellObj[], i: number) => {
              return <TableRow key={i}>
                {getTooltips()}
                {rowData.map((row: ITableDataCellObj, j: number) => (
                  <TableCell style={{backgroundColor: row.bgColor || "snow"}} key={`${i}_${j}`}>
                    {row.content}
                  </TableCell>
                ))}
              </TableRow>
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
