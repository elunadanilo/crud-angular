import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
