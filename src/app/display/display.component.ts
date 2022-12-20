import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
export interface DeleteDialogData {
  id: number,
  name: string
}
export interface AddData {
  id: number,

}

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  //place to hold employees list all the time 
  public employees: Employee[] | undefined;
  constructor(private employeeService: EmployeeService, public dialog: MatDialog) { }


  ngOnInit() {
    this.getEmployees();
  }


  openEditDialog(emp: Employee) {
    const dialogRef = this.dialog.open(EditDialog, {
      data: { name: emp.name, id: emp.id, email: emp.email, jobTitle: emp.jobTitle, phone: emp.phone, imageUrl: emp.imageUrl, employeeCode: emp.employeeCode }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`edit dialog result: ${result}`);
      //i think here based on the result we do the API call here 
      //if false || undefined, do nothing 
      //if true, return api call
    })
  }


  openDeleteDialog(empid: number, empname: string) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: { id: empid, name: empname }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`delete dialog result: ${result}`);
      //i think here based on the result we do the API call here 

      //if result reutnrs true then we delete the emp 
      if (result) {
        console.log(`going to delete emp with id: ${empid}`)
        this.employeeService.deleteEmployee(empid).subscribe(
          (response: void) => {
            console.log(response);
            this.getEmployees();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    })
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
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.html',
})
export class EditDialog {
  public emp: Employee;

  //email = new FormControl('', [Validators.required, Validators.email]);
  email = "";


  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private employeeService: EmployeeService,
  ) { this.emp = data}


  changeName(ev: any) {
    this.emp.name = ev.target.value;
    
  }

  changeTitle(ev: any) {
    this.emp.jobTitle = ev.target.value;
    
  }

  changeEmail(ev: any) {
    this.emp.email = ev.target.value;
    
  }

  changePhone(ev: any) {
    this.emp.phone = ev.target.value;
    
  }

  changeImageUrl(ev: any) {
    this.emp.imageUrl = ev.target.value;
    
  }



  
  
  onNoClick(): void {
    this.dialogRef.close();
  }


  
  onSubmit() {

    //formed emp, now edit it :3 

    this.employeeService.updateEmployee(this.emp).subscribe(
      (response: Employee) => {
        console.log(response);
        location.reload();
      }
    )
  }
}


