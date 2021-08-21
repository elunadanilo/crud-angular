import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup , Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  
  listTarjetas : any[]=[
    {titulo: "Juan Perez", numerotarjeta: "123456789012", fechaExpiracion: "21/12/2021", cvv: "123"},
    {titulo: "Luis Perez", numerotarjeta: "123456789012", fechaExpiracion: "21/12/2022", cvv: "122"},
    {titulo: "Pedro Perez", numerotarjeta: "123456789012", fechaExpiracion: "21/12/2023", cvv: "121"}
  ];

  form: FormGroup;


  constructor(private fb: FormBuilder,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      titulo: ['',Validators.required],
      numeroTarjeta: ['',[Validators.required,Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['',[Validators.required,Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['',[Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
   }

  ngOnInit(): void {
  }

  agregarTarjeta(){
    console.log(this.form);
    const tarjeta: any = {
      titulo: this.form.get('titulo')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }
    this.listTarjetas.push(tarjeta)
    this.toastr.success('La tarjeta fue registrado con exito', 'Tarjeta Registrada');
    this.form.reset()
  }

  eliminarTarjeta(index: number){
    console.log(index);
    this.listTarjetas.splice(index,1); //el 1 es para eliminar solo un elemento
    this.toastr.error('La tarjeta fue eliminada con exito','Tarjeta Eliminada');
  }
}
