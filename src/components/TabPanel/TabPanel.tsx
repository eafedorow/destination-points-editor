import {Box, Typography} from '@mui/material';
import React from 'react'
import s from './TabPanel.module.scss'
interface Props {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

export const TabPanel = ({ children, value, index, ...other }: Props) => {
    return (
        <div
            className={s.tab}
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }} style={{padding: 0}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}