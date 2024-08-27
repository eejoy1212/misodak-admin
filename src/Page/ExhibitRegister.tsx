import { Button, TextareaAutosize, TextField } from '@mui/material';
import * as React from 'react';
import ImgContainer from '../images/thumbnail.png';
import './ExhibitRegister.css'
import { HospitalRegisterTxtfield } from '../Component/HospitalRegisterTxtfield';
import { MainSearchBar } from '../Component/MainSearchBar';
import { postAddExhibit } from '../api/exhibit';

export interface IExhibitRegisterProps {}

export function ExhibitRegister(props: IExhibitRegisterProps) {
    const [selectedThumbnailImage, setSelectedThumbnailImage] = React.useState<string>("");
    const [selectedDetailImage, setSelectedDetailImage] = React.useState<string>("");
    const [selectedFileThumbnail, setSelectedFileThumbnail] = React.useState<File | null>(null);
    const [selectedFileDetail, setSelectedFileDetail] = React.useState<File | null>(null);
    const [exhibitName, setExhibitName] = React.useState<string>("");
    const [exhibitDescription, setExhibitDescription] = React.useState<string>("");
    const [exhibitButton, setExhibitButton] = React.useState<string>("");
    const [eventStartDate, setEventStartDate] = React.useState<string>("");
    const [eventEndDate, setEventEndDate] = React.useState<string>("");
    const [exposureLocation, setExposureLocation] = React.useState<string>("");
    const [eventIds, setEventIds] = React.useState<number[]>([]);

    const handleImageThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFileThumbnail(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedThumbnailImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDetailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFileDetail(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedDetailImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit =async () => {
        console.log("이벤트 생성")
        const newExhibit = {
            thumbnail: selectedFileThumbnail ? selectedFileThumbnail.name : "",
            detail: selectedFileDetail ? selectedFileDetail.name : "",
            data: {
                name: exhibitName,
                description: exhibitDescription,
                button: exhibitButton,
                startTime: eventStartDate,
                endTime: eventEndDate,
                place: "place", // 추가 필드 필요시
                exposureLocation: exposureLocation,
                eventIds: eventIds,
            }
        };

        // FormData 객체에 이미지와 JSON 데이터를 함께 담아 전송 준비
        const formData = new FormData();
        if (selectedFileThumbnail) {
            formData.append('thumbnail', selectedFileThumbnail);
        }
        if (selectedFileDetail) {
            formData.append('detail', selectedFileDetail);
        }
        formData.append('data', JSON.stringify(newExhibit.data));
// FormData에 데이터가 추가된 후에 출력
formData.forEach((value, key) => {
    console.log(key, value);
});
       await postAddExhibit(formData)
    };

    return (
        <div className='exhibit-reg-container'>
            <div className="info-contents">
                <div className="left-area">
                    {/* 1. 이미지 등록 */}
                    <div className="info-container">
                        <div className="register-row">
                            {/* 썸네일 등록 */}
                            <div className="thumbnail-reg-col">
                                <div
                                    className="exhibit-photo-container"
                                    onClick={() => document.getElementById('thumbnail-upload')?.click()}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundImage: `url(${selectedThumbnailImage ? null : ImgContainer})`
                                    }}
                                >
                                    {selectedThumbnailImage && (
                                        <img
                                            alt="Thumbnail"
                                            src={selectedThumbnailImage}
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
                                    type="file"
                                    id="thumbnail-upload"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageThumbnailUpload}
                                />
                                <span>썸네일 등록</span>
                            </div>
                            {/* 상세 등록 */}
                            <div className="thumbnail-reg-col">
                                <div
                                    className="exhibit-photo-container"
                                    onClick={() => document.getElementById('detail-upload')?.click()}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundImage: `url(${selectedDetailImage ? null : ImgContainer})`
                                    }}
                                >
                                    {selectedDetailImage && (
                                        <img
                                            alt="Detail"
                                            src={selectedDetailImage}
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
                                    type="file"
                                    id="detail-upload"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageDetailUpload}
                                />
                                <span>상세 등록</span>
                            </div>
                        </div>
                    </div>

                    <div className="space" style={{ height: "100px" }} />

                    {/* 2. 기획전명 */}
                    <div className="info-container">
                        <div className="title-box">기획전 명</div>
                        <div className="content-box ">
                            <div className="form-container">
                                <HospitalRegisterTxtfield
                                    value={exhibitName}
                                    onChange={(e) => setExhibitName(e.target.value)}
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
                                    value={exhibitDescription}
                                    onChange={(e) => setExhibitDescription(e.target.value)}
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
                                    value={exhibitButton}
                                    onChange={(e) => setExhibitButton(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 5. 이벤트 기간 */}
                    <div className="info-container">
                        <div className="title-box">이벤트 명</div>
                        <div className="content-box ">
                            <div className="form-container">
                                <div className="datepicker-row">
                                    <TextField
                                        size='small'
                                        type='date'
                                        value={eventStartDate}
                                        onChange={(e) => setEventStartDate(e.target.value)}
                                    />
                                    <span>~</span>
                                    <TextField
                                        size='small'
                                        type='date'
                                        value={eventEndDate}
                                        onChange={(e) => setEventEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 6. 노출 위치 */}
                    <div className="info-container">
                        <div className="title-box">노출 위치</div>
                        <div className="content-box ">
                            <div className="form-container">
                                <HospitalRegisterTxtfield
                                    value={exposureLocation}
                                    onChange={(e) => setExposureLocation(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 7. 귀속 이벤트 */}
                    <div className="info-container">
                        <div className="title-box">귀속 이벤트</div>
                        <div className="content-box ">
                            <div className="event-row">
                                <MainSearchBar
                                    size='small'
                                    placeholder='이벤트'
                                    onSearch={()=>{}}
                                    // onSearch={(eventId) => setEventIds([...eventIds, eventId])}
                                />
                                <Button
                                    variant='contained'
                                    sx={{
                                        marginLeft: "30px",
                                        backgroundColor: "#31873E",
                                        ":hover": {
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
                                        width: "100%",
                                        height: "200px"
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
                                        width: "100%",
                                        height: "200px"
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
                                        width: "100%",
                                        height: "200px"
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 취소 & 이벤트 생성 버튼 */}
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
                        >취소</Button>
                        <Button
                            variant='contained'
                            sx={{
                                backgroundColor: "#31873E",
                                width: "160px",
                                ":hover": {
                                    backgroundColor: "#31873E",
                                    width: "160px",
                                }
                            }}
                            onClick={handleSubmit}
                        >이벤트 생성</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
