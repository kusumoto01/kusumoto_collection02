import React, { createRef, Fragment, useState } from 'react'
import { css } from '@emotion/core'
import imageCompression from 'browser-image-compression'

type Props = {
    imageURL: string
}
const Upload = css({
    position: 'absolute',
    top: '50px',
    left: '5vw',
    width: '40%',
    height: '300px'
})

const UploadButton = css({
    position: 'absolute',
    left: '20vw',
    top: '20px'
})

const PhotosActiveZone = css({
    position: 'absolute',
    left: '20vw',
    top: '50px'
})

const PhotosUpload: React.FC<Props> = ({ imageURL }) => {
    const [image, setImage] = useState(imageURL)
    const ref = createRef<HTMLInputElement>()
    const onClick = (): void => {
        if (ref.current) {
            ref.current.click()
        }
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files === null) {
            return
        }
        const file = event.target.files.item(0)
        if (file === null) {
            return
        }
        console.log('instanceof Blob', file instanceof Blob) // true
        console.log(`File size ${file.size / 1024 / 1024} MB`)
        console.log('File type', file.type)

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 300,
            useWebWorker: true,
            fileType: 'image/webp'
        }
        imageCompression(file, options)
            .then(function (compressedFile) {
                console.log(
                    'compressedFile instanceof Blob',
                    compressedFile instanceof Blob
                ) // true
                console.log(
                    `compressedFile File size ${
                        compressedFile.size / 1024 / 1024
                    } MB`
                )
                console.log('compressedFile file type', compressedFile.type)
                const reader = new FileReader()
                reader.readAsDataURL(compressedFile)
                reader.onload = () => {
                    setImage(reader.result as string)
                }
            })
            .catch(function (error) {
                console.log(error.message)
            })
    }

    return (
        <Fragment>
            <input
                css={Upload}
                onChange={onChange}
                ref={ref}
                style={{ display: 'none' }}
                type={'file'}
            />
            <button css={UploadButton} onClick={onClick}>
                file
            </button>
            <div>{image && <img css={PhotosActiveZone} src={image} />}</div>
        </Fragment>
    )
}

export default PhotosUpload
