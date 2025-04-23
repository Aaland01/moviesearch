import { AgGridReact } from "ag-grid-react";
import { gridTheme } from "../assets/aggridtheme";
import { ModuleRegistry, ClientSideRowModelModule, ValidationModule, 
  ColumnAutoSizeModule, InfiniteRowModelModule, CellStyleModule } from 'ag-grid-community'

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  ColumnAutoSizeModule,
  InfiniteRowModelModule,
  CellStyleModule,
]);


const GridTable = ({data, columnDefs, onRowClicked, infinite}) => {

  const gridOptions = {
    columnDefs: columnDefs,
    theme: gridTheme,
    onRowClicked: onRowClicked,
    autoSizeStrategy: { type: "fitCellContents" },
  }

  if (infinite) {
    gridOptions.rowModelType = "infinite";
    gridOptions.datasource = data;
  } else {
    gridOptions.rowData = data;
  }
  

  return (
    <>
      <div className="gridwrapper text-capitalize">
        <AgGridReact {...gridOptions} />
      </div>
    </>
  )
};

export default GridTable;
