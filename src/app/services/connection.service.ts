import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentFile } from '../models/document-file';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private backendURL = 'https://ftp-client-accie.herokuapp.com'; // url to contact the backend
  private store = {}; // cache username and password for later use
  public menuFolders: DocumentFile[] = []; // folders displayed in the sidebar
  public folder: DocumentFile[] = []; // holds names of the folders given by server
  public selectedFolderTitle = 'Welcome'; // the name of the folder that has been selected
  public route: [] = []; // folder navigation path

  constructor(private http: HttpClient) {
  }

  /**
   * This method will connect with the backend
   *
   * @param username email address of the user
   * @param password password to connect with backend
   */
  public login(hostUrl, username, password) {
    this.store = { host: hostUrl, username, password };
    return this.http.post(`${this.backendURL}/navigate`, this.store);
  }

  /**
   * This method will fetch all folders on the root level
   */
  public fetchFolders() {
    return this.http.get(`${this.backendURL}/navigate/all`);
  }

  /**
   * This method will upload a given file to the server, this method is only available for me
   *
   * @param fileFrontend file that is going to be uploaded
   * @param pathFrontend the path to the folder where the file is going to be uploaded to
   */
  public uploadFile(fileFrontend: File, pathFrontend: string) {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileFrontend);
    return this.http.post(`${this.backendURL}/upload`, formData);
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
      hosturl: this.store.hosturl,
      // @ts-ignore
      username: this.store.username,
      // @ts-ignore
      password: this.store.password
    };

    if (folderName) { // check if name of folder is not empty
      this.selectedFolderTitle = folderName;
    } else {
      this.selectedFolderTitle = 'Welcome';
    }

    return this.http.post(`${this.backendURL}/navigate/to`, container);
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
  public createDocumentFile(foldersArray: [], isMyImgFolder) {
    if (foldersArray.length > 0) { // check if not empty
      this.folder = []; // clear array
      this.menuFolders = [];
      foldersArray.map(e => {
        // @ts-ignore
        if (e.type === '-') {
          // console.log('file', e);
          // @ts-ignore
          const name = `${e.name}`.split('.'); // split string to get name and extension
          const file = new DocumentFile(name[0], name[name.length - 1], isMyImgFolder);
          // console.log(file);
          this.folder.push(file);
        } else { // get folders instead of files, will be shown in the sidebar
          // @ts-ignore
          this.menuFolders.push(e.name);
        }
      });
    }
  }

}
