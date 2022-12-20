import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //get access to  okta state. returns boolean 
  isAuth: boolean = false;

  constructor(private employeeService: EmployeeService,
    public dialog: MatDialog,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaAuth.authStateManager.subscribe((authState) => {
      //return state if found or return false if not found 
      this.isAuth = authState.isAuthenticated || false;
    });
  }
 
  async ngOnInit() {
    this.isAuth = await this.oktaAuth.isAuthenticated()
  }
  logout() {
    this.oktaAuth.signOut();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`add dialog result: ${result}`);
      //i think here based on the result we do the API call here 

    })
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

