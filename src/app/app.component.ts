import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from './model/employee';
import { EmployeeService } from './service/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators, FormGroupDirective, FormGroup, NgForm } from '@angular/forms';


export interface DeleteDialogData {
  id: number,
  name: string
}

export interface AddData {
  id: number,

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

  openEditDialog(emp: Employee) {
    const dialogRef = this.dialog.open(EditDialog, {
      data: { name: emp.name, id: emp.id, email: emp.email, jobTitle: emp.jobTitle, phone: emp.phone, imageUrl: emp.imageUrl }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`edit dialog result: ${result}`);
      //i think here based on the result we do the API call here 
      //if false || undefined, do nothing 
      //if true, return api call
    })
  }


  openAddDialog() {
    const dialogRef = this.dialog.open(AddDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`add dialog result: ${result}`);
      //i think here based on the result we do the API call here 

    })
  }

  ngOnInit() {
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
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private employeeService: EmployeeService,
  ) { this.emp = new Employee(0, "", "", "", "", "", "",); }

  name = new FormControl('');
  jobTitle = new FormControl('')
  phone = new FormControl('')
  imageUrl = new FormControl('')

  
  onNoClick(): void {
    this.dialogRef.close();
  }


  
  onSubmit() {


    this.emp.name = this.name.value || "";
    this.emp.email = this.email.value || '';
    this.emp.phone = this.phone.value || '';
    this.emp.jobTitle = this.jobTitle.value || '';
    this.emp.imageUrl = this.imageUrl.value || '';




    //formed emp, now send it :3 

    this.employeeService.addEmployee(this.emp).subscribe(
      (response: Employee) => {
        console.log(response);
        location.reload();
      }
    )
  }
}

@Component({
  selector: 'add-dialog',
  templateUrl: 'add-dialog.html',
})
export class AddDialog {

  public emp: Employee;
  constructor(
    public dialogRef: MatDialogRef<AddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService,

  ) {
    this.emp = new Employee(0, "", "", "", "", "", "",);


  }


  name = new FormControl('');
  jobTitle = new FormControl('')
  email = new FormControl('')
  phone = new FormControl('')
  imageUrl = new FormControl('')




  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {


    this.emp.name = this.name.value || "";
    this.emp.email = this.email.value || '';
    this.emp.phone = this.phone.value || '';
    this.emp.jobTitle = this.jobTitle.value || '';
    this.emp.imageUrl = this.imageUrl.value || '';




    //formed emp, now send it :3 

    this.employeeService.addEmployee(this.emp).subscribe(
      (response: Employee) => {
        console.log(response);
        location.reload();
      }
    )
  }

}

