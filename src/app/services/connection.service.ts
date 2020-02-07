import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DocumentFile} from '../models/document-file';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private backendURL = 'http://localhost:80'; // url to contact the backend
  private store = {}; // cache username and password for later use
  public menuFolders: DocumentFile[] = [];
  public folder: DocumentFile[] = []; // holds names of the folders given by server
  public initState = false;
  public route: [] = []; // folder navigation path

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


  /**
   * This method will create a valid link to the folders on the server
   *
   * @param folderName name of the folder user wants to navigate to
   */
  public createFolderUrl(folderName): string {
    if (folderName === '/' && this.route.length > 0) { // return one level
      this.route.pop(); // remove the name of the folder from the link
    } else {
      // @ts-ignore
      this.route.push(folderName); // add the name of the folder to the link
    }

    this.folder = []; // empty the array which holds the files in the folder
    let url = '';
    this.route.forEach(e => {
      url += `/${e}`;
    });

    return url;
  }

  /**
   * This method will split the file and makes an DocumentFile Object which will
   * that provides a way to retrieve and get icons and names of file
   */
  public createDocumentFile(foldersArray: []) {
    if (foldersArray.length > 0) { // check if not empty
      this.folder = []; // clear array
      this.menuFolders = [];
      foldersArray.map(e => {
        // @ts-ignore
        if (!(e.includes('.') && e.charAt(0) === '.' && e.charAt(1) === '.' || e.charAt(0) === '.' && e.charAt(1) !== 'h')) {
          // @ts-ignore
          if (e.includes('.')) { // get files with extension
            // @ts-ignore
            const name = e.split('.'); // split string to get name and extension
            const file = new DocumentFile(name[0], name[name.length - 1]);
            console.log(file);
            this.folder.push(file);
          } else { // get folders instead of files
            this.menuFolders.push(e);
          }
        }
      });
    }
  }

}
