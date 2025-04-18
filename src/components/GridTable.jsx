import { AgGridReact } from "ag-grid-react";
import { gridTheme } from "../assets/aggridtheme";
import { ModuleRegistry, ClientSideRowModelModule, ValidationModule, ColumnAutoSizeModule, InfiniteRowModelModule } from 'ag-grid-community'

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  ColumnAutoSizeModule,
  InfiniteRowModelModule,
]);


const GridTable = ({datasource, columnDefs, rowData, onRowClicked}) => {
  return (
    <>
      <div className="gridwrapper text-capitalize">
        <AgGridReact
          rowModelType="infinite"
          datasource={datasource}
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
