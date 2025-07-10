import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-formula',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './FormulasComponent.html',
  styleUrls: ['./FormulasComponent.css']
})
export class FormulaComponent {

}
