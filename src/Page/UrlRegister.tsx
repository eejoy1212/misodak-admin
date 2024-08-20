import * as React from 'react';
import './UrlRegister.css'
import { RiSearchLine } from "react-icons/ri";
import ImgContainer from '../images/img-container.png';
import { Button, Card, CardContent, Checkbox, MenuItem, Select, TextField, Typography } from '@mui/material';
import { MisodakCheckbox } from '../Component/MisodakCheckbox';
import { HospitalRegisterTxtfield } from '../Component/HospitalRegisterTxtfield';

export interface UrlRegisterProps {}

export function UrlRegister(props: UrlRegisterProps) {
    const [selectedImage, setSelectedImage] = React.useState<string>("");

    return (
        <div className='url-reg-container'>
            <Card
                variant='outlined'
                sx={{
                    height: "100%"
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap:"30px"
                    }}
                >
                    {/* url 생성 텍스트필드 */}
                    <div className="url-create-row">
                        <RiSearchLine
                            color='#14AC2B'
                            size={20}
                        />
                        <Typography fontSize={"16px"}>URL 생성</Typography>
                        <TextField
                            size='small'
                            sx={{}}
                            inputProps={{
                                style: {
                                    width: "300px",
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #D6D4D4"
                                }
                            }}
                        />
                        <Button
                            variant='contained'
                            sx={{
                                fontSize: "15px",
                                width: "50px",
                                backgroundColor: "#14AC2B",
                                ":hover": {
                                    backgroundColor: "#14AC2B",
                                }
                            }}
                        >
                            복사
                        </Button>
                    </div>
                    <div className="info-contents">
                        <div className="left-area">
                            {/* 1 - 썸네일 등록 */}
                            <div className="info-container">
                                <div className="title-box first-title">썸네일 등록</div>
                                <div className="content-box ">
                                    <div
                                        className="photo-container first-container"
                                        onClick={() => {}}
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
                                    <input
                                        id="imageUploadInput"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={() => {}}
                                    />
                                </div>
                            </div>
                            {/* 2 - 상담받기 */}
                            <div className="info-container">
                                <div className="title-box-with-check">
                                    <span>상담받기</span>
                                 <MisodakCheckbox/>
                                </div>
                                <div className="content-box ">
                                <div className="form-container">
                                    <div className="check-row">
                                        <MisodakCheckbox/>
                                        <span>인앱상담</span>
                                    </div>
                                    <div className="check-row">
                                        <MisodakCheckbox/>
                                        <span>병원 카카오톡 연결 활성화</span>
                                    </div>
                                    <div className="check-row">
                                        <MisodakCheckbox/>
                                        <span>병원 전화번호 연결 활성화</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                              {/* 3 - 이벤트병원 */}
                              <div className="info-container">
                              <div className="title-box">이벤트 병원</div>
                                <div className="content-box ">
                                <div className="form-container">
                                  <HospitalRegisterTxtfield
                                  value=''
                                  onChange={()=>{}}
                                  />
                                </div>
                                </div>
                            </div>
                              {/* 4 - 이벤트명 */}
                              <div className="info-container">
                              <div className="title-box">이벤트 명</div>
                                <div className="content-box ">
                                <div className="form-container">
                                  <HospitalRegisterTxtfield
                                  value=''
                                  onChange={()=>{}}
                                  />
                                </div>
                                </div>
                            </div>
                               {/* 5 - 이벤트기간 */}
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
                               {/* 6 - 이벤트기간 */}
                               <div className="info-container">
                              <div className="title-box">이벤트푸터</div>
                                <div className="content-box ">
                                <div className="form-container">
                                    <div className="datepicker-row"> 
                                    <Select
              value={""}
              onChange={()=>{}}
              displayEmpty
              sx={{ height: "36px", width: "200px" }}
            >
                <MenuItem key={"option.value"} value={"option.value"}>
                </MenuItem>
            </Select>
                                  </div>
                                 
                                </div>
                                </div>
                            </div>
                            {/* 7 - 랜딩 이미지 등록 */}
                            <div className="info-container">
                                <div className="title-box first-title">랜딩 이미지 등록</div>
                                <div className="content-box ">
                                    <div
                                        className="photo-container first-container"
                                        onClick={() => {}}
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
                                    <input
                                        id="imageUploadInput"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={() => {}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="right-area">
                            {/* right-1 - 병원 소개 */}
                            <div className="info-container">
                            <div className="preview-box">

                            <div className="preview-card">
                                미리보기
                            </div>
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
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
