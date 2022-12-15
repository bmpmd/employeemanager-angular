import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from './model/employee';
import { EmployeeService } from './service/employee.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface DeleteDialogData{
  id: number, 
  name: string
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  title = 'employeemanager-angular';


  //place to hold employees list all the time 
  public employees: Employee[] | undefined;
  constructor(private employeeService: EmployeeService, public dialog: MatDialog) { }

  openDeleteDialog(empid: number, empname: string){
    const dialogRef = this.dialog.open(DeleteDialog,{
      data: {id:empid, name: empname}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`delete dialog result: ${result}`);
    })
  }
  
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

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
  ){}

  onNoClick():void{
    this.dialogRef.close();
  }
}

