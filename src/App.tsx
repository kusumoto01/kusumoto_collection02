import React from 'react'
import Movelist from './movelist'
import PhotosUpload from './PhotosUpload'

const App = (): JSX.Element => {
    const image = ''
    const dataLeft = [
        { sortkey: 1, id: 1, label: '20:00-21:00', price: 6000 },
        { sortkey: 2, id: 2, label: 'キャストA', price: 3000 },
        { sortkey: 4, id: 3, label: 'オーダーA', price: 3000 },
        { sortkey: 4, id: 4, label: 'オーダーB', price: 3000 },
        { sortkey: 4, id: 5, label: 'オーダーC', price: 3000 }
    ]

    const dataRight = [
        { sortkey: 1, id: 6, label: '21:00-23:30', price: 6500 },
        { sortkey: 2, id: 7, label: 'キャストB', price: 3000 },
        { sortkey: 4, id: 8, label: 'オーダーD', price: 3000 },
        { sortkey: 4, id: 9, label: 'オーダーE', price: 3000 },
        { sortkey: 4, id: 10, label: 'オーダーF', price: 3000 }
    ]

    return (
        <div>
            <Movelist AdataLeft={dataLeft} AdataRight={dataRight} />
            <PhotosUpload imageURL={image} />
        </div>
    )
}

export default App
