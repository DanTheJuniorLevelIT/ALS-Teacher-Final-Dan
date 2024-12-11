import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';
import { response } from 'express';

@Component({
  selector: 'app-studentassessment',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './studentassessment.component.html',
  styleUrl: './studentassessment.component.css'
})
export class StudentassessmentComponent implements OnInit{
  isLoading: boolean = false; // This controls the loader visibility
  studentsAssess: any;
  classid: any;
  id: any;
  moduleID: any;
  status: any;

  fname: any;
  lname: any;

  constructor(private apiserv: ApiserviceService, private route: Router){}

  ngOnInit(): void {
    this.isLoading = true;
    this.moduleID = localStorage.getItem('moduleid');
    this.id = localStorage.getItem('lrn');
    this.classid = localStorage.getItem('classid');
    this.fname = localStorage.getItem('sfirstname');
    this.lname = localStorage.getItem('slastname');
    this.loadStudentAssesments(this.id, this.classid);
  }

  loadStudentAssesments(lrn:any, classid: any){
    this.apiserv.getStudentAssessments(lrn, classid).subscribe((response:any)=>{
      this.studentsAssess = response.assessments;
      this.status = response.status;
      console.log(this.studentsAssess);
      console.log(this.status);
      this.isLoading = false;
    })
  }

  navigateToProgress(assID: number, lessTitle: any, moduleid: any) {
    // Store the subjectID in localStorage
    localStorage.setItem('assid', assID.toString());
    localStorage.setItem('lrn', this.id);
    localStorage.setItem('lessTitle', lessTitle);
    localStorage.setItem('moduleid', moduleid)
    localStorage.setItem('fname', this.fname);
    localStorage.setItem('lname', this.lname);

    // Navigate to the modules page
    // this.route.navigate(['/main/Subject/main/subject/modulesmain', subjectID, 'modules']);
    this.route.navigate(['/main/Subject/main/subject/modulesmain', this.classid, 'modules', this.moduleID, 'assess', 'question', assID, 'checking']);
  }

}
