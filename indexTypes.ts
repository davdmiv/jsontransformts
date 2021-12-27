// declare namespace CardListTransformTypes {
type CardListJSON = {
  id: number
  jsonrpc: string
  result: CardListResult
}

type CardListResult = {
  cards: Card[]
  cursor: object
}
type Variation = {
  id: string
  chrtId: number
  barcode: string
  barcodes: string[]
  addin: Addin[] | ObjWithReadableParams[] | ObjWithReadableParams
  errors: string[]
}

type Nomenclature = {
  id: string
  nmId: number
  vendorCode: string
  variations: Variation[]
  addin: Addin[] | ObjWithReadableParams[] | ObjWithReadableParams
  updatedAt: string
}

type Card = {
  id: string
  imtId: number
  userId: number
  supplierId: string
  imtSupplierId: number
  object: string
  parent: string
  countryProduction: string
  addin: Addin[] | ObjWithReadableParams[] | ObjWithReadableParams
  nomenclatures: []
  createdAt: string
  updatedAt: string
  batchID: string
}

type Addin = {
  type: string
  params: string | any[]
}

type ObjWithReadableParams = {
  [x: string]: string | any[] | number
}
// }

export {
  CardListJSON,
  CardListResult,
  Variation,
  Nomenclature,
  Card,
  Addin,
  ObjWithReadableParams,
}
