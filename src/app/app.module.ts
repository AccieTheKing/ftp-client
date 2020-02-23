import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {MainComponent} from './components/main/main.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoadingComponent} from './global/loading/loading.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MenubarComponent} from './components/sidebar/menubar/menubar.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MainComponent, LoadingComponent, SidebarComponent, MenubarComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
