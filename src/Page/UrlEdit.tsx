import * as React from 'react';
import './UrlRegister.css';
import { RiSearchLine } from "react-icons/ri";
import ImgContainer from '../images/img-container.png';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { MisodakCheckbox } from '../Component/MisodakCheckbox';
import { HospitalRegisterTxtfield } from '../Component/HospitalRegisterTxtfield';
import { postCreateEvent, putUpdateEvent } from '../api/event';
import { appColor1 } from '../const/const';

export interface UrlEditProps {
    editing:any
}

export function UrlEdit({editing}: UrlEditProps) {
    const [selectedThumbnailImage, setSelectedThumbnailImage] = React.useState<File | null>(null);
    const [selectedDetailImage, setSelectedDetailImage] = React.useState<File | null>(null);
    const [url, setUrl] = React.useState<string>("");
    const [eventHospital, setEventHospital] = React.useState<string>("");
    const [eventName, setEventName] = React.useState<string>("");
    const [startDate, setStartDate] = React.useState<string>("");
    const [endDate, setEndDate] = React.useState<string>("");
    const [eventFooter, setEventFooter] = React.useState<string>("");
React.useEffect(()=>{
    console.log("editing>>>",editing)
},[])
    const handleThumbUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedThumbnailImage(event.target.files[0]);
        }
    };

    const handleDetailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedDetailImage(event.target.files[0]);
        }
    };

  
    const onEventCreate = async () => {
        try {
            const eventData = {
                eventId:15,
                hospitalId: 10, // 병원 ID (실제 값으로 변경)
                eventName: "testeventName",
                // eventCost: "10000", // 이벤트 비용 (실제 값으로 변경)
                // eventDescription: "이벤트 설명", // 이벤트 설명 (실제 값으로 변경)
                startAt: "2024-08-29T06:10:58.218Z",
                endAt: "2024-08-30T06:10:58.218Z",
            };

            const content = {
                data: eventData,
                image: selectedThumbnailImage,
            };

            const response = await putUpdateEvent(content);
            console.log('이벤트 수정 성공:', response);
        } catch (error) {
            console.error('이벤트 수정 실패:', error);
        }
    };

    return (
        <div className='url-reg-container'>
            {/* URL 생성 텍스트필드 */}
            <div className="url-create-row" style={{ marginTop:"10px" }}>
                <RiSearchLine color={appColor1} size={20} />
                <Typography fontSize={"16px"}>URL 생성</Typography>
                <TextField
                    size='small'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
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
                        backgroundColor: appColor1,
                        ":hover": {
                            backgroundColor: appColor1,
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
                                onClick={() => document.getElementById('imageUploadInput')?.click()}
                                style={{
                                    cursor: 'pointer',
                                    backgroundImage: `url(${selectedThumbnailImage ? URL.createObjectURL(selectedThumbnailImage) : ImgContainer})`
                                }}
                            >
                                {selectedThumbnailImage && (
                                    <img
                                        alt="Hospital"
                                        src={URL.createObjectURL(selectedThumbnailImage)}
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
                                onChange={handleThumbUpload} // 이벤트 핸들러 연결
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
                    {/* 3 - 이벤트 병원 */}
                    <div className="info-container">
                        <div className="title-box">이벤트 병원</div>
                        <div className="content-box ">
                            <div className="form-container">
                                <HospitalRegisterTxtfield
                                    value={eventHospital}
                                    onChange={(e) => setEventHospital(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    {/* 4 - 이벤트 명 */}
                    <div className="info-container">
                        <div className="title-box">이벤트 명</div>
                        <div className="content-box ">
                            <div className="form-container">
                                <HospitalRegisterTxtfield
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    {/* 5 - 이벤트 기간 */}
                    <div className="info-container">
                        <div className="title-box">이벤트 기간</div>
                        <div className="content-box ">
                            <div className="form-container">
                                <div className="datepicker-row"> 
                                    <TextField
                                        size='small'
                                        type='date'
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                    <span>~</span>
                                    <TextField
                                        size='small'
                                        type='date'
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 6 - 이벤트 푸터 */}
                    <div className="info-container">
                        <div className="title-box">이벤트 푸터</div>
                        <div className="content-box ">
                            <div className="form-container">
                                <div className="datepicker-row"> 
                                    <Select
                                        value={eventFooter}
                                        onChange={(e) => setEventFooter(e.target.value)}
                                        displayEmpty
                                        sx={{ height: "36px", width: "200px" }}
                                    >
                                        <MenuItem key={"option.value"} value={"option.value"}>
                                            옵션 선택
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
                                onClick={() => document.getElementById('imageUploadInputLanding')?.click()}
                                style={{
                                    cursor: 'pointer',
                                    backgroundImage: `url(${selectedDetailImage ? URL.createObjectURL(selectedDetailImage) : ImgContainer})`
                                }}
                            >
                                {selectedDetailImage && (
                                    <img
                                        alt="Landing"
                                        src={URL.createObjectURL(selectedDetailImage)}
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
                                id="imageUploadInputLanding"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleDetailUpload} // 이벤트 핸들러 연결
                            />
                        </div>
                    </div>
                </div>
                <div className="right-area">
                    {/* 병원 소개 */}
                    <div className="info-container">
                        <div className="preview-box">
                            <div className="preview-card">미리보기</div>
                            <div className='btns-row'
                         
                            >
               
                                <Button
                                    variant='contained'
                                    sx={{
                                        backgroundColor:appColor1,
                                        width:"160px",
                                        ":hover":{
                                            backgroundColor:appColor1,
                                            width:"160px",  
                                        }
                                    }}
                                    onClick={onEventCreate}
                                >이벤트 생성</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
