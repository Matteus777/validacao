import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  success(title: string, msg: string, confirm: string) {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: msg,
      heightAuto: false,
      showConfirmButton: true,
      confirmButtonText: confirm,
    });
  }

  error(title: string, msg: string, confirm: string) {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: msg,
      heightAuto: false,
      showConfirmButton: true,
      confirmButtonText: confirm,
    });
  }

  warning(title: string, msg: string, confirm: string) {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: msg,
      heightAuto: false,
      showConfirmButton: true,
      confirmButtonText: confirm,
    });
  }
}
