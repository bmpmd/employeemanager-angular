import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './model/employee';
import { EmployeeService } from './service/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanager-angular';


  //place to hold employees list all the time 
  public employees: Employee[] | undefined;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(){
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      //if we get a response (a list of emps), 
      //we set the val above 
      (response: Employee[]) => {
        this.employees = response;
        //console.log(this.employees)
      },
      //otherwise if we get an error we send an err 
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

}
