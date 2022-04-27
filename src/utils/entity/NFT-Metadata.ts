interface FileMetadata {
  uri: string,
  type: string,
  metadata: NFTMetadata,
}

interface Propertie {
  name: string,
  value: string,
}

interface Localization {
  uri: string,
  locale: string,
}

export interface NFTMetadata {
  name: string,
  creator?: string,
  creatorDID?: string,
  description?: string,
  image?: string | null,
  type?: string,
  files?: FileMetadata[],
  format?: string,
  properties?: Propertie[],
  localization?: Localization
}
