'use client'

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { StarIcon } from "@/icons/StartIcon";
const Rating = () => {
    const [startsSelected, seTstartsSelected] = useState(0)
    const starts = [1, 2, 3, 4, 5]
    const pressButton = (number: number): void => {
        seTstartsSelected(number)
    }
    return (
        <div>
            <p className="font-bold ">Rating</p>
            <div className="flex justify-between w-2/3">
                {
                    starts.map((start: number) => {
                        const colorButton = {
                            fill: start <= startsSelected ? '#006fee' : 'currentColor',
                            filled: start <= startsSelected ? 'fill' : null
                        }
                        return (
                            <Button
                                isIconOnly
                                aria-label="start"
                                className="bg-transparent"
                                key={start}
                                onPress={() => pressButton(start)}
                            >
                                <StarIcon fill={colorButton.fill} filled={colorButton.filled} />
                            </Button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Rating