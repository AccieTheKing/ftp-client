import {Component, OnInit} from '@angular/core';
import {ConnectionService} from 'src/app/services/connection.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public folders: [] = [];

  constructor(private connection: ConnectionService) {
  }

  ngOnInit() {
  }

  public navigate(folderName: string) {
    this.connection.navigateToFolder(folderName).subscribe((data: []) => {
      this.connection.folder = [];
      this.connection.folder = data.folders;
      console.log(data);
    });
  }
}
