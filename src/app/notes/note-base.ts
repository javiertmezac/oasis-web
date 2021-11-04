export interface INoteBase {
  noteId: number;
  note: string;
  orderId: number;
  employeeId: number;
  registration: Date;
  liters: number;
  credit: boolean;
  total: number;
  initialData: number;
  finalData: number;
  arrival: string;
  load: string;
  departure: string;
  price: number;
  status: boolean;
  discount: number;
  discountDescription: string;
  paid: boolean;
}