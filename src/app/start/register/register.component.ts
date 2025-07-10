import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegistroComponent {
  tab: 'registro' | 'login' = 'registro';

  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  cambiarTab(nuevaTab: 'registro' | 'login') {
    this.tab = nuevaTab;
  }

  registrar() {
    console.log('Datos enviados:', { nombre: this.nombre, email: this.email, password: this.password });
    alert('¡Registro simulado exitosamente!');
    this.tab = 'login'; // Cambia a la pestaña login después de registrar
  }

  iniciarSesion() {
    console.log('Intento de login:', { email: this.email, password: this.password });
    alert('¡Inicio de sesión simulado exitosamente!');
    this.router.navigate(['/home']); // Redirige a /home
  }
}
