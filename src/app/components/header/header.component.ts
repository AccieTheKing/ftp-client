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

    const username = form.username;
    const password = form.password;
    this.connection.login(username, password).subscribe((data: []) => {
      // @ts-ignore
      if (data.folders) {
        this.connection.menuFolders = [];
        // @ts-ignore
        this.connection.menuFolders = data.folders;
        this.connection.initState = true;
      } else {
        console.log('error');
      }
    });
  }
}
