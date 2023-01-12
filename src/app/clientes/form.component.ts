import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router,ActivatedRoute } from '@angular/router';
import  swal  from 'sweetalert2';
import { Observable } from 'rxjs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Region } from './region';

@Component({
   selector: 'app-form',
  templateUrl:'./form.component.html'

                                        
 })
export class FormComponent implements OnInit {
     cliente: Cliente = new Cliente()
     regiones: Region[];
     titulo: string = "Crear Cliente"
  constructor(private clienteService: ClienteService,
   private router: Router, private activatedRoute: ActivatedRoute 
   ){}
   ngOnInit(){
      this.cargarCliente();
     this.clienteService.getRegiones().subscribe(regiones => {this.regiones = regiones}) 
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
   console.log(this.cliente);
   this.clienteService.update(this.cliente)
   .subscribe( json =>{
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actualizado',` ${json.mensaje} ${json.cliente.nombre} actualizado con exito`,'success')
   })
}
// indicando el tipo de dato desde cliente service ts con un map
create(): void {
   console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      cliente => {this.router.navigate(['/clientes'])
   swal.fire('Nuevo cliente',`cliente ${cliente.nombre} creado con exito!`,'success')   
   }
      )
}


compararRegion (o1:Region,o2:Region): boolean{
   if(o1 === undefined && o2 === undefined){
      return true;
   }
   return o1 == null || o2 == null? false: o1.id === o2.id;  
}



}