import React, {useEffect, useMemo, useState} from 'react'
import {Rectangle, useMap} from "react-leaflet";
import {LatLngBoundsExpression} from "leaflet";

interface Props {
    zoomLevel: number;
    setZoomLevel: (zoom: number) => void;
}

const organizationBounds: LatLngBoundsExpression = [
    [59.127513, 37.843739],
    [59.137429, 37.877001],
]

export const SetBoundsDefault = ({zoomLevel, setZoomLevel}: Props) => {
    const [bounds, setBounds] = useState(organizationBounds)
    const map = useMap()
    const outerHandlers = useMemo(
        () => ({
            click() {
                setBounds(organizationBounds)
                map.fitBounds(organizationBounds)
                setZoomLevel(15);
            },
        }),
        [map],
    )

    useEffect(() => {
        console.log(map.getZoom())
        map.on('zoomend', () => {

            if(zoomLevel < 15 ) {


            }
            setZoomLevel(map.getZoom())
        })
    }, [map])
    return (
        <>
                <Rectangle
                    bounds={bounds}
                    eventHandlers={outerHandlers}
                    pathOptions={{fillOpacity: 0}}
                />
        </>
    )
}