import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private loginUrl = 'https://navkiraninfotech.com/test_api/index.php';
  private registerUrl = 'https://navkiraninfotech.com/test_api/index.php';
  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }

  register(registerdata: any): Observable<any> {
    return this.http.post(this.registerUrl, registerdata);
  }
}
