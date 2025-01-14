import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {
  AllCommunityModule,
	ColDef,
	ColumnState,
	GridOptions,
	GridReadyEvent,
	ISetFilterParams,
	ModuleRegistry,
	RowClickedEvent
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
    selector: 'app-root',
    imports: [CommonModule,AgGridModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
   @ViewChild('agGrid') agGrid!: AgGridAngular;
   public rowData1: any[] = [];
   public gridOptions: GridOptions | undefined;
   public _columnDefs: ColDef[] | undefined;

   ngOnInit(): void {
    this.fecthData();
     }

  async fecthData() { 
    const data = await import(`../assets/data/csvjson.json`);
    this.rowData1 = data.default;
    console.log(this.rowData1);
      this._setColumnDefs();
      this._setGridOptions();
   
  }


  _setColumnDefs() {
		this._columnDefs = [
			{
				headerName: 'Orgánico',
				field: 'Orgánico',
				width: 42
			},
			{
				headerName: 'Programa',
				field: 'Programa',
				width: 375
			} as ISetFilterParams,
			{
				headerName: 'Económico',
				field: 'Económico',
				width: 210
			},
			{
				headerName: 'Descripción',
				field: 'Descripción',
				width: 90
			},
			{
				headerName: 'Euros',
				field: 'Euros',
				width: 75
			}
		];
	}


  _setGridOptions() {
		this.gridOptions = {
			defaultColDef: {
				width: 130,
				suppressMovable: true,
				lockPosition: 'left',
				sortable: true,
				resizable: true,
				filter: true,
				headerComponentParams: {
					template:
						'<div class="ag-cell-label-container" role="presentation">' +
						'  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" ></span>' +
						'  <div ref="eLabel" class="ag-header-cell-label" role="presentation" >' +
						'    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
						'    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
						'    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
						'    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
						'    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
						'    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
						'  </div>' +
						'</div>'
				}
			},

			rowData: JSON.parse(JSON.stringify(this.rowData1)),
			columnDefs: this._columnDefs,
			groupDisplayType: 'custom',
			groupIncludeTotalFooter: true,
			groupIncludeFooter: true,
			groupHeaderHeight: 25,
			headerHeight: 24,
			suppressAggFuncInHeader: true,
			rowSelection: 'single',
			// localeText: localeTextESPes,
			pagination: true,
			paginationPageSize: 50
		} as GridOptions;
	}

defaultColDef: ColDef = {
  flex: 1,
};
}
