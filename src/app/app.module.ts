import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ClientComponent } from './clients/client.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { OrdersComponent } from './orders/orders.component';
import { NotesComponent } from './notes/notes.component';
import { EmployeesComponent } from './employees/employees.component';
import { PricesComponent } from './prices/prices.component';
import { ClientDetailComponent } from './clients/client-detail.component';
import { ContactDetailComponent } from './contacts/contact-detail.component';
import { EmployeeDetailComponent } from './employees/employee-detail.component';
import { NoteDetailComponent } from './notes/note-detail.component';
import { OrderDetailComponent } from './orders/order-detail.component';
import { PriceDetailComponent } from './prices/price-detail.component'

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    HomeComponent,
    ContactsComponent,
    OrdersComponent,
    NotesComponent,
    EmployeesComponent,
    PricesComponent,
    ClientDetailComponent,
    EmployeeDetailComponent,
    NoteDetailComponent,
    OrderDetailComponent,
    PriceDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'inicio', component: HomeComponent },
      { path: 'empresas', component: ClientComponent },
      { path: 'empresas/:id', component: ClientDetailComponent },
      { path: 'contactos', component: ContactsComponent },
      { path: 'contactos/:id', component: ContactDetailComponent },
      { path: 'pedidos', component: OrdersComponent },
      { path: 'pedidos/:id', component: OrderDetailComponent },
      { path: 'notas', component: NotesComponent },
      { path: 'precios', component: PricesComponent },
      { path: 'precios/:id', component: PriceDetailComponent },
      { path: 'empleados', component: EmployeesComponent },
      { path: 'empleados/:id', component: EmployeeDetailComponent },
      { path:'', redirectTo: 'inicio', pathMatch:'full' },
      { path: '**', redirectTo: 'inicio', pathMatch:'full'}
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
