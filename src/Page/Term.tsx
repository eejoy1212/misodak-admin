import { Button, Card, CardContent, TextareaAutosize, Typography } from '@mui/material';
import * as React from 'react';
import './Term.css'
import { getTerms, putEditTerms } from '../api/terms';
import { appColor1 } from '../const/const';
export interface ITermProps {
}
interface Term{
  id:number;
  term:string;
  privacyPolicy:string;
  locationServiceTerm:string;
}
export function Term (props: ITermProps) {
  const [nowId,setNowId]=React.useState<number>(0)
  const [terms,setTerms]=React.useState<Term[]>([])
  const [term,setTerm]=React.useState<string>("")
  const [privacyPolicy,setPrivacyPolicy]=React.useState<string>("")
  const [locationServiceTerm,setLocationServiceTerm]=React.useState<string>("")
  const [page,setPage]=React.useState(0)
  const fetchTerms=async()=>{
    const res=await getTerms(page)
    console.log(res)
    // setTerms(res)
    setNowId(res[0].id)
    setTerm(res[0].term)
    setPrivacyPolicy(res[0].privacyPolicy)
    setLocationServiceTerm(res[0].locationServiceTerm)
  }
  React.useEffect(()=>{
    fetchTerms()
  },[])
  const onChangeTerm=(e:any)=>{
    setTerm(e.target.value)
  }
  const onChangePrivacyPolicy=(e:any)=>{
    setPrivacyPolicy(e.target.value)
  }
  const onChangeServiceTerm=(e:any)=>{
    setLocationServiceTerm(e.target.value)
  }
  const fetchSaveTerms=async(id:number)=>{
    try {
        const content={
          id,
      term,
      privacyPolicy,
      locationServiceTerm
    }
    const res=await putEditTerms(id,content)
    window.confirm("성공적으로 수정되었습니다.")
    fetchTerms()
    } catch (error) {
      window.confirm(`수정 실패 : ${error}`)
    }
  
    
  }
  const onSave=async(id:number)=>{
    fetchSaveTerms(id)
  }
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
               value={term}
               onChange={onChangeTerm}
       minRows={12} // 최소 높이 지정
       maxRows={12} // 최대 높이 지정
       style={{
width:"90%"
        
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
       value={privacyPolicy}
       onChange={onChangePrivacyPolicy}
       style={{
width:"90%"
        
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
               value={locationServiceTerm}
               onChange={onChangeServiceTerm}
       minRows={15} // 최소 높이 지정
       maxRows={15} // 최대 높이 지정
       style={{
width:"90%"
        
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
                                {/* <Button
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
                                >취소</Button> */}
                                <Button
                                 variant='contained'
                                 sx={{
                                  marginRight:"36px",
                                    backgroundColor:appColor1,
                                    width:"160px",
                                    ":hover":{
                                        backgroundColor:appColor1,
                                    width:"160px",  
                                    }
                                 }}
                                 onClick={()=>{
                                  onSave(nowId)
                                 }}
                                >저장</Button>
                                </div>
</CardContent>
</Card>
    </div>
  );
}
