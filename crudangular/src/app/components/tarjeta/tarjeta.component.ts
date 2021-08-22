import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup , Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  
  listTarjetas : any[]=[
    /*{titulo: "Pedrito", numerotarjeta: "123456789012", fechaExpiracion: "21/12/2021", cvv: "123"},
    {titulo: "Pedron", numerotarjeta: "123456789012", fechaExpiracion: "21/12/2022", cvv: "122"},
    {titulo: "Pedrin", numerotarjeta: "123456789012", fechaExpiracion: "21/12/2023", cvv: "121"}*/
  ];

  accion ='Agregar';

  form: FormGroup;

  id: number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService : TarjetaService) {
    this.form = this.fb.group({
      titulo: ['',Validators.required],
      numeroTarjeta: ['',[Validators.required,Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['',[Validators.required,Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
   }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.getListTarjetas().subscribe( data =>{
        //console.log(data);
        this.listTarjetas = data;
    },error => {
      console.log(error);
    })
  }

  guardarTarjeta(){
    //console.log(this.form);
    const tarjeta: any = {
      titulo: this.form.get('titulo')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }
    //this.listTarjetas.push(tarjeta)
    if(this.id == undefined){
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data => {
        this.toastr.success('La tarjeta fue registrado con exito', 'Tarjeta Registrada');
        this.obtenerTarjetas();
        this.form.reset()
      }, error => {
        this.toastr.error('Opss... ocurrio un error', 'Error');
        console.log(error);
      })
    }else{
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id,tarjeta).subscribe(data =>{
        this.form.reset();
        this.accion='Agregar';
        this.id=undefined;
        this.toastr.info('La tarjeta fue actualizada correctamente','tarjeta Actualizada')
        this.obtenerTarjetas();

      },error => {
        console.log(error);
      });
    }
  }

  eliminarTarjeta(id: number){
    this._tarjetaService.deleteTarjeta(id).subscribe(data => {
      this.toastr.error('La tarjeta fue eliminada con exito','Tarjeta Eliminada');
      this.obtenerTarjetas();
    }, error =>{
      console.log(error);
    })
    //console.log(index);
    //this.listTarjetas.splice(index,1); //el 1 es para eliminar solo un elemento
    
  }

  editarTarjeta(tarjeta :any){
    this.accion = 'Editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titulo: tarjeta.titulo,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    })
  }
}
