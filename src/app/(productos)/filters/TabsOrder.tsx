'use client'

import { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { HeartIcon } from "@/icons/HeartIcon";
import { AllGiftsIcon } from "@/icons/TodosRegalos";
import { setLiked } from "@/lib/filters";
import { useAppDispatch } from "@/lib/hooks";

const TabsOrder = () => {
    const dispatch = useAppDispatch()
    const [selected, setSelected] = useState("todos");
    useEffect(() => {
      const isGetLiked = selected === 'gusta'
      dispatch(setLiked({liked: isGetLiked}))
    }, [selected])
    
    return (

        <div>
            <p className="font-bold">Preferencia</p>
            <div className="flex w-full flex-col">
                <Tabs
                    aria-label="Options"
                    selectedKey={selected}
                    onSelectionChange={(e: any) => setSelected(e)}
                    size="sm"
                    color="primary"
                >
                    <Tab key="todos" title={
                        <div className="flex items-center space-x-2">
                            <span>Todos</span>
                            <AllGiftsIcon />
                        </div>
                    } />
                    <Tab key="gusta" title={
                        <div className="flex items-center space-x-2">
                            <span>Me gustan</span>
                            <HeartIcon />
                        </div>
                    } />
                </Tabs>
            </div>
        </div>
    )
}

export default TabsOrder
