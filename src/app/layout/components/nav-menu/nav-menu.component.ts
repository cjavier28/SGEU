import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit{
  idEstudiante: string ="";
  userName: string | null = '';
  lastName: string | null = '';
  userAvatarUrl: string | null = '';

  constructor(private router: Router) {


    if(  localStorage !=undefined){
      if(localStorage.length>0){
        this.idEstudiante = localStorage.getItem('id') || ''; // Obtener el idEstudiante desde localStorage
      }
    }

  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('nombre');
    this.lastName = localStorage.getItem('apellido');
  }

  logout(): void {
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('avatarUrl');
    localStorage.removeItem('id');
    localStorage.removeItem('idP');
    localStorage.removeItem('tokenBearer');
   this.router.navigate(['/login']);
  }
}
