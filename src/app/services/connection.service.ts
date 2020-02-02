import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private backendURL = 'http://localhost:80'; // url to contact the backend
  public signedIn = false;
  public folder = [];

  constructor(private http: HttpClient) {
  }


  /**
   * This method will connect with the backend
   *
   * @param userName email address of the user
   * @param passWord password to connect with backend
   */
  public login(userName, passWord) {
    const container = {
      username: userName,
      password: passWord
    };

    return this.http.post(`${this.backendURL}`, JSON.stringify(container));
  }

  /**
   * This method will fetch all folders on the root level
   */
  public fetchFolders() {
    return this.http.get(`${this.backendURL}/all`);
  }

  public navigateToFolder(folderName: string) {
    const container = {
      foldername: folderName
    }
    return this.http.post(`${this.backendURL}/navigate`, JSON.stringify(container));
  }

}
