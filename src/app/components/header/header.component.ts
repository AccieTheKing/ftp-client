import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ConnectionService} from 'src/app/services/connection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private connection: ConnectionService) {
  }

  ngOnInit() {
  }

  /**
   * This method will be fired when submitting the form
   *
   * @param connectForm The contact form
   */
  public onSubmit(connectForm: NgForm) {
    const form = connectForm.form.value;

    const hosturl = form.host;
    const username = form.username;
    const password = form.password;
    this.connection.login(hosturl, username, password).subscribe((data: []) => {
      console.log(data);
      // @ts-ignore
      if (data.folders) {
        // @ts-ignore
        this.connection.createDocumentFile(data.folders);
      } else {
        console.log('error');
      }
    });
  }
}
