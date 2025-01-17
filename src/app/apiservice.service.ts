import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private url = "http://localhost:8000/";
  token = localStorage.getItem('authToken')

  constructor(private http: HttpClient) {}

  // Create a getter method for the URL
  getBaseUrl() {
    return this.url;
  }

  sendResetCode(data: any) {
    return this.http.post(this.url + 'api/sendResetCode', data);
  }

  // Dan Work Services
  verifyAdmin(login: any){
    return this.http.post(this.url + 'api/loginAdmin', login);
  }

  // Use the token for authorized requests
  outAdmin(token: string){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/logoutAdmin', {}, { headers });
  }

  // Home and Subjects Services
  getSubjects(){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(this.url + 'api/subjects', { headers });
  }

  getSpecSubjects(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/${id}`, { headers });
  }

  getTeacherSubjects(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/teacherSub/${id}`, { headers });
  }

  getAllSubjects(){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(this.url + 'api/subjects/showAll', { headers });
  }

  getStudentsByClass(cid: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/getStudentsByClass/${cid}`, { headers });
  }

  getAssessmentsByClass(cid: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/getAssessmentsByClass/${cid}`, { headers });
  }

  getSubModules(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/modules/${id}`, { headers });
  }

  getAllTeacherSubjects(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/allSubjects/${id}`, { headers });
  }

  createAnnouncement(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/subjects/createAnnouncement', data, { headers });
  }

  getAnnouncement(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/showAnnouncement/${id}`, { headers });
  }

  deleteAnnouncement(classid: any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.delete(this.url + `api/subjects/deleteAnnouncement/${classid}`, { headers });
  }

  // END

  //Discussion Services

  createDiscussion(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/subjects/createDiscuss', data, { headers });
  }

  getDiscussion(lessid: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(this.url + `api/subjects/showDiscussion/${lessid}`, { headers });
  }

  viewDiscussionReplies(discussionid: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/discussion/replies/${discussionid}`, { headers });
  }

  sendDiscussionReplies(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(`${this.url}api/subjects/discussion/reply`, data, { headers });
  }

  countDiscussion(lessId: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/discussion/${lessId}`, { headers });
  }

  //END

  // Assessment Services
  createAssess(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/subjects/create', data, { headers });
  }

  getAssessment(){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(this.url + 'api/subjects/assessment', { headers });
  }

  deleteAssessment(id: number) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.delete(`${this.url}api/modules/deleteAssessment/${id}`, { headers });
  }

  getAssessmentDetails(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/showAssessment/${id}`, { headers });
  }

  updateAvailability(assessmentID: number, available: number) {
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.put(this.url + `api/assessment/updateAvailability/${assessmentID}`, { available }, { headers });
  }

  createQuestion(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/subjects/createQuestion', data, { headers });
  }

  getQuestion(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/showQuestion/${id}`, { headers });
  }
  
  editQuestion(data: any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.put(`${this.url}api/subjects/editQuestion/${data.question_id}`, data, { headers });
  }

  deleteQuestion(id: any){
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.delete(`${this.url}api/subjects/deleteQuestion/${id}`, { headers });
  }

  getCompletionStats(id: any, cid: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/getCompleted/${id}/${cid}`, { headers });
  }

  getStudents(id: any, assid: any){
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.get(`${this.url}api/subjects/students/${id}/${assid}`, { headers });
  }

  getStudentAssessments(lrn: any, classid: any){
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.get(`${this.url}api/subjects/learnerassessments/${lrn}/${classid}`, { headers });
  }

  autoCheck(id: any, assid: any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.post(`${this.url}api/subjects/autocheck/${id}/${assid}`, null, { headers });
  }

  submitScore(data: any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.post(`${this.url}api/subjects/submitScore`, data, { headers });
  }

  updateScore(data: any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.post(`${this.url}api/subjects/updateScore`, data, { headers });
  }

  getStudentAnswers (id: any, lrnid: any){
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.get(`${this.url}api/subjects/checking/${id}/${lrnid}`, { headers });
  }

  getTotalPoints(aid: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/assessTotalPoints/${aid}`, { headers });
  }

  getSingleAssessment(id: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/subjects/assessments/${id}`, { headers });
  }

  updateAssessment(id: any, data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
      return this.http.post(`${this.url}api/subjects/assessments/${id}`, data, { headers });
  }

  // END

  // User
  createUser(data: any){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/users', data, { headers });
  }

  // END

  //Elzaina Work Services

  createMods(data: any) {
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'api/modules/create', data, { headers });
  }

  updateModuleDate(id: number, data: any) {
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(`${this.url}api/modules/updateDate/${id}`, data , { headers });
  }
  
  getModules(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/modules/showModules/${id}`, { headers });
  }

  createTopic(data: FormData) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.post(`${this.url}api/modules/createLesson`, data, { headers });
  }
  
  getLessons(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/modules/showLessons/${id}`, { headers });
  }
  getLesson(id: number){
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.get(`${this.url}api/modules/getlessonid/${id}`, { headers });
  }
  updateLessonInfo(id: number, data: any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.patch(`${this.url}api/modules/updateLessonInfo/${id}`, data, { headers });
  }
  
  deleteLesson(id: number): Observable<any> {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.delete(`${this.url}api/modules/deleteLesson/${id}`, { headers });
  }

  uploadFile(lessonId: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('lesson_id', lessonId);
    formData.append('file', file);

    return this.http.post(`${this.url}api/modules/uploadMedia`, formData);
  }
  
  deleteFile(id: number): Observable<any> {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.delete(`${this.url}api/modules/deleteFile/${id}`, { headers });
  }

  deleteMediaFile(mediaid: string): Observable<any> {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.delete(`${this.url}api/modules/deleteMediaFile/${mediaid}`, { headers });
  }

  //Mark Lemuel Work Services

  //Messages
  getMessages(id: any){
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.get(`${this.url}api/messages/${id}`, { headers });
  }

  student(id: any){
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.get(`${this.url}api/students/${id}`, { headers });
  }

  sendReply(data: any){
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.post(`${this.url}api/messages/reply`, data, { headers });
  }

  sendMessage(data: any){
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.post(`${this.url}api/messages/compose`, data, { headers });
  }

  getConvoMessages(lrn: any){
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.get(`${this.url}api/messages/conversation/${lrn}`, { headers });
  }

  getUnreadCount(id: any){
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.get(`${this.url}api/messages/unread/${id}`, { headers });
  }

  markAllMessagesAsRead(adminID: number, lrn: string) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    const body = { adminID, lrn };
    return this.http.post(`${this.url}api/messages/mark-read`, body, { headers });
  }
  //END
  
  //Account

  uploadProfilePicture(formData:any, id:any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.post(`${this.url}api/uploadProfilePicture/${id}`, formData, { headers });
  }

  private profilePicSource = new BehaviorSubject<string>('assets/icon.jpg'); //Default Picture
  currentProfilePic = this.profilePicSource.asObservable();

  updateProfilePic(newPicUrl: string): void {
    this.profilePicSource.next(newPicUrl);
  }

  updateAdminPassword(pdata: any, lrn: any) {
    const headers = { 'Authorization': 'Bearer ' + this.token };
    return this.http.post(`${this.url}api/updateAdminPassword/${lrn}`, pdata, { headers });
  }

  // Reset profile picture to default icon when logging out
  resetProfilePic() {
    this.profilePicSource.next('assets/icon.jpg');
  }
}

