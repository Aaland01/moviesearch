import { AgGridReact } from "ag-grid-react";
import { gridTheme } from "../assets/aggridtheme";
import { ModuleRegistry, ClientSideRowModelModule, ValidationModule, ColumnAutoSizeModule } from 'ag-grid-community'

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  ColumnAutoSizeModule
]);


const GridTable = ({columnDefs, rowData, onRowClicked}) => {
  return (
    <>
      <div className="gridwrapper text-capitalize">
        <AgGridReact
          autoSizeStrategy={{type: "fitCellContents"}}
          theme={gridTheme}
          columnDefs={columnDefs}
          rowData={rowData}
          onRowClicked={onRowClicked}
        />
      </div>
    </>
  )
};

export default GridTable;
