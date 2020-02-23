import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public conn;

  constructor(private connection: ConnectionService) {
    this.conn = connection;
  }

  ngOnInit() {
  }

  public fileChange(event) {
    this.conn.uploadFile(event.target.files[0], this.conn.selectedFolderTitle).subscribe(data => {
      // @ts-ignore
      this.conn.createDocumentFile(data.folders, true);
    });
  }

  public styling(e) {
    console.log(e);
  }
}
