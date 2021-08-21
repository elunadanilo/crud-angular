import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup } from '@angular/forms';

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


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      titulo: [''],
      numeroTarjeta: [''],
      fechaExpiracion: [''],
      cvv: ['']
    })
   }

  ngOnInit(): void {
  }

  agregarTarjeta(){
    console.log(this.form);
  }
}
