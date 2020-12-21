import React, { ChangeEvent, createRef, Fragment, useState } from 'react'
import { css } from '@emotion/core'
import Compress from 'react-image-file-resizer'
// import imageCompression from 'browser-image-compression'

type Props = {
    imageURL: string
}
// declare function require(x: string): any
// const webp = require('webp-converter')
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
    top: '50px',
    width: '30%',
    height: '150px'
})

const PhotosUpload: React.FC<Props> = ({ imageURL }) => {
    const [image, setImage] = useState(imageURL)
    const ref = createRef<HTMLInputElement>()
    const onClick = () => {
        if (ref.current) {
            ref.current.click()
        }
    }
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        // const options = {
        //     maxSizeMB: 0.2,
        //     maxWidthOrHeight: 50
        // }

        if (event.target.files === null) {
            return
        }
        const file = event.target.files.item(0)
        if (file === null) {
            return
        }
        Compress.imageFileResizer(
            file, // the file from input
            100, // width
            100, // height
            'WEBP', // compress format WEBP, JPEG, PNG
            50, // quality
            0, // rotation
            uri => {
                console.log(uri)
                // You upload logic goes here
            },
            'base64' // blob or base64 default base64
        )
        // const compressFile = imageCompression(file, options)
        //     .then(function (compressedFile) {
        //         console.log(
        //             'compressedFile instanceof Blob',
        //             compressedFile instanceof Blob
        //         ) // true
        //         console.log(
        //             `compressedFile size ${
        //                 compressedFile.size / 1024 / 1024
        //             } MB`
        //         ) // smaller than maxSizeMB
        //     })
        //     .catch(function (error) {
        //         console.log(error.message)
        //     })
        // // webp.grant_permission()
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImage(reader.result as string)
        }
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
