import { Checkbox } from '@mui/material';
import * as React from 'react';
import { appColor1 } from '../const/const';

export interface IMisodakCheckboxProps {
}

export function MisodakCheckbox (props: IMisodakCheckboxProps) {
  return (
    <Checkbox
    sx={{
        color: appColor1,
        '&.Mui-checked': {
            color: appColor1,
        },
        height: "28px"
    }}
/>
  );
}
