import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './shared/auth.guard';
import { AuthInterceptor } from './shared/auth.interceptor';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ContactEditComponent } from './contacts/contact-edit.component';
import { AuthService } from './login/auth.service';

@NgModule({
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'inicio', canActivate:[AuthGuard], component: HomeComponent },
      { path: 'empresas', canActivate:[AuthGuard], component: ClientComponent },
      { path: 'empresas/:id', canActivate: [AuthGuard], component: ClientDetailComponent },
      { path: 'contactos', canActivate: [AuthGuard], component: ContactsComponent },
      { path: 'contactos/:id', canActivate:[AuthGuard], component: ContactDetailComponent },
      {
        path: 'contactos/:id/editar',
        canActivate: [AuthGuard],
        component: ContactEditComponent
      },
      { path: 'pedidos', canActivate: [AuthGuard], component: OrdersComponent },
      { path: 'pedidos/:id', canActivate: [AuthGuard], component: OrderDetailComponent },
      { path: 'notas', canActivate: [AuthGuard], component: NotesComponent },
      { path: 'precios', canActivate:[AuthGuard], component: PricesComponent },
      { path: 'precios/:id', canActivate: [AuthGuard], component: PriceDetailComponent },
      { path: 'empleados', canActivate:[AuthGuard], component: EmployeesComponent },
      { path: 'empleados/:id', canActivate:[AuthGuard], component: EmployeeDetailComponent },
      { path: 'login', component: LoginComponent },
      { path:'', redirectTo: 'inicio', pathMatch:'full' },
      { path: '**', redirectTo: 'inicio', pathMatch:'full'}
    ])
  ],
  declarations: [
    AppComponent,
    ClientComponent,
    HomeComponent,
    ContactsComponent,
    ContactDetailComponent,
    ContactEditComponent,
    OrdersComponent,
    NotesComponent,
    EmployeesComponent,
    PricesComponent,
    ClientDetailComponent,
    EmployeeDetailComponent,
    NoteDetailComponent,
    OrderDetailComponent,
    PriceDetailComponent,
    LoginComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
