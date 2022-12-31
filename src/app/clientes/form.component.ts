import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router,ActivatedRoute } from '@angular/router';
import  swal  from 'sweetalert2';
import { Observable } from 'rxjs';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
   selector: 'app-form',
  templateUrl:'./form.component.html'

                                        
 })
export class FormComponent implements OnInit {
     cliente: Cliente = new Cliente()
     titulo: string = "Crear Cliente"
  constructor(private clienteService: ClienteService,
   private router: Router, private activatedRoute: ActivatedRoute 
   ){}
   ngOnInit(){
      this.cargarCliente();
}
public cargarCliente(): void{
   this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
         this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
   })
}
// primera forma para tomar el nombre o mensaje desde el back
update(): void{
   this.clienteService.update(this.cliente)
   .subscribe( json =>{
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actualizado',` ${json.mensaje} ${json.cliente.nombre} actualizado con exito`,'success')
   })
}
// indicando el tipo de dato desde cliente service ts con un map
create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {this.router.navigate(['/clientes'])
   swal.fire('Nuevo cliente',`cliente ${cliente.nombre} creado con exito!`,'success')   
   }
      )
}
}