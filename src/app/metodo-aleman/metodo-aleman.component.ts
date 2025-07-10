import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Metodo {
  id: number;
  nombre: string;
  tipo: 'Débito' | 'Crédito' | 'Transferencia';
  activo: boolean;
}

@Component({
  selector: 'app-metodo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metodo-aleman.component.html',
  styleUrls: ['./metodo-aleman.component.css']
})
export class MetodoComponent {
  @Input() metodo: Metodo = {
    id: 0,
    nombre: 'Visa Gold',
    tipo: 'Crédito',
    activo: true
  };

  @Output() editar = new EventEmitter<Metodo>();
  @Output() eliminar = new EventEmitter<number>();

  onEditar(): void {
    this.editar.emit(this.metodo);
  }

  onEliminar(): void {
    this.eliminar.emit(this.metodo.id);
  }
}
