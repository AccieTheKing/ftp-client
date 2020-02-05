import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private backendURL = 'http://localhost:80'; // url to contact the backend
  private store = {}; // cache username and password for later use
  public folder: [] = []; // holds names of the folders given by server
  public signedIn = false;

  constructor(private http: HttpClient) {
  }

  /**
   * This method will connect with the backend
   *
   * @param userName email address of the user
   * @param passWord password to connect with backend
   */
  public login(userName, passWord) {
    this.store = {username: userName, password: passWord};
    return this.http.post(`${this.backendURL}`, JSON.stringify(this.store));
  }

  /**
   * This method will fetch all folders on the root level
   */
  public fetchFolders() {
    return this.http.get(`${this.backendURL}/all`);
  }

  /**
   * This method will send the name of the folder that has been selected and
   * the username and password to search through folders on the server
   *
   * @param folderName the name of a folder selected by the user
   */
  public navigateToFolder(folderName: string) {
    const container = {
      foldername: folderName,
      // @ts-ignore
      username: this.store.username,
      // @ts-ignore
      password: this.store.password
    };
    return this.http.post(`${this.backendURL}/navigate`, JSON.stringify(container));
  }

}
