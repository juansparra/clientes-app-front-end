import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
 
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
  let page = 0;
    this.clienteService.getClientes(page).pipe(
      tap(response => {
        console.log('ClienteComponent: tap 3');
          (response.content as Cliente[]).forEach((cliente) => {
            console.log(cliente.nombre);
          });
      


      })
    ).subscribe(
      response => this.clientes = response.content as Cliente[]
    );
  }

  delete(cliente: Cliente): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'estas seguro?',
      text: ` Seguro que desea eliminar el cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter( cli => cli !== cliente)
        swalWithBootstrapButtons.fire(
          'Cliente eliminado!',
          `El cliente ${cliente.nombre} ${cliente.apellido} se elimino`,
          'success'
        )
      }
        )
      }
    })
  }

}
