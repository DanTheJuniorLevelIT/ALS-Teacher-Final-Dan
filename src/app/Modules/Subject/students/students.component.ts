import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})

export class StudentsComponent implements OnInit {
  isLoading: boolean = false; // This controls the loader visibility
  students: any;
  classid: any;
  total: any;

  constructor(private apiserv: ApiserviceService, private route: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.classid = localStorage.getItem('classid');
    this.loadStudentByClass(this.classid);
  }

  loadStudentByClass(cid: any){
    this.apiserv.getStudentsByClass(cid).subscribe((students: any)=>{
      this.students = students.allStudents
      this.total = students.total_students
      console.log(this.students);
      this.isLoading =false
    })
  }

  navigateToStudentAssessments(student: any){
    localStorage.setItem('lrn', student.lrn);
    localStorage.setItem('sfirstname', student.firstname);
    localStorage.setItem('slastname', student.lastname);

    this.route.navigate(['/main/Subject/main/subject/modulesmain/', this.classid, 'students', student.lrn, 'details']);
  }

}