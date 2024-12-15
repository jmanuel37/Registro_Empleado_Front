import { Component, OnInit ,ViewChild} from '@angular/core';
import { Empleado } from '../../modelo/empleado';
import { EmpleadoService } from '../../services/empleado/empleado.service';
import { Route, Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from './../../services/login.service';
//import Swal from 'sweetalert2/dist/sweetalert2.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrl: './lista-empleados.component.css'
 // imports: [MatTableModule],
})




export class ListaEmpleadosComponent implements OnInit {
empleados:Empleado[];
showAdminEmp = false;
adminEmp:String;
//constructor(private empleadoServicio:EmpleadoService,private router:Router,private matPaginator:MatPaginator,private matSort:MatSort ) { }
constructor(public login:LoginService,private empleadoServicio:EmpleadoService,private router:Router ) { }

displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email','Mantenimiento'];
dataSource: MatTableDataSource<Empleado>;

@ViewChild(MatPaginator) paginator!: MatPaginator;




ngOnInit(): void {
  /*
  this.empleados=[{
    "id":1,
    "nombre":"manuel",
    "apellido":"campo",
    "email":"mcampos@gmail.com"
  },
  {
    "id":2,
    "nombre":"maria",
    "apellido":"vale",
    "email":"mvalle@gmail.com"
  }
];*/


this.obtenerEmpleados();

 //this.admin=this.login.getUserRole();
 this.adminEmp=this.login.getUserRole();
    //console.log('user-empl',this.adminEmp);
    if(this.adminEmp=='ADMIN'){
      this.showAdminEmp = true;
    }
    console.log('user-empl2',this.login.getUserRole());


}

private obtenerEmpleados(){
   this.empleadoServicio.obtenerListaDeEmpleados().subscribe(dato =>{
     this.empleados=dato;
     this.dataSource = new MatTableDataSource(this.empleados);
     this.dataSource.paginator = this.paginator;
   });
   //obtenerListaDeEmpleados
   //this.empleadoServicio.obtenerListaDeEmpleados().subscribe((dato: any) =>{
   //  this.empleados=dato;
   //});
 }

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

// mantenimiento
actualizarEmpleado(id:number){
  this.router.navigate(['actualizar-empleado',id]);

}

eliminarEmpleado1(id:number){
  this.empleadoServicio.eliminarEmpleado(id).subscribe((dato: any) =>{
    console.log(dato);
    this.obtenerEmpleados();

  });

}

verDetallesDelEmpleado(id:number){
  this.router.navigate(['empleado-detalles',id]);

}


eliminarEmpleado(id:number){
  Swal.fire({
    title: '¿Estas seguro?',
    text: "Confirma si deseas eliminar al empleado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si , elimínalo',
    cancelButtonText: 'No, cancelar',
    //confirmButtonClass: 'btn btn-success',
    //cancelButtonClass: 'btn btn-danger',
    buttonsStyling: true
  }).then((result) => {
    if(result.value){
      this.empleadoServicio.eliminarEmpleado(id).subscribe(dato => {
        console.log(dato);
        this.obtenerEmpleados();
        Swal.fire(
          'Empleado eliminado',
          'El empleado ha sido eliminado con exito',
          'success'
        )
      })
    }
  })
}

/*
confirmBox(){
  Swal.fire({
    title: 'Are you sure want to remove?',
    text: 'You will not be able to recover this file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si , elimínalo',
    cancelButtonText: 'No, cancelar',
    //confirmButtonClass: 'btn btn-success',
    //cancelButtonClass: 'btn btn-danger',
    buttonsStyling: true
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
}
*/





}
