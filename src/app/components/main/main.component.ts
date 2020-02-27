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
    const formData = new FormData(); // form 
    const file: File = event.target.files[0]; // data
    formData.append('file', file);
    this.connection.uploadFile(formData, this.connection.selectedFolderTitle).subscribe(data => {
      console.log(data);
      // @ts-ignore
      this.connection.createDocumentFile(data.folders, true);
    });
  }

  public styling(e) {
    console.log(e);
  }
}
