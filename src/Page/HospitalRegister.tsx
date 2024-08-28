import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
  TextareaAutosize,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import DaumPostcode from 'react-daum-postcode';
import './HospitalRegister.css';
import { HospitalRegisterTxtfield } from '../Component/HospitalRegisterTxtfield';
import ImgContainer from '../images/img-container.png';
import { appColor1, departmentOptions } from '../const/const';
import { postRegisterHospital } from '../api/hospital';

export interface IHospitalRegisterProps {}

export function HospitalRegister(props: IHospitalRegisterProps) {
    // 상태 변수들 선언
    const [selectedDutyDivNam, setSelectedDutyDivNam] = useState(departmentOptions[1].value);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [dutyName, setDutyName] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [dutyAddr, setDutyAddr] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [mediaScript, setMediaScript] = useState<string>("");
    const [introduction, setIntroduction] = useState<string>("");
    const [event, setEvent] = useState<string>("");
    const [likes, setLikes] = useState<string>("");
    const [openPostcode, setOpenPostcode] = useState<boolean>(false); // DaumPostcode 다이얼로그 상태 관리

    // 상태 변경 함수들
    const handleDepartmentChange = (event: SelectChangeEvent) => {
        setSelectedDutyDivNam(event.target.value as string);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        const inputElement = document.getElementById('imageUploadInput') as HTMLInputElement;
        if (inputElement) {
            inputElement.click();
        }
    };

    const handleCompletePostcode = (data: any) => {
        const fullAddress = data.address;
        const regionData = data.sido + " " + data.sigungu;

        setDutyAddr(fullAddress);
        setCity(data.sido);
        setDistrict(data.sigungu);
        setOpenPostcode(false);
    };

    const handleRegister = async() => {
        // 입력된 모든 정보 콘솔에 출력
        const infos={
            dutyName,
            city,
            location:district,
            dutyAddr,
            dutyDivNam:selectedDutyDivNam,
            tags,
            dutyInf:introduction, 
            rnum:likes,
            // mediaScript,
           
            // event,
            
            // selectedImage,
        }
         console.log(infos); 
          const res=window.confirm(`${dutyName}을(를) 등록하시겠습니까?`)
     if (res) {
        await postRegisterHospital(infos.dutyName,infos.city,infos.location,infos.dutyAddr,infos.dutyDivNam,infos.tags,infos.dutyInf,infos.rnum)
        window.location.reload()
     }
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
                    <div className="info-contents">
                        <div className="left-area">
                            {/* 1 - 병원 이미지 업로드 */}
                            <div className="info-container">
                                <div className="title-box first-title">병원 이미지</div>
                                <div className="content-box ">
                                    <div
                                        className="photo-container first-container"
                                        onClick={handleImageClick}
                                        style={{ cursor: 'pointer', backgroundImage: `url(${selectedImage ? null : ImgContainer})` }}
                                    >
                                       {selectedImage&& <img    
                                            alt="Hospital"
                                            src={selectedImage}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: "100%"
                                            }}
                                        />}
                                    </div>
                                    <input
                                        id="imageUploadInput"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            </div>
                            {/* 2 - 병원명 및 도시 */}
                            <div className="info-container">
                                <div className="title-box">
                                    <span>병원명</span>
                                    <span>도시</span>
                                </div>
                                <div className="content-box">
                                    <div className="form-container">
                                        <HospitalRegisterTxtfield
                                            value={dutyName}
                                            onChange={(e) => setDutyName(e.target.value)}
                                        />
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "flex-end"
                                            }}
                                        >
                                            <HospitalRegisterTxtfield
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                            <Typography fontSize={"16px"} marginBottom={"8px"} marginLeft={"8px"}>시,군</Typography>
                                        </div>
                                        <HospitalRegisterTxtfield
                                            value={district}
                                            onChange={(e) => setDistrict(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* 3 - 지역구 및 주소 */}
                            <div className="info-container">
                                <div className="title-box">
                                    <span>지역구</span>
                                    <span>주소</span>
                                </div>
                                <div className="content-box">
                                    <div className="form-container">
                                        <HospitalRegisterTxtfield
                                            value={district}
                                            onChange={(e) => setDistrict(e.target.value)}
                                        />
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
                                                onClick={() => setOpenPostcode(true)} // DaumPostcode 다이얼로그 열기
                                            >
                                                지역검색
                                            </Button>
                                            <HospitalRegisterTxtfield
                                                value={dutyAddr}
                                                onChange={(e) => setDutyAddr(e.target.value)}
                                            />
                                        </div>
                                        <HospitalRegisterTxtfield
                                            value={dutyAddr}
                                            onChange={(e) => setDutyAddr(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* 4 - 진료과 */}
                            <div className="info-container">
                                <div className="title-box">
                                    <span>진료과</span>
                                </div>
                                <div className="content-box">
                                    <div className="form-container">
                                        <Select
                                            value={selectedDutyDivNam}
                                            onChange={handleDepartmentChange}
                                            displayEmpty
                                            sx={{ height: "36px", width: "200px" }}
                                        >
                                            {departmentOptions.filter(dep => dep.value !== "ALL").map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            {/* 5 - 검색태그 */}
                            <div className="info-container">
                                <div className="title-box">
                                    <span>검색태그</span>
                                </div>
                                <div className="content-box">
                                    <div className="form-container">
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <HospitalRegisterTxtfield
                                                value={tags}
                                                onChange={(e) => setTags(e.target.value)}
                                            />
                                            <span
                                                style={{
                                                    color: "#999999",
                                                    fontWeight: 500,
                                                    fontSize: "12px"
                                                }}
                                            >
                                                ','로 새로운 태그를 입력
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 6 - 병원에 대한 매체 스크립트 */}
                            <div className="info-container">
                                <div className="title-box">
                                    <span>병원에 대한</span>
                                    <span>매체 스크립트</span>
                                </div>
                                <div className="content-box">
                                    <div className="form-container">
                                        <TextareaAutosize
                                            style={{
                                                resize: "none",
                                                width: "300px"
                                            }}
                                            minRows={10}
                                            maxRows={10}
                                            value={mediaScript}
                                            onChange={(e) => setMediaScript(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-area">
                            {/* right-1 - 병원 소개 */}
                            <div className="info-container">
                                <div className="title-box first-title">병원 소개</div>
                                <div className="content-box">
                                    <div className="form-container">
                                        <TextareaAutosize
                                            style={{
                                                resize: "none",
                                                width: "100%"
                                            }}
                                            minRows={36}
                                            maxRows={36}
                                            value={introduction}
                                            onChange={(e) => setIntroduction(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* right-2 - 이벤트 */}
                            <div className="info-container">
                                <div className="title-box first-title">이벤트</div>
                                <div className="content-box">
                                    <div className="form-container">
                                        <HospitalRegisterTxtfield
                                            value={event}
                                            onChange={(e) => setEvent(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* right-3 - 좋아요 */}
                            <div className="info-container">
                                <div className="title-box first-title">좋아요</div>
                                <div className="content-box">
                                    <div className="form-container">
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: "10px"
                                            }}
                                        >
                                            <HospitalRegisterTxtfield
                                                value={likes}
                                                onChange={(e) => setLikes(e.target.value)}
                                            />개
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 정보등록 버튼 */}
                            <div className='btn-container'>
                                <Button
                                    variant='contained'
                                    sx={{
                                        marginTop: "20px",
                                        width: "160px",
                                        backgroundColor: appColor1
                                    }}
                                    onClick={handleRegister} // 정보 등록 함수 호출
                                >
                                    정보등록
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* DaumPostcode 다이얼로그 */}
            <Dialog open={openPostcode} onClose={() => setOpenPostcode(false)}>
                <DialogTitle>지역 검색</DialogTitle>
                <DialogContent>
                    <DaumPostcode onComplete={handleCompletePostcode} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPostcode(false)} color="primary">닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
