import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private backendURL = 'http://localhost:80/';

  constructor(private http: HttpClient) {
    http.get(`${this.backendURL}`).subscribe(data => console.log(data));
  }


  public login(userName, passWord) {
    const container = {
      username: userName,
      password: passWord
    };

    this.http.post(`${this.backendURL}`, JSON.stringify(container)).subscribe((data) => {
      console.log(data);
    });
  }
}
