import { Button, Card, CardContent, TextareaAutosize, Typography } from '@mui/material';
import * as React from 'react';
import './AppPushCreate.css'
import { HospitalRegisterTxtfield } from '../Component/HospitalRegisterTxtfield';
export interface IAppPushCreateProps {
}

export function AppPushCreate (props: IAppPushCreateProps) {
  const [campaignName,setCampainName]=React.useState<string>("")
  const [filter,setFilter]=React.useState<string>("")
  const [segemnt,setSegment]=React.useState<string>("")
  const [title,setTitle]=React.useState<string>("")
  const [body,setBody]=React.useState<string>("")
  
  return (
    <div className='apppush-container'>
      {/* <Card
      sx={{
        width:"50%"
      }}
      >

        <CardContent
        sx={{
            display:"flex",
            flexDirection:"column",
            gap:"30px",
            alignItems:"center"
        }}
        > */}
            {/* <Typography
            fontSize={"18px"}
            >푸시생성</Typography> */}
            {/* 캠페인명 */}
            <div className="push-row">
                <div className="push-title">
                <Typography>캠페인명</Typography>
                </div>    <HospitalRegisterTxtfield
                value={campaignName}
                onChange={(e)=>{
                  setCampainName(e.target.value)
                }}
                />
            </div>
             {/* Push 대상 */}
            <div className="push-row">
                <div className="push-title">
                <Typography>Push 대상</Typography>
                </div>    <HospitalRegisterTxtfield
                value={filter}
                onChange={(e)=>{
                  setFilter(e.target.value)
                }}
                />
            </div>
             {/* Segment */}
             <div className="push-row">
                <div className="push-title">
                <Typography>Segment</Typography>
                </div>    <HospitalRegisterTxtfield
                value={segemnt}
                onChange={(e)=>{
                  setSegment(e.target.value)
                }}
                />
            </div>
            {/* 앱푸시 제목 */}
            <div className="push-row">
                <div className="push-title">
                <Typography>앱푸시 제목</Typography>
                </div>    <HospitalRegisterTxtfield
                value={title}
                onChange={(e)=>{
                  setTitle(e.target.value)
                }}
                />
            </div>
             {/* 이벤트 순서 */}
             <div className="push-row">
                <div className="push-title">
                <Typography>앱푸시 내용</Typography>
                </div>    <TextareaAutosize
                style={{
                    resize:"none",
                    width:"290px",
                    height:"300px"
                }}
                value={body}
                onChange={(e)=>{setBody(e.target.value)}}
                />
            </div>
            <div
                            className='push-row'
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
                                >앱푸시 생성</Button>
                                </div>
        {/* </CardContent>
      </Card> */}
    </div>
  );
}
