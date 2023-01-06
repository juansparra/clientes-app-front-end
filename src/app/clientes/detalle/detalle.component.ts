import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
 titulo: string = "Detalle del cliente";
  progreso: number = 0; 
  fotoSeleccionada: File;
  constructor(
    private clienteService: ClienteService,
    public modalService: ModalService
    ) {}

  ngOnInit(): void {
  
  }
  seleccionarFoto(event){
  this.fotoSeleccionada = event.target.files[0];
  this.progreso = 0;
  console.log(this.fotoSeleccionada);
  if(this.fotoSeleccionada.type.indexOf('image') < 0){
    Swal.fire('Error: seleccionar imagen', 'El archivo debe ser de tipo imagen','error');
    this.fotoSeleccionada = null
  }
  }
  subirFoto(){
if(!this.fotoSeleccionada){
  Swal.fire('Error: Upload', 'Debe seleccinar una foto','error')}
  else{
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
    .subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100)
      } else if(event.type === HttpEventType.Response){
        let response: any = event.body;
        this.cliente = response.cliente as Cliente;
      }

      //this.cliente = cliente;
      Swal.fire('La foto se ha subido correctamente!',`La foto se ha subido con exito: ${this.cliente.foto}`, 'success');
    });
  }
}

cerrarModal(){
  this.modalService.cerrarModal();
  this.fotoSeleccionada = null;
  this.progreso = 0;
}
}
