import {Component, OnInit} from '@angular/core';
import {ConnectionService} from 'src/app/services/connection.service';
import {DocumentFile} from '../../models/document-file';

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
   * @param folderName
   */
  public navigate(folderName: string) {
    this.connection.navigateToFolder(this.connection.createFolderUrl(folderName)).subscribe((data: []) => {
      this.connection.createDocumentFile(data.folders);
      this.connection.initState = {beginstate: false, browsestate: true};
    });
  }
}
