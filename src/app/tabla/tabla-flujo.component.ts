import { Component, Input } from '@angular/core';
import {MatCard} from '@angular/material/card';
import { BonoService } from '../bono/bono.service';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-tabla-flujo',
  styleUrls: ['tabla-flujo.component.css'],
  templateUrl: 'tabla-flujo.component.html',
  imports: [
    MatCard,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe,
    DecimalPipe
  ]
})
export class TablaFlujoComponent {
  @Input() tabla: any[] = [];
  @Input() displayedColumns: string[] = [];
}
