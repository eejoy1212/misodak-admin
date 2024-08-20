import { Checkbox } from '@mui/material';
import * as React from 'react';

export interface IMisodakCheckboxProps {
}

export function MisodakCheckbox (props: IMisodakCheckboxProps) {
  return (
    <Checkbox
    sx={{
        color: "#14AC2B",
        '&.Mui-checked': {
            color: "#14AC2B",
        },
        height: "28px"
    }}
/>
  );
}
