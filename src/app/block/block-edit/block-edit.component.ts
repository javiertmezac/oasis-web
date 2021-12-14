import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/employees/employee';
import { EmployeeService } from 'src/app/employees/employee.service';
import { Block } from './block';
import { BlockService } from './block.service';

@Component({
  templateUrl: './block-edit.component.html',
  styleUrls: ['./block-edit.component.css']
})
export class BlockEditComponent implements OnInit {

  pageTitle = 'Asignar Bloque';
  errorMessage = '';
  blockForm!: FormGroup;
  employee!: Employee;
  block!: Block

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private blockService: BlockService,
    private employeeService: EmployeeService) {

    const employeeId = Number(this.route.snapshot.paramMap.get('idEmpleado'))
    this.getEmployee(employeeId);

    const blockId = Number(this.route.snapshot.paramMap.get('idBloque'))
    this.getBlock(blockId);

  }

  ngOnInit(): void {
    this.blockForm = this.fb.group({
      letter: ['', [Validators.required, Validators.maxLength(10)]],
      startNumber: ['', Validators.required],
      endNumber: ['', Validators.required],
      blockNextNumber: ''
    });
  }

  saveBlock(): void {
    if (this.blockForm.valid) {
      if (this.blockForm.dirty) {

        const b = { ...this.block, ...this.blockForm.value }
        b.employeeId = this.employee.employeeId;

        if (b.blockId == 0) {

          this.blockService.insertBlock(b).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });

        } else {
          // update
          b.nextBlockNumber = b.blockNextNumber;
          this.blockService.updateBlock(b).subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
        }

      } else {
        this.onSaveComplete();
      }

    } else {
      this.errorMessage = "Corregir Errores de Validación";
    }
  }

  getEmployee(employeeId: number) {
    this.employeeService.getEmployee(employeeId).subscribe({
      next: response => this.employee = response,
      error: err => this.errorMessage = err
    });
  }

  getBlock(blockId: number) {
    this.blockService.getBlock(blockId).subscribe({
      next: response => this.displaBlock(response),
      error: err => this.errorMessage = err
    });
  }

  displaBlock(block: Block) {
    if(this.blockForm) {
      this.blockForm.reset();
    }

    this.block = block;

    if (this.block.blockId != 0) {
      this.pageTitle = "Editar Bloque"
    }

    this.blockForm.patchValue({
      letter: this.block.letter,
      startNumber: this.block.startNumber,
      endNumber: this.block.endNumber,
      blockNextNumber: this.block.nextBlockNumber != '' ? this.block.nextBlockNumber : ''
    });

  }

  onSaveComplete():void {
    this.blockForm.reset();
    this.router.navigateByUrl('/empleados');
  }

  deleteEmployeeBlock(): void {
    if (this.block.blockId == 0) {
      this.errorMessage = "No hay bloque a eliminar";
    }

    if(confirm(`Seguro de proceder con el borrado del Bloque?`)) {
      this.blockService.deleteBlock(this.block.blockId).subscribe({
        next: () => this.onSaveComplete(),
        error: err => this.errorMessage = err
      });
    }
  }

}
