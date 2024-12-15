import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../../modelo/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
    //private baseURL="http://localhost:8080/api/v1/empleados";
    //private baseURL="http://api-mant-empleado-aws.us-east-1.elasticbeanstalk.com/api/empleados";
    // http://localhost:8989/api/empleados

    constructor(private http : HttpClient ) { }

    // este metodo nos sirve para obtener los empleados
      obtenerListaDeEmpleados() : Observable<Empleado[]>{
          return this.http.get<Empleado[]>(`${baserUrl}/api/empleados`);
    }

    // este metodo nos sirve para registrar un empleado
  registrarEmpleado(empleado:Empleado):Observable<Object>{
    return this.http.post(`${baserUrl}/api/empleados`,empleado);
  }
  // este metodo sirve para actualizar el empleado

  actualizarEmpleado(id:number,empleado:Empleado):Observable<Object>{
    return this.http.put(`${baserUrl}/api/empleados/${id}`,empleado);
  }

  // este metodo sirve para obtener o buscar un Em´pleado
  obtenerEmpleadoPorId(id:number):Observable<Empleado>{
    return this.http.get<Empleado>(`${baserUrl}/api/empleados/${id}`);
  }

  eliminarEmpleado(id:number): Observable<Object>{
    return this.http.delete(`${baserUrl}/api/empleados/${id}`);
  }

}
