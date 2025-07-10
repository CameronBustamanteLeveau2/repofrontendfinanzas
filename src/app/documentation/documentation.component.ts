import { Component } from '@angular/core';

interface Card {
  icon: string;
  titulo: string;
  descripcion?: string;
  lista?: string[];
}

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentacionComponent {
  cards: Card[] = [
    {
      icon: '⭐',
      titulo: 'Cita Educativa',
      descripcion: '"El Conocimiento Financiero No Solo Se Aprende, Se Aplica." — Grupo 2'
    },
    {
      icon: '⚙️',
      titulo: 'Tecnologías Utilizadas',
      descripcion: 'Angular, Java, Java Spring Boot, HTML & CSS, Angular Material'
    },
    {
      icon: '❓',
      titulo: '¿Cómo Usarla?',
      lista: [
        'Ingresar Los Datos Pedidos',
        'Seleccionar La Moneda',
        'Haz Click En "Calcular"'
      ]
    },
    {
      icon: '📚',
      titulo: 'Fundamento Teórico',
      lista: [
        'Amortización Constante En Cada Periodo, Intereses Decrecen Progresivamente',
        'Resultado: Cuotas Totales Que Disminuyen Con El Tiempo'
      ]
    },
    {
      icon: '✍️',
      titulo: 'Autores',
      descripcion: 'Todo El Grupo 2 De Finanzas E Ingeniería Económica'
    },
    {
      icon: '✅',
      titulo: '¿Qué Hace?',
      lista: [
        'Calcula Cuotas Periódicas',
        'Desglosa Amortización E Intereses',
        'Genera Tabla Detallada',
        'Muestra Variación De Pagos Con El Tiempo'
      ]
    }
  ];
}
