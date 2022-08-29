interface FileMetadata {
  uri: string,
  type: string,
  metadata: NFTMetadata,
}

export interface Propertie {
  label: string,
  value: string,
}
export interface Attribute {
  trait_type: string,
  value: string,
}

interface Localization {
  uri: string,
  locale: string,
}

export interface NFTMetadata {
  name: string,
  creator?: string,
  description?: string,
  image?: string | null,
  type?: string,
  files?: FileMetadata[],
  format?: string,
  properties?: Propertie[],
  attributes?: Attribute[],
  localization?: Localization
}
