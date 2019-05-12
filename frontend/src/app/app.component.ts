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
  formInvalid = false;
  showReportForm = true;
  showSuccessMessage = false;
  reportMessage = new FormControl('');
  showReportMessageValidationErrorMessage = false;
  pin = new FormControl('');
  correctPinCode = '2485';
  showPinValidationErrorMessage = false;
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
      return false;
    }

    this.showReportForm = false;
    this.showSuccessMessage = true;
    this.sendToSns();

    return true;
  }

  private formIsValid() {
    if (!this.reportMessage.value) {
      this.showReportMessageValidationErrorMessage = true;
      this.formInvalid = false;
    } else {
      this.showReportMessageValidationErrorMessage = false;
      this.formInvalid = true;
    }

    if (this.pin.value !== this.correctPinCode) {
      this.showPinValidationErrorMessage = true;
      this.formInvalid = false;
    } else {
      this.showPinValidationErrorMessage = false;
      this.formInvalid = true;
    }

    return this.formInvalid;
  }
}
