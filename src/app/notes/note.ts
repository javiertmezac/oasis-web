export interface INote {
  noteId: number,
  note: string,
  orderId: number,
  clientName: string,
  employeeName: string,
  registration: Date,
  liters: number,
  credit: boolean,
  total: number,
  debt: number
}