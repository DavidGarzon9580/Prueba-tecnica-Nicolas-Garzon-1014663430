import { Component, OnInit } from '@angular/core';
import { ApiService, Usuario } from '../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    totalUsers: 0,
    totalPets: 0,
    recentUsers: [] as Usuario[]
  };
  
  mobileMenuOpen = false;

  constructor(
    private api: ApiService, 
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.api.getUsers().subscribe({
      next: (users) => {
        this.stats.totalUsers = users.length;
        this.stats.recentUsers = users.slice(-3);
      },
      error: (error) => {
        console.error('Error cargando estadísticas:', error);
        this.snackBar.open('Error al cargar estadísticas', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  logout() {
    this.api.logout();
    this.snackBar.open('Sesión cerrada exitosamente', 'Cerrar', {
      duration: 3000,
      panelClass: ['info-snackbar']
    });
    this.router.navigate(['/login']);
  }

  goToRegisterUser() {
    this.router.navigate(['/register-user']);
  }

  goToRegisterPet() {
    this.router.navigate(['/register-pet']);
  }

  goToListPets() {
    this.router.navigate(['/list-pets']);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}