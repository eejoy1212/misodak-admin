import { TextField } from '@mui/material';
import * as React from 'react';
import { appColor1 } from '../const/const';

export interface IForbidTxtfieldProps {
  placeHolder?:string;
    word:string;
    onChangeWord?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ForbidTxtfield (props: IForbidTxtfieldProps) {
  return (
    <TextField
    placeholder={props.placeHolder??''}
    value={props.word}
    onChange={props.onChangeWord}
    sx={{
      
        width: "280px",
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            height:"50px",
            borderRadius: "30px",
            borderColor: appColor1,
          },
          '&:hover fieldset': {
            height:"50px",
            borderColor: 'darkgreen',
          },
          '&.Mui-focused fieldset': {
            height:"50px",
            borderColor: appColor1,
          },
        },
      }}
    />
  );
}
