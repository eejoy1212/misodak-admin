import { Card, CardContent, TextareaAutosize, Typography } from '@mui/material';
import * as React from 'react';
import './Term.css'
export interface ITermProps {
}

export function Term (props: ITermProps) {
  return (
    <div className="hospital-container">
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
    <Typography fontSize={"18px"}>이용약관</Typography>
    <div className="term-row">
        <div className="term-title">
            이용약관
        </div>
        <TextareaAutosize
       minRows={12} // 최소 높이 지정
       maxRows={12} // 최대 높이 지정
       style={{

        
        //  boxSizing: 'border-box',
       }}
        
        className='term-textarea'
        />
    </div>
    <div className="term-row">
        <div className="term-title">
        <span>개인정보</span>
        <span>처리방침</span>
        </div>
        <TextareaAutosize
       minRows={15} // 최소 높이 지정
       maxRows={15} // 최대 높이 지정
       style={{

        
        //  boxSizing: 'border-box',
       }}
        
        className='term-textarea'
        />
    </div>
    <div className="term-row">
        <div className="term-title">
        <span>위치기반</span>
        <span>서비스</span>
        <span>이용방침</span>
        </div>
        <TextareaAutosize
       minRows={15} // 최소 높이 지정
       maxRows={15} // 최대 높이 지정
       style={{

        
        //  boxSizing: 'border-box',
       }}
        
        className='term-textarea'
        />
    </div>
</CardContent>
</Card>
    </div>
  );
}
