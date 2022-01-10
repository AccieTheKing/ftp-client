import { Component, OnInit } from "@angular/core";
import { ConnectionService } from "../../../services/connection.service";

@Component({
  selector: "app-menubar",
  templateUrl: "./menubar.component.html",
  styleUrls: ["./menubar.component.scss"],
})
export class MenubarComponent implements OnInit {
  public conn;

  constructor(private connection: ConnectionService) {
    this.conn = connection;
  }

  ngOnInit() {}

  /**
   * This method will use the folders on the root level and use them to navigate quickly through
   * the application
   *
   * @param folderName name of folder in the sidebar
   */
  public navigate(folderName) {
    this.conn.isLoading = true;
    this.conn
      .navigateToFolder(this.connection.createFolderUrl(folderName))
      .subscribe((data: []) => {
        // console.log('testttt', data);
        // @ts-ignore
        if (
          `/${this.conn.route[0]}/${this.conn.route[1]}` ===
          "/subdomains/images"
        ) {
          // @ts-ignore
          this.conn.createDocumentFile(data.folders, true);
          this.conn.isLoading = false;
        } else {
          // @ts-ignore
          this.conn.createDocumentFile(data.folders, false);
          this.conn.isLoading = false;
        }
      });
  }
}
