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
  awsSnsEndpoint = 'https://smon7aby8a.execute-api.eu-west-1.amazonaws.com/dev/report/create';
  showReportMessageValidationErrorMessage = false;
  showReportForm = true;
  showSuccessMessage = false;
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
      'message': this.reportMessage.value + ' - Please do not respond to this text.'
    };

    this.http.post(this.awsSnsEndpoint, body, this.httpOptions).subscribe();
  }

  submitReport() {
    if (!this.formIsValid()) {
      this.showReportMessageValidationErrorMessage = true;
      return false;
    }

    this.showReportMessageValidationErrorMessage = false;
    this.showReportForm = false;
    this.showSuccessMessage = true;
    this.sendToSns();

    return true;
  }

  private formIsValid() {
    if (this.reportMessage.value) {
      return true;
    }

    return false;
  }
}
