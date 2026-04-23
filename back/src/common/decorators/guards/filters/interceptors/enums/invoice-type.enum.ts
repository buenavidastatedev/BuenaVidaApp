export enum InvoiceType {
  QUOTE = 'QUOTE', // cotización
  DELIVERY_NOTE = 'DELIVERY_NOTE', // remito
  INVOICE = 'INVOICE', // factura (te faltaba esta)
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  ISSUED = 'ISSUED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}
