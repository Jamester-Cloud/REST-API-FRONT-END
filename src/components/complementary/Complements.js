import Swal from 'sweetalert2';


export default function Complements(M) {
    const Toasted = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        html:
          '<img src="img/nyan-cat.gif" width="70" height="50">',
      })
      Toasted.fire(M);
}
