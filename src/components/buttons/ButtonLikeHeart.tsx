
import { useState, useMemo } from "react";
import { Button } from "@nextui-org/react";
import { HeartIcon } from "@/icons/HeartIcon";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addGiftFavorite } from "@/lib/regalos";

const ButtonLikeHeart = ({idProduct}: {idProduct: string}) => {
    const { productsFavorites } = useAppSelector( state => state.regalos );
    const [_, setLike] = useState(productsFavorites?.includes(idProduct as never) || false)
    const dispatch = useAppDispatch()
    const isSelected = useMemo(() => productsFavorites.includes(idProduct as never), [productsFavorites])
    const pressButton = async(): Promise<any> =>{
        let likeNow
        setLike( likeValue => {
            likeNow = !likeValue
            return !likeValue
        } )
        const operation: string = likeNow ? '+': '-'
        dispatch(addGiftFavorite(idProduct, operation))
    }
    return (

        <Button 
            onPress={pressButton}
            isIconOnly color={isSelected ? "danger": "default"} 
            aria-label="Like"
            >
            <HeartIcon />
        </Button>
    )
}

export default ButtonLikeHeart