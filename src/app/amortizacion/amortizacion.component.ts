import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BonoService } from '../bono/bono.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {TablaFlujoComponent} from '../tabla/tabla-flujo.component';

@Component({
  selector: 'app-amortizacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TablaFlujoComponent
  ],
  styleUrls: ['amortizacion.component.css'],
  templateUrl: 'amortizacion.component.html',
})
export class AmortizacionComponent {
  form: FormGroup;
  estructura: any;
  precioActual: any;
  ratios: any;
  tabla: any[] = [];

  displayedColumns: string[] = [
    'fechaProgramada',
    'inflacionAnual',
    'inflacionBimestral',
    'plazoGracia',
    'bonoIndexado',
    'cupon',
    'cuotaAmortizacion',
    'prima',
    'escudo',
    'flujoEmisor',
    'flujoEmisorEscudo',
    'flujoBonista',
    'flujoActualizado',
    'faPlazo',
    'factorP'
  ];

  constructor(private fb: FormBuilder, private bonoService: BonoService) {
    this.form = this.fb.group({
      fechaEmision: [null, Validators.required],
      valorNominal: [null, Validators.required],
      valorComercial: [null, Validators.required],
      numeroAnios: [null, Validators.required],
      frecuenciaCupon: [null, Validators.required],
      diasPorAnio: [null, Validators.required],
      capitalizacion: [null, Validators.required],
      tasaInteresAnual: [null, Validators.required],
      impuestoRenta: [null, Validators.required],
      prima: [null, Validators.required],
      estructuracion: [null, Validators.required],
      colocacion: [null, Validators.required],
      flotacion: [null, Validators.required],
      cavali: [null, Validators.required],
      inflacionAnual: [null, Validators.required],
      plazoGraciaTotal: [null, Validators.required],
      plazoGraciaParcial: [null, Validators.required],
    });
  }

  calcular() {
    const resultado = this.bonoService.calcularDatos(this.form.value);
    this.estructura = resultado.estructura;
    this.precioActual = resultado.precioActual;
    this.ratios = resultado.ratios;
    this.tabla = resultado.tabla;
  }
}
