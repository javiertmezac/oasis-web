import { Price } from "../prices/price";

export interface IClient {
clientId: number,
clientCode: string,
clientInvoice: string,
clientName: string,
clientRfc: string,
clientTel: string,
clientNeighborhood: string,
clientStreet: string,
clientNoInt: string,
clientNoOut: string,
clientCp: string,
clientStatus: boolean,
clientRegistration: Date,
clientInstantRegistration: number,
clientPrice: number,
selectedPrice: Price,
clientPriceId: number,
clientNextClean: Date,
clientInstantNextClean: number,
nextCleaningComments: string
}
