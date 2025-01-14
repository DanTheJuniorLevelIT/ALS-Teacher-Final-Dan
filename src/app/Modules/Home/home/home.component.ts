import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  isLoading: boolean = false; // This controls the loader visibility

  sub: any;
  shl: any;
  authtoken: any;
  teacherid: any;
  messages: any;

  isModalOpen = false;
  currentDate: Date;

  notificationsOpen = false;
  notifications = [
    { message: 'Emma Johnson have message you' },
    { message: 'Liam Smith submitted his activity' },
    { message: 'Ava Garcia sent a message' }
  ];

  
  constructor(private apiserv: ApiserviceService, private route: Router) {
    this.currentDate = new Date(); // Initialize with the current date and time
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleNotifications(): void {
    this.notificationsOpen = !this.notificationsOpen;
  }

  ngOnInit() {
    this.isLoading = true;
    this.loadClasses();
  }

  loadMessage(id: any) {
    const adminDetails = this.getAdminDetails();
    if (adminDetails) {
      const adminFullName = adminDetails.firstname + ' ' + adminDetails.lastname;
  
      this.apiserv.getMessages(id).subscribe((msg: any) => {
        // Filter out messages sent by the admin
        this.messages = msg.filter((message: any) => message.sender_name !== adminFullName);
        console.log(this.messages); // Debug filtered messages
      });
    } else {
      console.error('Admin details not found in localStorage.');
    }
  }

  getAdminDetails() {
    const details = localStorage.getItem('adminDetails');
    return details ? JSON.parse(details) : null;
  }

  loadClasses() {
    const id = localStorage.getItem('id');
    this.teacherid = id;
    this.loadMessage(id);
    this.apiserv.getTeacherSubjects(this.teacherid).subscribe(
      (response: any) => {
        this.sub = response.subject;
        this.shl = response.school;
        console.log(this.sub);
        console.log(this.shl);
        this.isLoading = false; 
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false; 
      }
    );
  }

  navigateToModules(classid: number) {
    // Store the classid in localStorage
    localStorage.setItem('classid', classid.toString());

    // Navigate to the modules page
    this.route.navigate(['/main/Subject/main/subject/modulesmain', classid]);
  }


}
