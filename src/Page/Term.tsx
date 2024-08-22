import { Button, Card, CardContent, TextareaAutosize, Typography } from '@mui/material';
import * as React from 'react';
import './Term.css'
import { getTerms } from '../api/terms';
export interface ITermProps {
}
interface Term{
  term:string;
  privacyPolicy:string;
  locationServiceTerm:string;
}
export function Term (props: ITermProps) {
  const [terms,setTerms]=React.useState<Term[]>([])
  const [page,setPage]=React.useState(0)
  const fetchTerms=async()=>{
    const res=await getTerms(page)
    console.log(res)
    setTerms(res)
  }
  React.useEffect(()=>{
    fetchTerms()
  },[])
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
               value={terms[0]?terms[0].term:""}
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
       value={terms[0]?terms[0].privacyPolicy:""}
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
               value={terms[0]?terms[0].locationServiceTerm:""}
       minRows={15} // 최소 높이 지정
       maxRows={15} // 최대 높이 지정
       style={{

        
        //  boxSizing: 'border-box',
       }}
        
        className='term-textarea'
        />
    </div>
    <div
                           style={{
                            display:"flex",gap:"30px",
                            justifyContent:"flex-end"
                           }}
                            >
                                <Button
                                variant='outlined'
                                sx={{
                                    marginLeft:"140px",
                                    width:"160px",
                                    borderColor:"black",
                                    color:"black",
                                    ":hover":{
                                        width:"160px",
                                        borderColor:"black",
                                        color:"black",  
                                    }
                                }}
                                >취소</Button>
                                <Button
                                 variant='contained'
                                 sx={{
                                    backgroundColor:"#31873E",
                                    width:"160px",
                                    ":hover":{
                                        backgroundColor:"#31873E",
                                    width:"160px",  
                                    }
                                 }}
                                >저장</Button>
                                </div>
</CardContent>
</Card>
    </div>
  );
}
