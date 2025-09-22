import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule, 
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  isAuthenticated = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.isAuthenticated = this.api.isAuthenticated();
    }
  }

  checkAuth(): boolean {
    return this.api.isAuthenticated();
  }

  logout() {
    this.api.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}