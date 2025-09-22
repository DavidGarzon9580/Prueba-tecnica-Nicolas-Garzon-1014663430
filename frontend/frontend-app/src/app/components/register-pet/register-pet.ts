import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf, NgFor } from '@angular/common';
import { ApiService, Usuario, MascotaCreate } from '../../services/api.service';

@Component({
  selector: 'app-register-pet',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatIconModule, NgIf, NgFor],
  templateUrl: './register-pet.html',
  styleUrls: ['./register-pet.css']
})
export class RegisterPetComponent implements OnInit {
  petForm: FormGroup;
  users: Usuario[] = [];

  constructor(private fb: FormBuilder, private api: ApiService, private snackBar: MatSnackBar) {
    this.petForm = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      usuario_id: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.api.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => {
        console.error('Error cargando usuarios:', err);
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      },
    });
  }

  submit() {
    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched();
      return;
    }

    const petData: MascotaCreate = this.petForm.value;
    this.api.registerPet(petData).subscribe({
      next: (mascota) => {
        this.snackBar.open(`Mascota ${mascota.nombre} registrada exitosamente!`, 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.petForm.reset();
      },
      error: (error) => {
        console.error('Error:', error);
        this.snackBar.open('Error al registrar mascota: ' + (error.error?.detail || 'Error desconocido'), 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.petForm.get(controlName);
    return control?.touched && control?.hasError(errorName) || false;
  }
}
