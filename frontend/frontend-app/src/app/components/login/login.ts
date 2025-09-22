import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule, NgIf, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private api: ApiService, 
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const loginData = this.loginForm.value;
    
    this.api.login(loginData).subscribe({
      next: (response) => {
        // Guardar el token en localStorage
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('token_type', response.token_type);
        
        // Mostrar mensaje de éxito
        this.snackBar.open('¡Login exitoso! Redirigiendo...', 'Cerrar', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
        
        // Redirigir al dashboard después de un pequeño delay
        setTimeout(() => {
          this.router.navigate(['/dashboard']).then(success => {
            if (success) {
              console.log('Redirección exitosa al dashboard');
            } else {
              console.error('Error en la redirección al dashboard');
              this.snackBar.open('Error al redirigir. Intenta nuevamente.', 'Cerrar', {
                duration: 3000,
                panelClass: ['error-snackbar']
              });
            }
          });
        }, 1000);
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.loading = false;
        
        let errorMessage = 'Error en el login';
        
        if (error.status === 401) {
          errorMessage = 'Credenciales inválidas. Verifica tu correo y contraseña.';
        } else if (error.status === 0) {
          errorMessage = 'Error de conexión. Verifica que el servidor esté funcionando.';
        } else if (error.error?.detail) {
          errorMessage = error.error.detail;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control?.touched && control?.hasError(errorName) || false;
  }
}
