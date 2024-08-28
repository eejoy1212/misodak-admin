import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { appColor1 } from '../const/const';

export interface MainSearchBarProps {
  placeholder: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'small' | 'medium';
}

export function MainSearchBar({ placeholder, onSearch,size="medium" }: MainSearchBarProps) {
  return (
    <Box
      sx={{
        width: "100%"
      }}
    >
      <TextField
      size={size}
        placeholder={placeholder}
        variant="outlined"
        onChange={onSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaSearch color={appColor1} />
            </InputAdornment>
          ),
        }}
        sx={{
     
          width: "100%",
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: "30px",
              borderColor: appColor1,
            },
            '&:hover fieldset': {
              borderColor: appColor1,
            },
            '&.Mui-focused fieldset': {
              borderColor: appColor1,
            },
          },
        }}
      />
    </Box>
  );
}
