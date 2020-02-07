import {Component, OnInit} from '@angular/core';
import {ConnectionService} from 'src/app/services/connection.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private connection: ConnectionService) {
  }

  ngOnInit() {
  }

  /**
   *
   * @param folderName name of the folder that the user wants to navigate to
   */
  public navigate(folderName: string) {
    this.connection.navigateToFolder(this.connection.createFolderUrl(folderName)).subscribe((data: []) => {
      // @ts-ignore
      this.connection.createDocumentFile(data.folders);
    });
  }
}
