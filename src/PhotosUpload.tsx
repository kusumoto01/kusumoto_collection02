import React, { ChangeEvent, createRef, Fragment, useState } from 'react'

const photosUpload: React.FC = () => {
    const [src, setSrc] = useState('')
    const ref = createRef<HTMLInputElement>()
    const onClick = () => {
        if (ref.current) {
            ref.current.click()
        }
    }
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null) {
            return
        }
        const file = event.target.files.item(0)
        if (file === null) {
            return
        }
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setSrc(reader.result as string)
        }
    }

    return (
        <Fragment>
            <input
                onChange={onChange}
                ref={ref}
                style={{ display: 'none' }}
                type={'file'}
            />
            <button onClick={onClick}>file</button>
            <div>{src && <img src={src} />}</div>
        </Fragment>
    )
}

export default photosUpload
