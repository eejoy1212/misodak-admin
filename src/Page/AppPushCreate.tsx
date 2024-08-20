import { Button, Card, CardContent, TextareaAutosize, Typography } from '@mui/material';
import * as React from 'react';
import './AppPushCreate.css'
import { HospitalRegisterTxtfield } from '../Component/HospitalRegisterTxtfield';
export interface IAppPushCreateProps {
}

export function AppPushCreate (props: IAppPushCreateProps) {
  return (
    <div className='apppush-container'>
      <Card
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
        >
            <Typography
            fontSize={"18px"}
            >푸시생성</Typography>
            {/* 캠페인명 */}
            <div className="push-row">
                <div className="push-title">
                <Typography>캠페인명</Typography>
                </div>    <HospitalRegisterTxtfield
                value=''
                onChange={()=>{}}
                />
            </div>
             {/* Push 대상 */}
            <div className="push-row">
                <div className="push-title">
                <Typography>Push 대상</Typography>
                </div>    <HospitalRegisterTxtfield
                value=''
                onChange={()=>{}}
                />
            </div>
             {/* Segment */}
             <div className="push-row">
                <div className="push-title">
                <Typography>Segment</Typography>
                </div>    <HospitalRegisterTxtfield
                value=''
                onChange={()=>{}}
                />
            </div>
            {/* 앱푸시 제목 */}
            <div className="push-row">
                <div className="push-title">
                <Typography>앱푸시 제목</Typography>
                </div>    <HospitalRegisterTxtfield
                value=''
                onChange={()=>{}}
                />
            </div>
             {/* 이벤트 순서 */}
             <div className="push-row">
                <div className="push-title">
                <Typography>이벤트 순서</Typography>
                </div>    <TextareaAutosize
                style={{
                    resize:"none",
                    width:"290px",
                    height:"300px"
                    // marginLeft:"10px"
                }}
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
        </CardContent>
      </Card>
    </div>
  );
}
