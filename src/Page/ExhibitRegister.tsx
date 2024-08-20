import { Button, Card, CardContent, TextareaAutosize, TextField } from '@mui/material';
import * as React from 'react';
import ImgContainer from '../images/thumbnail.png';
import './ExhibitRegister.css'
import { HospitalRegisterTxtfield } from '../Component/HospitalRegisterTxtfield';
import { MainSearchBar } from '../Component/MainSearchBar';
export interface IExhibitRegisterProps {
}

export function ExhibitRegister(props: IExhibitRegisterProps) {
    const [selectedImage, setSelectedImage] = React.useState<string>("");
    return (
        <div className='exhibit-reg-container'>
            <Card
                variant='outlined'
                sx={{
                    width: "100%",
                    height: "100%"
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "30px"
                    }}
                >
                    <div className="info-contents">
                        <div className="left-area">
                            {/* 1. 이미지 등록 */}
                            <div className="info-container">
                                <div className="register-row">
                                    {/* 썸네일 등록 */}
                                    <div className="thumbnail-reg-col">
                                        <div
                                            className="exhibit-photo-container"
                                            onClick={() => { }}
                                            style={{
                                                cursor: 'pointer',
                                                backgroundImage: `url(${selectedImage ? null : ImgContainer})`
                                            }}
                                        >
                                            {selectedImage && (
                                                <img
                                                    alt="Hospital"
                                                    src={selectedImage}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        height: "100%"
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <span>썸네일 등록</span>
                                    </div>
                                    {/* 상세 등록 */}
                                    <div className="thumbnail-reg-col">
                                        <div
                                            className="exhibit-photo-container"
                                            onClick={() => { }}
                                            style={{
                                                cursor: 'pointer',
                                                backgroundImage: `url(${selectedImage ? null : ImgContainer})`
                                            }}
                                        >
                                            {selectedImage && (
                                                <img
                                                    alt="Hospital"
                                                    src={selectedImage}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        height: "100%"
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <span>상세 등록</span>
                                    </div>
                                </div>

                            </div>
                            <div className="space"
                            style={{
                                height:"100px"
                            }}/>
                            {/* 2. 기획전명 */}
                            <div className="info-container">
                              <div className="title-box">기획전 명</div>
                                <div className="content-box ">
                                <div className="form-container">
                                  <HospitalRegisterTxtfield
                                  value=''
                                  onChange={()=>{}}
                                  />
                                </div>
                                </div>
                            </div>
                             {/* 3. 기획전 소개 */}
                             <div className="info-container">
                              <div className="title-box">기획전 소개</div>
                                <div className="content-box ">
                                <div className="form-container">
                                  <HospitalRegisterTxtfield
                                  value=''
                                  onChange={()=>{}}
                                  />
                                </div>
                                </div>
                            </div>
                             {/* 4. 기획전 버튼 */}
                             <div className="info-container">
                              <div className="title-box">기획전 버튼</div>
                                <div className="content-box ">
                                <div className="form-container">
                                  <HospitalRegisterTxtfield
                                  value=''
                                  onChange={()=>{}}
                                  />
                                </div>
                                </div>
                            </div>
                              {/* 5. 이벤트기간 */}
                              <div className="info-container">
                              <div className="title-box">이벤트 명</div>
                                <div className="content-box ">
                                <div className="form-container">
                                    <div className="datepicker-row"> 
                                        <TextField
                                  size='small'
                                  type='date'
                                  />
                                  <span>~</span>
                                  <TextField
                                  size='small'
                                  type='date'
                                  />
                                  </div>
                                 
                                </div>
                                </div>
                            </div>
                            {/* 6. 기획전 버튼 */}
                            <div className="info-container">
                              <div className="title-box">노출 위치</div>
                                <div className="content-box ">
                                <div className="form-container">
                                  <HospitalRegisterTxtfield
                                  value=''
                                  onChange={()=>{}}
                                  />
                                </div>
                                </div>
                            </div>
                               {/* 7. 귀속 이벤트 */}
                               <div className="info-container">
                              <div className="title-box">귀속이벤트</div>
                                <div className="content-box ">
                                <div className="event-row">
                                  <MainSearchBar
                                 size='small'
                                  placeholder='이벤트'
                                  onSearch={()=>{}}
                                  />
                                  <Button
                                  variant='contained'
                                  sx={{
                                    marginLeft:"30px",
                                    backgroundColor: "#31873E",
                                    ":hover":{

                                        backgroundColor: "#31873E",
                                    }

                                  }}
                                  >귀속</Button>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-area">
                            {/* 1. 이벤트 순서 A */}
                            <div className="info-container">
                              <div className="title-box">이벤트 순서 A</div>
                                <div className="content-box ">
                                <div className="form-container">
                                  <TextareaAutosize
                                  style={{
                                    width:"100%",
                                    height:"200px"
                                  }}

                                  
                                  />
                                </div>
                                </div>
                            </div>
                             {/* 2. 이벤트 순서 B */}
                             <div className="info-container">
                              <div className="title-box">이벤트 순서 B</div>
                                <div className="content-box ">
                                <div className="form-container">
                                  <TextareaAutosize
                                  style={{
                                    width:"100%",
                                    height:"200px"
                                  }}

                                  
                                  />
                                </div>
                                </div>
                            </div>
                              {/* 3. 이벤트 순서 C */}
                              <div className="info-container">
                              <div className="title-box">이벤트 순서 C</div>
                                <div className="content-box ">
                                <div className="form-container">
                                  <TextareaAutosize
                                  style={{
                                    width:"100%",
                                    height:"200px"
                                  }}

                                  
                                  />
                                </div>
                                </div>
                            </div>
                            {/* 취소 이벤트 생성 버튼 */}
                            <div
                            className='btns-row'
                            >
                                <Button
                                variant='outlined'
                                sx={{
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
                                >이벤트생성</Button>
                                </div>
                        </div>
                    </div>
                </CardContent></Card>
        </div>
    );
}
