import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import * as Papa from 'papaparse';

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
import { SupabaseService } from './services/supabase.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
    selector: 'app-root',
    imports: [CommonModule,AgGridModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	private readonly _supabaseService = inject(SupabaseService);
   @ViewChild('agGrid') agGrid!: AgGridAngular;
   public rowData1: any[] = [];
   public gridOptions: GridOptions | undefined;
   public _columnDefs: ColDef[] | undefined;

   fileContent: string | ArrayBuffer | null = null;

   ngOnInit(): void {
    this.fecthData();
     }

  async fecthData() { 
    // const data = await import(`../assets/data/202301Nomina.json`);
    // this.rowData1 = data.default;
    // console.log(this.rowData1);
      this._setColumnDefs();
      this._setGridOptions();
   
  }


  _setColumnDefs() {
		this._columnDefs = [
			{
				headerName: 'Orgánico',
				field: 'Orgánico',
				width: 142
			},
			{
				headerName: 'Programa',
				field: 'Programa',
				width: 142
			} as ISetFilterParams,
			{
				headerName: 'Económico',
				field: 'Económico',
				width: 142
			},
			{
				headerName: 'Descripción',
				field: 'Descripción',
				width: 400
			},
			{
				headerName: 'Euros',
				field: 'Euros',
				width: 125,
        aggFunc: 'sum',
			}
		];
	}


  _setGridOptions() {
		this.gridOptions = {
			defaultColDef: {
				// width: 130,
				// suppressMovable: true,
				// lockPosition: 'left',
				// sortable: true,
				// resizable: true,
				// filter: true,
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

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  onFileChange(event: any) {
	console.log(event);
	
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileContent = reader.result;
        this.processCsv(this.fileContent as string);
      };
      reader.readAsText(file);
    }
  }

  async processCsv(csvContent: string) {
    // Parsear el archivo CSV
    const parsedData = Papa.parse(csvContent, {
      header: true,
      delimiter: ';',
      skipEmptyLines: true
    }).data;

    // Convertir valores y limpiar datos
    const cleanedData = parsedData.map((row: any) => ({
      organico: parseInt(row.organico, 10),
      programa: parseInt(row.programa, 10),
      economico: parseInt(row.economico, 10),
      descripcion: row.descripcion,
      euros: parseFloat(row.euros.replace('.', '').replace(',', '.'))
    }));

    try {
      // Crear tabla si no existe
	  //   await this._supabaseService.createTable();
     //  El error "materialize mode required, but it is not allowed in this context" ocurre cuando intentas usar la función RPC execute_sql 
     // con una consulta que requiere el modo materialize en PostgreSQL, pero Supabase no permite ejecutar comandos que modifiquen la estructura
     //  de la base de datos (como CREATE TABLE) mediante una RPC.
     // Solución: Alternativa para Crear la Tabla
     // Supabase no permite ejecutar directamente sentencias de creación de tablas desde el cliente, por razones de seguridad. Para solucionar esto,
     //  puedes usar una de las siguientes opciones:
    
	//  CREATE TABLE IF NOT EXISTS nomina_aapp_2023_1 (
	// 	organico INTEGER NOT NULL,
	// 	programa INTEGER NOT NULL,
	// 	economico INTEGER NOT NULL,
	// 	descripcion TEXT NOT NULL,
	// 	euros NUMERIC(15, 2) NOT NULL
	// );

      // Insertar los datos en Supabase
	  console.log(cleanedData);
	  
      await this._supabaseService.insertData(cleanedData);

      alert('Datos procesados e insertados correctamente.');
    } catch (error) {
      alert('Error al procesar los datos.');
      console.error(error);
    }
  }
}