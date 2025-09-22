import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

export interface UsuarioCreate {
  nombre: string;
  correo: string;
  password: string;
}

export interface Mascota {
  id: number;
  nombre: string;
  raza: string;
  edad: number;
  usuario_id: number;
}

export interface MascotaCreate {
  nombre: string;
  raza: string;
  edad: number;
  usuario_id: number;
}

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://127.0.0.1:8000'; 
  
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Usuarios
  registerUser(user: UsuarioCreate): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}/usuarios`, user);
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_URL}/usuarios`);
  }

  // Mascotas
  registerPet(pet: MascotaCreate): Observable<Mascota> {
    return this.http.post<Mascota>(`${this.API_URL}/mascotas`, pet);
  }

  getPetsByUser(userId: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.API_URL}/usuarios/${userId}/mascotas`);
  }

  // Autenticación
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials);
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('token_type');
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
