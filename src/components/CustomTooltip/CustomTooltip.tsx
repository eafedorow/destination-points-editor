import React from 'react'
import {Tooltip} from "react-leaflet";

interface Props {
    name: string;
    isPermanent: boolean;
}

export const CustomTooltip = ({name, isPermanent}: Props) => {
    return (
        <div>
            <Tooltip sticky={!isPermanent} permanent={isPermanent}>
                <span>{name}</span>
            </Tooltip>
        </div>
    )
}