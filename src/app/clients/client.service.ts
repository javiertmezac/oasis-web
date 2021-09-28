import { Injectable } from "@angular/core";
import { IClient } from "./client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  getClients(): IClient[] {
    return [
      {
        clientId: 2,
        clientCodigo: "codigo_1",
        clientFactura: "factura_1",
        clientRfc: "RFC",
        clientTelefono: "664 123 5689",
        clientColonia: "colonia_1",
        clientCalle: "calle_1",
        clientNoInt: "interior_1",
        clientNoExt: "exterior_1",
        clientCodigoPostal: "codigo postal _1",
        clientRegistro: "registro_1",
        clientPrecio: "2.3"
      },
      {
        clientId: 3,
        clientCodigo: "cliente 3",
        clientFactura: "factura_1",
        clientRfc: "RFC",
        clientTelefono: "664 123 5689",
        clientColonia: "colonia_1",
        clientCalle: "calle_1",
        clientNoInt: "interior_1",
        clientNoExt: "exterior_1",
        clientCodigoPostal: "codigo postal _1",
        clientRegistro: "registro del cliente 3",
        clientPrecio: "2.3"
      }
    ]

  }
}