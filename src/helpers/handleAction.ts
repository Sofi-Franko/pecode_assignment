import React from "react";
import {DataTableProps} from "../interfaces";

export default function handleAction(
  actionName: string,
  id: string,
  event: React.MouseEvent<HTMLElement>,
  setActiveTooltip: DataTableProps['setActiveTooltip']
) {
  console.log("Action called ", actionName, " on id ", id)
  switch (actionName) {
    case "moreIcon":
      setActiveTooltip(event.currentTarget);
      break;
    default:
      break;
  }
}
