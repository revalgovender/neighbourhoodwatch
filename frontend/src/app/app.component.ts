import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'neighbourhood-watch';
  awsSnsEndpoint = 'https://6gz8r9jr2j.execute-api.eu-west-1.amazonaws.com/dev/report/create';
  reportMessage = new FormControl('');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(
    private http: HttpClient
  ) {
  }

  sendToSns() {
    let body = {
      'message': this.reportMessage.value
    };

    this.http.post(this.awsSnsEndpoint, body, this.httpOptions).subscribe();
  }

  submitReport() {
    this.sendToSns();
  }
}
