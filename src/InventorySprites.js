import { useEffect, useRef, useState } from "react";

function InventorySprites(props) {
    const [sprite, setSprite] = useState('')
    const {item, atlas} = props
    const canvasRef = useRef(null);

    const drawItem = (ctx, x, y) => {
        ctx.drawImage(atlas, x, y, 48, 48)
        console.log(ctx)
        console.log('item sprite drawwwwwwwwwwww')
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if(canvas) {
            const context = canvas.getContext("2d");
            setSprite(context)
            drawItem(sprite, item.spriteSheetCoordinates.x, item.spriteSheetCoordinates.y)
            console.log('yeAAAAAAAAHHHHHHHHHHH')
        }
    }, [item])

    return (
        <canvas ref={canvasRef} width="200" height="100" style={{border: "1px solid #000000"}} ></canvas>
    )

}

export default InventorySprites