import Swal from "sweetalert2";

export const successAlert = (text: string, log: string, cb: Function=()=>{})=>{
    Swal.fire({
      title: 'Sucesso',
      text: text,
      icon: 'success',
      showConfirmButton: false,
      timer: 1750,
      timerProgressBar: true,
    })
    console.log(log)
    cb()
  }

export const failureAlert = (text: string, log: string, cb:Function=()=>{})=>{
    Swal.fire({
        title: 'Oops!',
        text: text,
        icon: 'error',
        showConfirmButton: false,
        timer: 1750,
    });
    console.log(log)
    cb()
}