import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit{

  admin: any;

  isLoading: boolean = false;
  isSubmitting: boolean = false;

  private intervalId: any;
  isModalOpen = false;
  isModalOpen2 = false;
  isModalOpen3 = false;
  currentDate = new Date();
  messages: any;
  students: any;
  selectedRecipient: string = ''; 
  
  selectedMessage: any = null;
  selectedMessageID: any;
  replyText: string = '';

  viewConvoMessage(msg: any) {
    const fullName = `${msg.firstname} ${msg.lastname}`;
    localStorage.setItem('lrn', msg.lrn);
    localStorage.setItem('learner', fullName);

    this.route.navigate(['/main/Message/main/message/view']);
  }

  sendReply(lrn: any) 
  {
    this.isSubmitting = true;
      if (this.replyText.trim()) {
          const replyPayload = {
              lrn: lrn,
              messages: this.replyText,
              adminID: localStorage.getItem('id'),
              mid: this.selectedMessageID
          };

          this.apiserve.sendReply(replyPayload).subscribe(
              response => {
                  console.log('Reply sent successfully:', response);
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Reply sent successfully!",
                    showConfirmButton: false,
                    timer: 1000
                  });
                  this.isModalOpen3 = false;
                  this.replyText = '';
                  this.loadMessage(localStorage.getItem('id'));
                  this.isSubmitting = false;
              },
              error => {
                  console.error('Error sending reply:', error);
                  Swal.fire({
                    title: "Error",
                    text: "Failed to send Reply",
                    icon: "error"
                  });
                  this.isSubmitting = false;
              }
          );
      } else {
        Swal.fire({
          title: "Error",
          text: "Reply cannot be empty",
          icon: "error"
        });
      }
  }




  constructor(private apiserve: ApiserviceService, private route: Router) {
    this.currentDate = new Date();
  }
  ngOnInit(): void {
    const adminid = localStorage.getItem('id');
    this.student(adminid);

    this.admin = this.getAdminDetails();

    this.spinner();

    this.intervalId = setInterval(() => {
      this.loadMessage(adminid);
    }, 20000);
  }

  getAdminDetails() {
    const details = localStorage.getItem('adminDetails');
    return details ? JSON.parse(details) : null;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  spinner() {
    this.isLoading = true; 

    setTimeout(() => {
      this.isLoading = false; 
    }, 20000);
  }

  loadMessage(id: any){
    this.apiserve.getMessages(id).subscribe((msg: any)=>{
      this.messages = msg;
      console.log(this.messages);
    })
  }

  student(id: any){
    this.apiserve.student(id).subscribe((stud: any)=>{
      this.students = stud;
      console.log(this.students);
    })
  }

  onAddMessage() {
    this.isModalOpen2 = true;
  }

  closeModal2() {
    this.isModalOpen2 = false;
  }

  closeModal3() {
    this.isModalOpen3 = false;
  }

  sendMessage() {
    const recipient = (document.getElementById('recipient') as HTMLSelectElement).value;
    const messageText = (document.getElementById('message') as HTMLTextAreaElement).value;
  
    if (!recipient) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please select a recipient.",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
  
    if (!messageText.trim()) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Message cannot be empty.",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
  
    const messagePayload = {
      lrn: recipient,
      messages: messageText,
      adminID: localStorage.getItem('id'),
    };
    this.isSubmitting = true;
    this.apiserve.sendMessage(messagePayload).subscribe(
      response => {
        console.log('Message sent successfully:', response);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Message sent successfully!",
          showConfirmButton: false,
          timer: 1000
        });
        this.closeModal2();
        this.loadMessage(localStorage.getItem('id'));
        this.isSubmitting = false;
      },
      error => {
        console.error('Error sending message:', error);
        Swal.fire({
          title: "Error",
          text: "Failed to send Message",
          icon: "error"
        });
        this.isSubmitting = false;
      }
    );
  }
  

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
