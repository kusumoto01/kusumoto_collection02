import React, { useRef, useState } from 'react'

type Props = {
    AdataLeft: {
        sortkey: number

        id: number

        label: string

        price: number
    }[]

    AdataRight: {
        sortkey: number

        id: number

        label: string

        price: number
    }[]
}

const Movelist: React.FC<Props> = ({ AdataLeft, AdataRight }) => {
    const [dataLeft, setDataLeft] = useState(AdataLeft)

    const [dataRight, setDataRight] = useState(AdataRight)

    const [selectLeft, setSelectLeft] = useState<number[]>()

    const [selectRight, setSelectRight] = useState<number[]>()

    const leftElm = useRef<HTMLSelectElement>(null)

    const rightElm = useRef<HTMLSelectElement>(null)

    // 左→右への移動

    const onMoveRight = (): void => {
        for (const i of selectLeft!) {
            const selectData = dataLeft.filter(list => list.id === Number(i))

            setDataLeft(dataLeft =>
                dataLeft.filter(list => list.id !== Number(i))
            )

            setDataRight(dataRight => [...selectData, ...dataRight])
        }

        setDataRight(dataRight =>
            dataRight.sort((a, b) => a.sortkey - b.sortkey)
        )
    }

    // 右→左への移動

    const onMoveLeft = (): void => {
        for (const i of selectRight!) {
            const selectData = dataRight.filter(list => list.id === Number(i))

            setDataRight(dataRight =>
                dataRight.filter(list => list.id !== Number(i))
            )

            setDataLeft(dataLeft => [...selectData, ...dataLeft])
        }

        setDataLeft(dataLeft => dataLeft.sort((a, b) => a.sortkey - b.sortkey))
    }

    // 要素選択時(左)

    const setSelectedLeft = (): void => {
        const valAry: number[] = []

        for (const boxLeft of Array.from(leftElm!.current!)) {
            if ((boxLeft as HTMLOptionElement).selected)
                valAry.push(Number((boxLeft as HTMLOptionElement).value))
        }

        setSelectLeft(valAry)
    }

    //要素選択時(右)

    const setSelectedRight = (): void => {
        const valAry: number[] = []

        for (const boxRight of Array.from(rightElm!.current!)) {
            if ((boxRight as HTMLOptionElement).selected)
                valAry.push(Number((boxRight as HTMLOptionElement).value))
        }

        setSelectRight(valAry)
    }

    // 全選択ボタン押下時(左)

    const setSelectedAllLeft = (): void => {
        const valAry: number[] = []

        for (const boxLeft of Array.from(leftElm!.current!)) {
            ;(boxLeft as HTMLOptionElement).selected = true

            valAry.push(Number((boxLeft as HTMLOptionElement).value))
        }

        setSelectLeft(valAry)
    }

    // 全選択ボタン押下時(右)

    const setSelectedAllRight = (): void => {
        const valAry: number[] = []

        for (const boxRight of Array.from(rightElm!.current!)) {
            ;(boxRight as HTMLOptionElement).selected = true

            valAry.push(Number((boxRight as HTMLOptionElement).value))
        }

        setSelectRight(valAry)
    }

    return (
        <table className="sample">
            <tbody>
                <tr>
                    <td>
                        <input
                            className="button_square button3"
                            type="button"
                            id="selectAll_box_left"
                            value="全選択"
                            onClick={setSelectedAllLeft}
                        />

                        <br />

                        <br />

                        <select
                            className="select_box"
                            id="select_box_left"
                            name="s1"
                            size={5}
                            multiple={true}
                            ref={leftElm}
                            onChange={setSelectedLeft}
                        >
                            {dataLeft.map(op => (
                                <option key={op.id} value={op.id}>
                                    {op.label}¥{op.price}
                                </option>
                            ))}
                        </select>
                    </td>

                    <td>
                        <input
                            className="button_square button1"
                            type="button"
                            name="right"
                            value="≫"
                            onClick={onMoveRight}
                        />

                        <br />

                        <br />

                        <input
                            className="button_square button2"
                            type="button"
                            name="left"
                            value="≪"
                            onClick={onMoveLeft}
                        />
                    </td>

                    <td>
                        <input
                            className="button_square button4"
                            type="button"
                            id="selectAll_box_right"
                            value="全選択"
                            onClick={setSelectedAllRight}
                        />

                        <br />

                        <br />

                        <select
                            className="select_box"
                            id="select_box_right"
                            name="s2"
                            size={5}
                            multiple={true}
                            ref={rightElm}
                            onChange={setSelectedRight}
                        >
                            {dataRight.map(op => (
                                <option key={op.id} value={op.id}>
                                    {op.label}¥{op.price}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Movelist
