import { TextField } from '@mui/material';
import * as React from 'react';

export interface IHospitalRegisterTxtfieldProps {
}

export function HospitalRegisterTxtfield (props: IHospitalRegisterTxtfieldProps) {
  return (
    <TextField
    size='small'
    sx={{
        width:"300px"
    }}
    
    />
  );
}
