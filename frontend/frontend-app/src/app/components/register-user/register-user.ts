import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common'; 
import { ApiService, UsuarioCreate } from '../../services/api.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.css']
})
export class RegisterUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private snackBar: MatSnackBar) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const userData: UsuarioCreate = this.userForm.value;
    this.api.registerUser(userData).subscribe({
      next: (usuario) => {
        this.snackBar.open(`Usuario ${usuario.nombre} registrado exitosamente!`, 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.userForm.reset();
      },
      error: (error) => {
        console.error('Error:', error);
        this.snackBar.open('Error al registrar usuario: ' + (error.error?.detail || 'Error desconocido'), 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.userForm.get(controlName);
    return control?.touched && control?.hasError(errorName) || false;
  }
}
