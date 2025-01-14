import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2';
import { interval } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  tok: any;
  profile: any;
  admin: any;

  unreadCount: number = 0;

  constructor(private api: ApiserviceService, private route: Router){}

  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken');
    this.profile = localStorage.getItem('profile_picture')
    this.tok = authToken;
    localStorage.removeItem('classid');
    this.admin = this.getAdminDetails();

    this.fetchUnreadCount();

    interval(30000).subscribe(() => this.fetchUnreadCount());
  }

  fetchUnreadCount() {
    if (this.admin && this.admin.adminID) {
      this.api.getUnreadCount(this.admin.adminID).subscribe(
        (count: any) => {
          this.unreadCount = count;
          console.log(this.unreadCount);
        },
        error => {
          console.error('Error fetching unread messages count:', error);
        }
      );
    }
  }

  getAdminDetails() {
    const details = localStorage.getItem('adminDetails');
    return details ? JSON.parse(details) : null;
  }

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('show');
    }
  }

  closeNavbar() {
    const navbar = document.querySelector('.sidebar');
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }

  logout(token: any) {
    Swal.fire({
      title: "Are you sure you want to Logout?",
      // text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        if (token) {
          this.api.outAdmin(token).subscribe(
            (response: any) => {
              console.log(response);
              localStorage.removeItem('authToken'); // Remove the token from localStorage
              this.route.navigate(['/login']);      // Navigate to the login page
            },
            error => {
              if (error.status === 401) {
                console.error('Unauthenticated. Please login again.');
                this.route.navigate(['/login']);  // Redirect to login if unauthenticated
              } else {
                console.error('Logout error:', error);
              }
            }
          );
        } else {
          console.error('No token found for logout');
        }
      }
    });
  }
}
