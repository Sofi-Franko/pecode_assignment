import { useState, useEffect } from 'react';
import {Fetch, SortDirectionType} from "../interfaces";

export function useFilterAndSortTable(fetchData: Fetch) {
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDirectionType>("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchData({ sortDirection, sortField }, filters);
  }, [sortDirection, sortField, filters]);

  const handleSort = (field: string) => {
    const newSortDirection = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newSortDirection);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({})
  }

  return { sortField, sortDirection, filters, handleSort, handleFilterChange, handleResetFilters };
}
