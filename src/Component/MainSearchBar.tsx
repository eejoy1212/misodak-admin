import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import { FaSearch } from 'react-icons/fa';

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
              <FaSearch color='#14AC2B' />
            </InputAdornment>
          ),
        }}
        sx={{
     
          width: "100%",
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: "30px",
              borderColor: '#14AC2B',
            },
            '&:hover fieldset': {
              borderColor: 'darkgreen',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#14AC2B',
            },
          },
        }}
      />
    </Box>
  );
}
