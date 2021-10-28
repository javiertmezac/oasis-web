import { Employee } from "../employees/employee";

export interface IOrder{
  orderId: number;
  employeeId: number;
  employeeName: string;
  clientId: number;
  clientName: string;
  registrationDate: Date;
  deliveryDate: Date, 
  delivery: number,
  registration: number,
  comments: string;
  status: boolean;
  notification: number;
  notificationDescr: string;
  priority: number;
  priorityDescr: string;
}