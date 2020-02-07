import {Component, OnInit} from '@angular/core';
import {ConnectionService} from '../../../services/connection.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  constructor(private connection: ConnectionService) {
  }

  ngOnInit() {
  }

  /**
   * This method will use the folders on the root level and use them to navigate quickly through
   * the application
   *
   * @param folderName name of folder in the sidebar
   */
  public navigate(folderName) {
    this.connection.navigateToFolder(this.connection.createFolderUrl(folderName))
      .subscribe((data: []) => {
        // @ts-ignore
        this.connection.createDocumentFile(data.folders);
      });
  }
}
