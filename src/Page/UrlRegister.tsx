import * as React from 'react';
import './UrlRegister.css';
import { RiSearchLine } from "react-icons/ri";
import ImgContainer from '../images/img-container.png';
import { Button, Radio, Dialog, DialogActions, DialogContent, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';
import { postCreateEvent } from '../api/event'; // POST 요청 API 함수
import { appColor1 } from '../const/const';
import { getHospital } from '../api/hospital';

export interface UrlRegisterProps {}

interface Hospital {
    id: number;
    dutyName: string;
}

export function UrlRegister(props: UrlRegisterProps) {
    const [selectedThumbnailImage, setSelectedThumbnailImage] = React.useState<File | null>(null);  // 썸네일 이미지
    const [url, setUrl] = React.useState<string>("");
    const [page, setPage] = React.useState(0);  // 현재 페이지 상태
    const [eventHospital, setEventHospital] = React.useState<string>("");
    const [eventName, setEventName] = React.useState<string>("");  // 이벤트명 상태
    const [startDate, setStartDate] = React.useState<string>("");  // 이벤트 시작일 상태
    const [endDate, setEndDate] = React.useState<string>("");      // 이벤트 종료일 상태
    const [selectedHospital, setSelectedHospital] = React.useState<Hospital | null>(null);  // 선택된 병원
    const [hospitalList, setHospitalList] = React.useState<Hospital[]>([]); // 병원 리스트
    const [openHospitalDialog, setOpenHospitalDialog] = React.useState(false); // 병원 선택 다이얼로그 상태

    // 이미지 업로드 핸들러
    const handleThumbUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedThumbnailImage(event.target.files[0]);
        }
    };

    const onOpenHospitalDialog = async () => {
        await fetchHospital(page);  // 현재 페이지 병원 데이터 가져오기
        setOpenHospitalDialog(true);
    };

    // 이벤트 생성 API 호출
    const onEventCreate = async () => {
        try {
            // FormData 생성 및 값 추가
            const formData = new FormData();
            if (selectedThumbnailImage) {
                formData.append('image', selectedThumbnailImage);  // 이미지 추가
            }
            const eventData = {
                hospitalId: selectedHospital?.id || 0,  // 선택된 병원의 ID
                eventName: eventName,                  // 이벤트명
                eventCost: "10000",                    // 이벤트 비용 (샘플 값)
                eventDescription: "이벤트 설명",        // 이벤트 설명 (샘플 값)
                startAt: `${startDate}T00:00:00Z`,     // 이벤트 시작일
                endAt: `${endDate}T23:59:59Z`          // 이벤트 종료일
            };

            formData.append('data', JSON.stringify(eventData)); // 이벤트 데이터를 JSON 문자열로 추가

            // 이벤트 생성 POST 요청
            const response = await postCreateEvent(formData);  // FormData를 사용해 POST 요청
       console.log('이벤트 생성 성공:', response);     
        } catch (error) {
            console.error('이벤트 생성 실패:', error);
        }
    };

    // 병원 데이터 가져오기
    const fetchHospital = async (page: number) => {
        const res = await getHospital(page);  // 병원 데이터를 페이지로 가져옴
        setHospitalList(res);  // 병원 리스트 상태 업데이트
    };

    // 다음 페이지 버튼 핸들러
    const handleNextPage = async () => {
        const newPage = page + 1;
        setPage(newPage);  // 페이지 증가
        await fetchHospital(newPage);  // 다음 페이지 데이터 가져오기
    };

    // 이전 페이지 버튼 핸들러
    const handlePreviousPage = async () => {
        if (page > 0) {
            const newPage = page - 1;
            setPage(newPage);  // 페이지 감소
            await fetchHospital(newPage);  // 이전 페이지 데이터 가져오기
        }
    };

    return (
        <div className='url-reg-container'>
            {/* 병원검색하는 다이얼로그 */}
            <Dialog open={openHospitalDialog} onClose={() => setOpenHospitalDialog(false)} maxWidth="xs" fullWidth>
                <DialogContent>
                    <Typography variant="h6" gutterBottom>
                        병원 선택
                    </Typography>
                    <List>
                        {hospitalList.map((hospital) => (
                            <ListItem key={hospital.id} disableGutters>
                                <Radio
                                    checked={selectedHospital?.id === hospital.id}
                                    onChange={() => setSelectedHospital(hospital)}  // 병원 선택
                                    value={hospital.dutyName}
                                    color="primary"
                                />
                                <ListItemText primary={hospital.dutyName} />
                            </ListItem>
                        ))}
                    </List>

                    {/* 이전 페이지, 다음 페이지 버튼 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <Button 
                            variant="outlined" 
                            onClick={handlePreviousPage} 
                            disabled={page === 0} // 첫 페이지에서는 이전 페이지 버튼 비활성화
                        >
                            이전 페이지
                        </Button>
                        <Button variant="contained" onClick={handleNextPage}>
                            다음 페이지
                        </Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenHospitalDialog(false)} color="primary">
                        닫기
                    </Button>
                    <Button
                        onClick={() => {
                            if (selectedHospital) {
                                setEventHospital(selectedHospital.dutyName); // 선택한 병원 이름을 eventHospital에 설정
                            }
                            setOpenHospitalDialog(false);
                        }}
                        color="primary"
                        variant="contained"
                    >
                        선택 완료
                    </Button>
                </DialogActions>
            </Dialog>

            {/* URL 생성 텍스트필드 */}
            <div className="url-create-row" style={{ marginTop: "10px" }}>
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
                                onChange={handleThumbUpload} // 이미지 업로드 핸들러 연결
                            />
                        </div>
                    </div>

                    {/* 3 - 이벤트 병원 */}
                    <div className="info-container">
                        <div className="title-box">이벤트 병원</div>
                        <div className="content-box ">
                            <div className="form-container">
                                <Button
                                    variant='contained'
                                    sx={{
                                        backgroundColor: appColor1,
                                        width: "160px",
                                        ":hover": {
                                            backgroundColor: appColor1,
                                            width: "160px",
                                        }
                                    }}
                                    onClick={onOpenHospitalDialog}
                                >
                                    병원 검색
                                </Button>
                                <Typography variant="body1" sx={{ marginTop: "10px" }}>
                                    {selectedHospital ? `선택된 병원: ${selectedHospital.dutyName}` : "선택된 병원이 없습니다"}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    {/* 4 - 이벤트 명 */}
                    <div className="info-container">
                        <div className="title-box">이벤트 명</div>
                        <div className="content-box ">
                            <div className="form-container">
                                <TextField
                                    label="이벤트 명"
                                    fullWidth
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}  // 이벤트명 입력
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
                                        onChange={(e) => setStartDate(e.target.value)}  // 시작일 설정
                                    />
                                    <span>~</span>
                                    <TextField
                                        size='small'
                                        type='date'
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}  // 종료일 설정
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right-area">
                    {/* 미리보기 및 버튼 */}
                    <div className="info-container">
                        <div className="preview-box">
                            <div className="preview-card">미리보기</div>
                            <div className='btns-row'>
                                <Button
                                    variant='outlined'
                                    sx={{
                                        width: "160px",
                                        borderColor: "black",
                                        color: "black",
                                        ":hover": {
                                            width: "160px",
                                            borderColor: "black",
                                            color: "black",
                                        }
                                    }}
                                >
                                    취소
                                </Button>
                                <Button
                                    variant='contained'
                                    sx={{
                                        backgroundColor: appColor1,
                                        width: "160px",
                                        ":hover": {
                                            backgroundColor: appColor1,
                                            width: "160px",
                                        }
                                    }}
                                    onClick={onEventCreate}
                                >
                                    이벤트 생성
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
