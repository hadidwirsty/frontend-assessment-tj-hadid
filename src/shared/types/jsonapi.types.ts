export interface ResourceIdentifier {
  id: string
  type: string
}

export interface Relationship {
  data: ResourceIdentifier | ResourceIdentifier[] | null
}

export interface ResourceObject<
  TType extends string,
  TAttributes,
  TRelationships = Record<string, never>,
> {
  type: TType
  id: string
  attributes: TAttributes
  relationships?: TRelationships
  links?: Record<string, string>
}

export interface ResponseMeta {
  count?: number
  [key: string]: unknown
}

export interface ListResponse<T> {
  data: T[]
  meta?: ResponseMeta
  links?: {
    first?: string
    next?: string
    prev?: string
    last?: string
  }
}

export interface SingleResponse<T, TIncluded = unknown> {
  data: T
  included?: TIncluded[]
}
