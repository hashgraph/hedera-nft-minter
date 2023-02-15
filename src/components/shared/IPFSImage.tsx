import { ImgHTMLAttributes, useCallback, useEffect, useState } from 'react'
import Loader from '@components/shared/loader/Loader'
import IPFS from '@services/IPFS'

interface IPFSImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  cidOrUrlToImage: string
}

export const IPFSImage = ({ cidOrUrlToImage, ...imgProps }: IPFSImageProps) => {
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(true)

  const loadImage = useCallback(async () => {
    try {
      const previewImage = cidOrUrlToImage.includes('https://')
          ? cidOrUrlToImage
          : await IPFS.fetchImage(cidOrUrlToImage.replace('ipfs://', ''))

      setImage(previewImage)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log({ e })
    } finally {
      setLoading(false)
    }
  }, [cidOrUrlToImage])

  useEffect(() => {
    loadImage()
  }, [loadImage])

  if (loading) {
    return <Loader />
  }

  return (
    <img {...imgProps} src={image} alt={imgProps.alt ?? 'ipfs_image'}/>
  )
}