'use client'

import { createChart, ColorType } from 'lightweight-charts'
import React, { useEffect, useRef } from 'react'

const colorsDefault = {
  backgroundColor: 'white',
  lineColor: '#2962FF',
  textColor: 'white',
  areaTopColor: '#2962FF',
  areaBottomColor: 'rgba(41, 98, 255, 0.2)'
}

export const ChartComponent = (props: any): any => {
  const { data, colors = colorsDefault } = props

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const chartContainerRef = useRef({} as HTMLDivElement)

  useEffect(() => {
    const handleResize = (): any => {
      chart.applyOptions({
        width: chartContainerRef?.current?.clientWidth
      })
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: colors.textColor
      },
      width: chartContainerRef.current.clientWidth,
      height: 300
    })
    chart.applyOptions({
      crosshair: {
        // hide the horizontal crosshair line
        // horzLine: {
        //   visible: false,
        //   labelVisible: false
        // },
        // hide the vertical crosshair label
        vertLine: {
          labelVisible: false
        }
      },
      // hide the grid lines
      grid: {
        vertLines: {
          visible: false
        },
        horzLines: {
          visible: false,
          color: 'black'
        }
      },
      rightPriceScale: {
        borderVisible: false
      },
      timeScale: {
        borderVisible: false
      }
    })
    chart.timeScale().fitContent()

    const newSeries = chart.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor
    })
    newSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.3, // leave some space for the legend
        bottom: 0.25
      }
    })
    newSeries.setData(data)

    const toolTipWidth = 80
    const toolTipHeight = 100
    const toolTipMargin = 15

    // Create and style the tooltip html element
    const toolTip = document.createElement('div')
    toolTip.setAttribute(
      'style',
      `
width: 80px; height: 80px;
position: absolute;
display: none;
padding: 8px;
box-sizing: border-box;
font-size: 12px;
text-align: left; 
z-index: 1000; top: 12px; 
left: 12px; 
pointer-events: none; 
border: 1px solid; 
border-radius: 2px;
font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; 
-webkit-font-smoothing: antialiased; 
-moz-osx-font-smoothing: grayscale; 
background: black; 
color: white; 
border-color: rgba(41, 98, 255, 0.28);
`
    )
    chartContainerRef.current.appendChild(toolTip)

    // update tooltip
    chart.subscribeCrosshairMove(param => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.current.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef.current.clientHeight
      ) {
        toolTip.style.display = 'none'
      } else {
        // time will be in the same format that we supplied to setData.
        // thus it will be YYYY-MM-DD
        const dateStr = param.time
        toolTip.style.display = 'block'
        const data = param.seriesData.get(newSeries) ?? { value: 0, close: 0 }

        // SI PUEDEN MEJORAR ESTE CODIGO HAGANLO EL TS ESTA JODIENDO
        // const price = data.value !== undefined ? data.value : data.close ;
        let price: any
        if ('value' in data) price = data.value
        else if ('close' in data) price = data.close

        toolTip.innerHTML = `<div style="color: ${'#2962FF'};font-size: 10px">Detalle:</div><div style="font-size: 24px; margin: 0px 0px; color: ${'white'}">
${Math.round(100 * price) / 100}
</div><div style="color: ${'white'}">
${String(dateStr).substring(0, 10)}
</div>`

        const coordinate = newSeries.priceToCoordinate(price)
        let shiftedCoordinate = param.point.x - 50
        if (coordinate === null) {
          return
        }
        shiftedCoordinate = Math.max(
          0,
          Math.min(
            chartContainerRef.current.clientWidth - toolTipWidth,
            shiftedCoordinate
          )
        )
        const coordinateY =
          coordinate - toolTipHeight - toolTipMargin > 0
            ? coordinate - toolTipHeight - toolTipMargin
            : Math.max(
              0,
              Math.min(
                chartContainerRef.current.clientHeight -
                  toolTipHeight -
                  toolTipMargin,
                coordinate + toolTipMargin
              )
            )
        toolTip.style.left = shiftedCoordinate + 'px'
        toolTip.style.top = coordinateY + 'px'
      }
    })

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [data])

  return <div ref={chartContainerRef} />
}

export function AppChartComponent (props: any): any {
  return (
    <div className='relative'>
      <ChartComponent
        {...props}
        data={props.data}
        colors={props.colors}
      />
    </div>
  )
}
