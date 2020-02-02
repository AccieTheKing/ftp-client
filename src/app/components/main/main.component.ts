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

  ngOnInit() {}

  public navigate(folderName: string) {
    this.connection.navigateToFolder(folderName).subscribe(data => {
      console.log(data);
    });
  }
}
