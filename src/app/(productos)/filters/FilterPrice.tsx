'use client'

import { useMemo } from "react";
import { Slider, Input, Progress } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setNewValuesPrecios } from "@/lib/filters";
import styles from './Filters.module.css'

const classArray = [
  "max-w-20",
  "max-w-9",
  "max-w-16",
  "max-w-11",
  "max-w-12",
  "max-w-8",
  "max-w-6",
  "max-w-9",
  "max-w-8",
  "max-w-14",
  "max-w-8",
  "max-w-24",
  "max-w-8",
  "max-w-28",
  "max-w-8",
  "max-w-20",
  "max-w-8",
  "max-w-6",
  "max-w-8",
  "max-w-24",
  "max-w-20",
  "max-w-8",
  "max-w-6",
  "max-w-16"
]

const calculateStep = (valueSliderNow: number, rangeValueMax: number): number => {
  const cantBarras = 25
  const porcent = valueSliderNow * 100 / rangeValueMax || 0
  return Math.round(cantBarras * porcent / 100)
}

const FilterPrice = () => {
  const dispatch = useAppDispatch()
  const { precios } = useAppSelector( state => state.filters );
  const { ranges, values } = precios

  const minStep = useMemo(() => calculateStep(values[0], ranges.max), [values[0], ranges.max])
  const maxStep = useMemo(() => calculateStep(values[1], ranges.max), [values[1], ranges.max])

  return (
    <div className="flex flex-col gap-2 items-start justify-center w-52 h-52 relative mb-10">
      <p className="absolute top-8 font-bold">Rango de precios</p>
      <div className={styles.filterPriceBarras + " flex flex-col justify-between content-between w-full"}>
        {
          classArray.map((clase: string, index: number) => {
            const value = ((index + 1) <= maxStep && (index + 1) >= minStep) ? 100 : 0
            return <Progress size="sm" aria-label="Loading..." value={value} className={clase} key={String(index)} />
          })
        }
      </div>
      <div >
      <Slider
        minValue={ranges.min}
        maxValue={ranges.max}
        value={values}
        onChange={(e: any) =>dispatch(setNewValuesPrecios({precios: e}))}
        className="max-w-md"
        aria-label="slider"
        size="sm"
      />
      <div className="flex justify-between items-center w-full">
        <Input
          type="number"
          placeholder="0.00"
          labelPlacement="outside"
          className="mr-2"
          size="sm"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">S/</span>
            </div>
          }
          value={String(values[0])}
          onValueChange={(e)=>{
            const precios = [Number(e), values[1]]
            dispatch(setNewValuesPrecios({precios: precios}))
          }}
        />
        -
        <Input
          type="number"
          placeholder="0.00"
          labelPlacement="outside"
          className="ml-2"
          size="sm"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">S/</span>
            </div>
          }
          value={String(values[1])}
          onValueChange={(e)=>{
            const precios = [values[0], Number(e)]
            dispatch(setNewValuesPrecios({precios: precios}))
          }}
        />
      </div>
      </div>
    </div>
  )
}

export default FilterPrice