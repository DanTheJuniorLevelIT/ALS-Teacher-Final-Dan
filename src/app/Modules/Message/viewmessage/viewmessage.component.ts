import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../apiservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-viewmessage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './viewmessage.component.html',
  styleUrl: './viewmessage.component.css'
})
export class ViewmessageComponent implements OnInit{

  isLoading: boolean = false; // This controls the loader visibility
  isSubmitting: boolean = false; // Tracks submission state

  convoMessages: any[] = [];
  learnerName: string = '';
  newMessage: string = '';
  currentDate: Date = new Date();
  lrnLearner: any;
  NameLearner: any;
  adminID: any;
  currentUser: any;
  private intervalId: any;

  constructor(private apiService: ApiserviceService) {
    this.currentDate = new Date(); // Initialize with the current date and time
  }
  ngOnInit(): void {
    this.NameLearner = localStorage.getItem('learner');
    this.lrnLearner = localStorage.getItem('lrn'); // Replace with dynamic LRN
    this.adminID = localStorage.getItem('id'); // Replace with dynamic LRN
    // this.loadConversation(this.lrnLearner);
    const admin = this.getAdminDetails();

    this.currentUser = `${admin.firstname} ${admin.lastname}`;

    this.spinner();

    this.intervalId = setInterval(() => {
      this.loadConversation(this.lrnLearner);;
    }, 20000); // = 20 seconds
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getAdminDetails() {
    const details = localStorage.getItem('adminDetails');
    return details ? JSON.parse(details) : null;
  }

  loadConversation(lrn: string): void {
    this.apiService.getConvoMessages(lrn).subscribe((messages: any) => {
      this.convoMessages = messages;
      console.log(messages);
      if (messages.length > 0) {
        this.learnerName = `${messages[0].firstname} ${messages[0].lastname}`;
      }
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    const messageData = {
      lrn: this.lrnLearner, // Replace with dynamic LRN
      adminID: this.adminID, // Replace with dynamic Admin ID
      messages: this.newMessage,
      sender_name: this.learnerName
    };
    this.isSubmitting = true;
    this.apiService.sendMessage(messageData).subscribe((response) => {
      this.loadConversation(this.lrnLearner);
      this.newMessage = '';
      this.isSubmitting = false;
    });
  }

  spinner() {
    this.isLoading = true; // Show the loader before the data is loaded

    // Simulate data fetching (you can replace this with an actual service call)
    setTimeout(() => {
      this.isLoading = false; // Hide the loader after data is fetched
    }, 20000); // Simulated delay of 20 seconds
  }

}
