import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private connection: ConnectionService) { }

  ngOnInit() { }

  /**
   * This method will be fired when submitting the form
   *
   * @param connectForm The contact form
   */
  public onSubmit(connectForm: NgForm) {
    const form = connectForm.form.value;

    const url = form.host_url;
    const username = form.username;
    const password = form.password;
    this.connection.login(username, password);
  }
}
