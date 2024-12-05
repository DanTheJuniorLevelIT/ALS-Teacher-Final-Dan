import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

interface Subject {
  title: string;
  time: string;
  image: string;
  level: string;
}

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})

export class SubjectComponent implements OnInit{
  isModalOpen = false;
  allSubjects: any;
  subBlp: any;
  subAlsElem: any;
  subAlsJhs: any;
  authtoken: any;
  teacherid: any;
  


  constructor(private apiserv: ApiserviceService, private route: Router) {}

  isLoading: boolean = false; // This controls the loader visibility

  ngOnInit(): void {
    this.isLoading = true;
    this.loadSubjects();
  }

  loadSubjects(): void {
    const id = localStorage.getItem('id');
    this.teacherid = id;
  
    // Call the API to fetch subjects
    this.apiserv.getAllTeacherSubjects(this.teacherid).subscribe(
      (response) => {
        this.allSubjects = response; // Assign the fetched subjects
        this.filteredSubjects(); // Filter the subjects if needed
        this.isLoading = false; // Hide the loader after data is fetched
      },
      (error) => {
        console.error('Error fetching subjects:', error);
        this.isLoading = false; // Hide the loader even if there's an error
      }
    );
  }

  filteredSubjects(){
    this.subBlp = this.allSubjects.filter((sub: { Program: string; }) => sub.Program == 'Basic Literacy Program');
    this.subAlsElem = this.allSubjects.filter((sub: { Program: string; })=> sub.Program == 'ALS Elementary');
    this.subAlsJhs = this.allSubjects.filter((sub: { Program: string; }) => sub.Program == 'ALS Junior High School');
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  navigateToModules(classid: number) {
    // Store the classid in localStorage
    localStorage.setItem('classid', classid.toString());

    // Navigate to the modules page
    this.route.navigate(['/main/Subject/main/subject/modulesmain', classid]);
  }
}
