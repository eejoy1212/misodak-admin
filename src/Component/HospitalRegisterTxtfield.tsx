import { TextField } from '@mui/material';
import * as React from 'react';

export interface IHospitalRegisterTxtfieldProps {
  value:string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function HospitalRegisterTxtfield (props: IHospitalRegisterTxtfieldProps) {
  return (
    <TextField
    value={props.value}
    onChange={props.onChange}
    size='small'
    sx={{
        width:"300px"
    }}
    
    />
  );
}
