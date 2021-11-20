import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employees/employee';
import { EmployeeService } from '../employees/employee.service';
import { Block } from './block-edit/block';
import { BlockService } from './block-edit/block.service';

@Component({
  templateUrl: './nextblock-delete.component.html',
  styleUrls: ['./nextblock-delete.component.css']
})
export class NextblockDeleteComponent implements OnInit {

  blockForm!: FormGroup
  errorMessage = ''
  block!: Block;
  employee!: Employee;
  pageTitle = "Eliminar Bloque Secuencia"

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private blockService: BlockService) { }

  ngOnInit(): void {
    this.blockForm = this.fb.group({
      deleteBlockNumberDesc: ['', Validators.required]
    });

    const id = Number(this.route.snapshot.paramMap.get('idBloque'))
    this.getBlock(id);

    const employeeId = Number(this.route.snapshot.paramMap.get('idEmpleado'))
    this.getEmployee(employeeId)
  }

  getEmployee(id: number): void {
    this.employeeService.getEmployee(id).subscribe({
      next: response => this.employee = response,
      error: err => this.errorMessage = err
    })

  }

  getBlock(id: number): void {
    this.blockService.getBlock(id).subscribe({
      next: response => this.block = response,
      error: err => this.errorMessage = err
    });
  }

  saveBlock(): void {
    if(this.blockForm.valid) {

      const description = this.blockForm.get('deleteBlockNumberDesc')?.value;
      this.employeeService.deleteEmployeeCurrentBlockNumber(this.employee.employeeId,
        this.block.blockId, this.block.nextBlockNumber,description).subscribe({
          next: () =>  this.router.navigateByUrl('/empleados'),
          error: err => this.errorMessage = err
        });
    }
  }

}
