import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, Mascota, Usuario } from '../../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-list-pets',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatButtonModule, MatCardModule, MatIconModule, MatSelectModule, MatFormFieldModule, NgIf, NgFor],
  templateUrl: './list-pets.html',
  styleUrls: ['./list-pets.css']
})
export class ListPetsComponent implements OnInit {
  pets: Mascota[] = [];
  users: Usuario[] = [];
  displayedColumns: string[] = ['nombre', 'raza', 'edad'];
  selectedUserId: number | null = null;
  loading = false;

  constructor(private api: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.api.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error cargando usuarios:', error);
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  loadPets() {
    if (this.selectedUserId) {
      this.loading = true;
      this.api.getPetsByUser(this.selectedUserId).subscribe({
        next: (data) => {
          this.pets = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error cargando mascotas:', error);
          this.snackBar.open('Error al cargar las mascotas', 'Cerrar', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          this.loading = false;
        }
      });
    }
  }

  onUserChange() {
    this.pets = [];
    this.loadPets();
  }

  getOwnerName(usuarioId: number): string {
    const user = this.users.find(u => u.id === usuarioId);
    return user ? user.nombre : 'Usuario desconocido';
  }

  goBack() {
    // Este método se puede implementar para navegar de vuelta al dashboard
    // Por ahora solo limpiamos la selección
    this.selectedUserId = null;
    this.pets = [];
  }
}
