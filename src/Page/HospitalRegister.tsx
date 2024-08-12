import { Button, Card, CardContent, MenuItem, Select, Typography, SelectChangeEvent, TextareaAutosize } from '@mui/material';
import * as React from 'react';
import './HospitalRegister.css';
import { FaImage } from "react-icons/fa";
import { HospitalRegisterTxtfield } from '../Component/HospitalRegisterTxtfield';

export interface IHospitalRegisterProps {}

export function HospitalRegister(props: IHospitalRegisterProps) {
    // 디폴트로 선택될 진료과를 설정합니다.
    const [selectedDepartment, setSelectedDepartment] = React.useState('진료과');

    const handleDepartmentChange = (event: SelectChangeEvent) => {
        setSelectedDepartment(event.target.value as string);
    };

    return (
        <div className='hospital-register-container'>
            <Card variant="outlined"
                sx={{
                    width: "100%",
                    height: "100%"
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}
                >
                    {/* <div className='info-title'>
                        <Typography fontSize={"20px"}>병원 정보</Typography>
                    </div> */}
                    <div className="info-contents">
                        <div className="left-area"> 
                            {/* 1 */}
                            <div className="info-container">
                                <div className="title-box first-title">병원 이미지</div>
                                <div className="content-box ">
                                    <div className="photo-container first-container"><FaImage size={50}/></div>
                                </div>
                            </div>
                            {/* 2 */}
                            <div className="info-container">
                                <div className="title-box">
                                    <span>병원명</span>
                                    <span>도시</span>
                                </div>
                                <div className="content-box">
                                    <div className="form-container">
                                        <HospitalRegisterTxtfield/>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "flex-end"
                                            }}
                                        >
                                            <HospitalRegisterTxtfield/>
                                            <Typography fontSize={"16px"} marginBottom={"8px"} marginLeft={"8px"}>시,군</Typography>
                                        </div>
                                        <HospitalRegisterTxtfield/>
                                    </div>
                                </div>
                            </div>
                            {/* 3 */}
                            <div className="info-container">
                                <div className="title-box">
                                    <span>지역구</span>
                                    <span>주소</span>
                                </div>
                                <div className="content-box">
                                    <div className="form-container">
                                        <HospitalRegisterTxtfield/>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: "20px"
                                            }}
                                        >
                                            <Button
                                                variant='outlined'
                                                sx={{
                                                    border: "1px solid #D6D4D4",
                                                    height: "36px",
                                                    color: "black",
                                                    width: "100px",
                                                    ":hover": {
                                                        border: "1px solid #D6D4D4",
                                                        color: "black",
                                                    }
                                                }}
                                            >
                                                지역검색
                                            </Button>
                                            <HospitalRegisterTxtfield/>
                                        </div>
                                        <HospitalRegisterTxtfield/>
                                    </div>
                                </div>
                            </div>
                            {/* 4 */}
                            <div className="info-container">
                                <div className="title-box">
                                    <span>진료과</span>
                                </div>
                                <div className="content-box">
                                    <div className="form-container">
                                        <Select
                                         sx={{
                                            border: "1px solid #D6D4D4",
                                            height: "36px",
                                            color: "black",
                                            width: "100px",
                                            ":hover": {
                                                border: "1px solid #D6D4D4",
                                                color: "black",
                                            }
                                        }}
                                            value={selectedDepartment}
                                            onChange={handleDepartmentChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="진료과" disabled>진료과</MenuItem>
                                            <MenuItem value="내과">내과</MenuItem>
                                            <MenuItem value="외과">외과</MenuItem>
                                            <MenuItem value="소아과">소아과</MenuItem>
                                            {/* 추가 진료과 옵션을 여기서 추가하세요 */}
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            {/* 5 */}
                            <div className="info-container">
                                <div className="title-box">
                                    <span>검색태그</span>
                                </div>
                                <div className="content-box">
                                    <div className="form-container">
                                    <div
                                    style={{
                                        display:"flex",
                                        flexDirection:"column",
                                        alignItems:"center",
                                        justifyContent:"center"
                                    }}
                                    ><HospitalRegisterTxtfield/>
                                    <span
                                    style={{
                                        color: "#999999",
                                        fontWeight:500,
                                        fontSize:"12px"

                                    }}
                                    >','로 새로운 태그를 입력</span>
                                    </div>
                                    
                                    </div>
                                </div>
                            </div>
                             {/* 6 */}
                             <div className="info-container">
                                <div className="title-box">
                                <span>병원에 대한</span>
                                <span>매체 스크립트</span>
                                </div>
                                <div className="content-box">
                                    <div className="form-container">
                                    <TextareaAutosize
                                    
                                    style={{
                                    resize:"none",
                                        width:"300px"
                                    }}
                                    minRows={10}
                                    maxRows={10}
                                    />
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-area">dd</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
