import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) { }

  showSuccess(message: string | undefined, title: string | undefined){
      this.toastr.success(message, title,{
        timeOut: 2000,
        progressBar: true,
        closeButton: true,
        tapToDismiss: true,
        easeTime: 300,
        positionClass: 'toast-top-center'})
  }

  showError(message: string | undefined, title: string | undefined){
      this.toastr.error(message, title)
  }

  showInfo(message: string | undefined, title: string | undefined){
      this.toastr.info(message, title,{
        timeOut: 2000,
        progressBar: false,
        closeButton: false,
        tapToDismiss: true,
        easeTime: 300,
        positionClass: 'toast-top-center'})
  }

  showWarning(message: string | undefined, title: string | undefined){
      this.toastr.warning(message, title,{
        timeOut: 10000,
        progressBar: true,
        closeButton: true,
        tapToDismiss: true,
        easeTime: 300,
        positionClass: 'toast-top-center'})
  }
}
