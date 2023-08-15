import {DataTableProps, ITableHeaderItem} from "../interfaces";
import {Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import handleAction from "./handleAction";

export default function getActions(columnActions: ITableHeaderItem[], id: string, setActiveTooltip: DataTableProps['setActiveTooltip']) {
  const columnContent = columnActions.map((c) => {
    let icon;
    switch (c.title) {
      case "editIcon":
        icon = <EditIcon/>;
        break;
      case "viewIcon":
        icon = <VisibilityIcon/>;
        break;
      case "moreIcon":
        icon = <MoreVertIcon/>;
        break;
      default:
        break;
    }

    return (
      <Button
        key={c.title}
        startIcon={icon}
        size="small"
        onClick={(event) => handleAction(c.title, id, event, setActiveTooltip)}
        style={{marginRight: "2px", color: "black"}}/>
    );
  })

  return {
    content: <div style={{display: "flex"}}>{columnContent}</div>,
    bgColor: "lightgrey",
  };
}
