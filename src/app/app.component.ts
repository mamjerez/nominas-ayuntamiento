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
export class AppComponent {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  // Row Data: The data to be displayed.
  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
];



// Column Definitions: Defines the columns to be displayed.
colDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
];

defaultColDef: ColDef = {
  flex: 1,
};
}
