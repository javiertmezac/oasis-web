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
import { PricesComponent } from './prices/prices.component'

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    HomeComponent,
    ContactsComponent,
    OrdersComponent,
    NotesComponent,
    EmployeesComponent,
    PricesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'inicio', component: HomeComponent },
      { path: 'empresas', component: ClientComponent },
      { path: 'contactos', component: ContactsComponent },
      { path: 'pedidos', component: OrdersComponent },
      { path: 'notas', component: NotesComponent },
      { path: 'precios', component: PricesComponent },
      { path: 'empleados', component: EmployeesComponent },
      { path:'', redirectTo: 'inicio', pathMatch:'full' },
      { path: '**', redirectTo: 'inicio', pathMatch:'full'}
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
