import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Tableau de bord',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-black', class: '' },
    { path: '/employees', title: 'Employés',  icon:'fas fa-users text-red', class: '' },
    { path: '/events', title: 'Tâches',  icon:'ni-bullet-list-67 text-primary', class: '' },
    { path: '/calendar', title: 'Événements',  icon:'ni-calendar-grid-58 text-primary', class: '' },
    { path: '/user-profile', title: 'Mon Profil',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/login', title: 'se Connecter',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 's\'Inscrire',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  username:string = localStorage.getItem('username');
  photo:string = (localStorage.getItem('photo')?localStorage.getItem('photo'):'profile.jpg');

  constructor(private router: Router) { }

  ngOnInit() {
    this.photo = (localStorage.getItem('photo')?localStorage.getItem('photo'):'profile.jpg');

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.setItem('photo', 'profile.jpg');
    this.username = '';
    this.photo = 'profile.jpg';
    window.location.href = 'http://localhost:4200/#/dashboard';
  }
}
