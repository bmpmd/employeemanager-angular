//stuff that the backend is returning we catch here 
export class Employee {
    id:number;
    name:string;
    email:string;
    jobTitle:string;
    phone:string;
    imageUrl:string;
    employeeCode: string; 


    constructor(id:number,name:string,  email:string, jobTitle:string, phone:string, imageUrl:string, employeeCode: string ){
        this.id= id;
        this.name = name;
        this.email = email;
        this.jobTitle = jobTitle;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.employeeCode = employeeCode;

    }
}
