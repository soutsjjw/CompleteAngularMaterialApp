import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { EmployeeService } from '../../shared/employee.service';
import { DepartmentService } from '../../shared/department.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService,
    public departmentService: DepartmentService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>) { }

  ngOnInit(): void {
    this.service.getEmployees();
  }

  onClear() {
    this.service.form.reset();
    this.service.initalizedFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (this.service.form.get('$key').value)
        this.service.updateEmployee(this.service.form.value);
      else 
        this.service.insertEmployee(this.service.form.value);      
      this.service.form.reset();
      this.service.initalizedFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
      this.service.initalizedFormGroup();
      this.dialogRef.close();
  }

}
