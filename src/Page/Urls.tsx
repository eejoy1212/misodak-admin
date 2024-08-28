import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  MenuItem,
  Select,
  Switch,
  Typography,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Chip,
  Box
} from '@mui/material';
import { BiSolidHide } from "react-icons/bi";
import { GrClose, GrDocumentCsv } from "react-icons/gr";
import './Hospital.css';
import { MainSearchBar } from '../Component/MainSearchBar';
import { deleteHospital, getDepHospital, getHospital, putActivateHospital, putEditHospital } from '../api/hospital';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { GiNightSleep, GiSun } from "react-icons/gi";
import { searchHospitals } from '../api/hospital';
import DaumPostcode from 'react-daum-postcode';
import { appColor1, appColor2, departmentOptions, parseAddress } from '../const/const';
import { deleteUrl, downloadCsvGetEvent, getEvents, putActivateEvent, putVisibleEvent, searchGetEvents } from '../api/event';
import moment from 'moment';
import { UrlRegister } from './UrlRegister';
import { UrlEdit } from './UrlEdit';

interface Urls {
  id: number;
  eventName:string;
  startAt:string;
  endAt:string;
  hospitalDutyName:string;
  hospitalDutyDivName:string;
  hospitalDutyAddr:string;
  activated:boolean;
}

export interface UrlsProps { }
export interface SwitchProps { }


const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#FFCC00' : '#FFCC00',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export function Urls(props: UrlsProps) {
    const headerColor = appColor2;
    const headerTxtColor = "#333333";
    const [urls, setUrls] = useState<Urls[]>([]);
  const [page, setPage] = useState(0);
  const [openCreate,setOpenCreate]=useState(false)
  const [openEdit,setOpenEdit]=useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editing,setEditing]=useState(null)
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const onOpenCreateDialog=()=>{
    setOpenCreate(true)
  }
  const onCloseCreateDialog=()=>{
    setOpenCreate(false)
  }
  const onOpenEditDialog=(editing:any)=>{
    setEditing(editing)
    setOpenEdit(true)
  }
  const onCloseEditDialog=()=>{
    setOpenEdit(false)
  }
  const fetchUrls = async () => {
    try {
       const res = await getEvents(page);
    console.log("이벤트 조회>>>",res)
    setUrls(res);
    return res.length
    } catch (error) {
      return 0
    }
   
  };

  useEffect(() => {
    fetchUrls();
  }, [page]);
  const fetchSearchEvents = async (keyword: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeOut=setTimeout(async()=>{
      await searchGetEvents(page,keyword)
      .then(res=>setUrls(res))
      .catch(err=>console.log("이벤트 검색 오류:",err))
    },1000)
    setSearchTimeout(timeOut);
  };
  const onSearch = (e: any) => {
    const keyword=e.target.value
         fetchSearchEvents(keyword);
     };
     const fetchDownloadCsv = async () => {
      try {
        const response = await downloadCsvGetEvent();
        console.log("Response headers>>>", response.headers);
    
        // 응답 헤더에서 파일 이름 가져오기
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'download.csv';
    
        if (contentDisposition) {
          // filename*="UTF-8''file.csv"와 같은 형식으로 오는 경우 처리
          const utf8FileNameMatch = contentDisposition.match(/filename\*=(?:UTF-8'')?([^;]+)/);
          if (utf8FileNameMatch && utf8FileNameMatch[1]) {
            fileName = decodeURIComponent(utf8FileNameMatch[1].replace(/"/g, ''));
          } else {
            // filename="file.csv"와 같은 형식으로 오는 경우 처리
            const fileNameMatch = contentDisposition.match(/filename="(.+?)"/);
            if (fileNameMatch && fileNameMatch[1]) {
              fileName = fileNameMatch[1];
            }
          }
        }
    
        console.log("Final file name>>>", fileName);
    
        // Blob 생성 및 파일 다운로드
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('CSV 다운로드 중 오류가 발생했습니다:', error);
      }
    };
    const handleDelete = async (id: number, name: string) => {
      const res = window.confirm(`${name}을 삭제 하시겠습니까?`);
      if (res) {
        await deleteUrl(id);
        fetchUrls();
      }
    };
    const handleInActivate = async (id: number, nowActivate: boolean) => {
      const res = window.confirm(`${nowActivate === true ? "비활성" : "활성"} 하시겠습니까?`);
      if (res) {
        await putActivateEvent(id);
        fetchUrls();
      }
    };
    const handleVisible = async (id: number, name: string) => {
      const res = window.confirm(`${name}를 숨김 처리 하시겠습니까?`);
      if (res) {
        await putVisibleEvent(id);
        fetchUrls();
      }
    };
    const onClickNext = async () => {
      const nextPage = page + 1;
      
      // 다음 페이지 데이터를 가져와서 확인
      const res = await getEvents(nextPage);
      // 다음 페이지 데이터가 없으면 페이지를 증가시키지 않음
      if (res.length > 0) {
          setUrls(res);
          setPage(nextPage);
      } else {
          console.log("더 이상 페이지가 없습니다.");
      }
  };
  const onClickPrev = async () => {
    if (page > 0) {
      setPage((p) => p - 1);
    }
  };
  return (
    <div className="hospital-container">
      {/* url 생성 다이얼로그 */}
      <Dialog
      fullScreen
      open={openCreate}
    
      >
        <DialogTitle
        sx={{
          display:"flex",
          alignItems:"center",
          justifyContent:"space-between",
          height:"30px",
        }}
        >
          <span>URL 생성</span>
          <IconButton
          onClick={onCloseCreateDialog}
          ><GrClose/></IconButton>
        </DialogTitle>
        <DialogContent>
          <UrlRegister/>
        </DialogContent>
      </Dialog>
      {/* url 수정 다이얼로그 */}
      <Dialog
      fullScreen
      open={openEdit}
    
      >
        <DialogTitle
        sx={{
          display:"flex",
          alignItems:"center",
          justifyContent:"space-between",
          height:"30px",
        }}
        >
          <span>URL 수정</span>
          <IconButton
          onClick={onCloseEditDialog}
          ><GrClose/></IconButton>
        </DialogTitle>
        <DialogContent>
          <UrlEdit editing={editing}/>
        </DialogContent>
      </Dialog>
      <Typography fontSize={"18px"}>이벤트정보 - 조회</Typography>
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingBottom: "0px",
          }}
        >
                  
          <MainSearchBar placeholder='이벤트명,병원명,도시,지역' onSearch={onSearch} />
          <div className="filter-row">
          <Button
              variant='contained'
              sx={{height:"36px",
                width:"200px",
                backgroundColor: appColor1,
                ":hover": {
                  backgroundColor: appColor1
                }
              }}
              onClick={onOpenCreateDialog}
            >URL 생성</Button> <Button
            variant='contained'
            sx={{height:"36px",
              width:"200px",
              backgroundColor: appColor1,
              ":hover": {
                backgroundColor: appColor1
              }
            }}
            onClick={fetchDownloadCsv}
          >
            {/* <GrDocumentCsv size={25}/> */}
          <span>CSV 전체 다운로드</span>
          </Button>
          </div>

          <TableContainer
            component={Paper}
            variant='outlined'
            sx={{ borderTop: `1px solid ${appColor1}`, maxHeight: 600 }}
          >
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }}>이벤트명</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">기간</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">상담참여</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">병원명</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">도시</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">지역</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">진료과</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">CSV</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">수정</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">활성/비활성</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">숨김</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {urls.map((url, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: headerTxtColor }}>{url.eventName}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{`${moment(url.startAt).format("YYYY-MM-DD")} ~ ${moment(url.endAt).format("YYYY-MM-DD")}`}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{`상담참여`}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{url.hospitalDutyName??"-"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{parseAddress(url.hospitalDutyAddr)?.city}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{parseAddress(url.hospitalDutyAddr)?.region}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{url.hospitalDutyDivName}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">
                    <IconButton
                      onClick={() => {}}
                    ><GrDocumentCsv /></IconButton>
                    </TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center"><IconButton
                      onClick={()=>{onOpenEditDialog(url)}}
                    ><FaPencilAlt /></IconButton></TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center"><IconButton
                      onClick={() => {

                        handleInActivate(url.id,url.activated)
                      }}
                    >
                    {url.activated===true?  <GiNightSleep />:
                    <GiSun
                    color={appColor1}
                    />}
                    </IconButton></TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">
                      <IconButton
                        onClick={() => {
                          handleVisible(url.id,url.eventName)
                        }}
                      ><BiSolidHide /></IconButton>
                    </TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">
                      <IconButton
                        onClick={() => {handleDelete(url.id,url.eventName)}}
                      ><FaTrashAlt /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="custom-pagenation-row">
            <Button
              variant='outlined'
              sx={{
                borderColor: appColor1,
                color: appColor1,
                ":hover": {
                  borderColor: appColor1,
                  color: appColor1,
                }
              }}
              onClick={onClickPrev}
            >Prev</Button>
            {page + 1} Page
            <Button
              variant='contained'
              sx={{
                backgroundColor: appColor1,
                ":hover": {
                  backgroundColor: appColor1
                }
              }}
              onClick={onClickNext}
            >Next</Button>
          </div>
          {/* 수정 다이얼로그 */}
          {/* <Dialog open={false} onClose={()=>{}}>
            <DialogTitle>병원 정보 수정</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="병원명"
                fullWidth
                value={ ''}
                onChange={(e) => setEditingHospital({ ...editingHospital!, dutyName: e.target.value })}
              />
              <TextField
                margin="dense"
                label="주소"
                fullWidth
                value={editingHospital?.dutyAddr || ''}
                onChange={(e) => setEditingHospital({ ...editingHospital!, dutyAddr: e.target.value })}
                onClick={() => setOpenPostcode(true)}
              />
              <TextField
                margin="dense"
                label="진료과"
                fullWidth
                value={editingHospital?.dutyDivNam || ''}
                onChange={(e) => setEditingHospital({ ...editingHospital!, dutyDivNam: e.target.value })}
              />
              <TextField
                margin="dense"
                label="태그"
                fullWidth
                value={editingHospital?.tags || ''}
                onChange={(e) => setEditingHospital({ ...editingHospital!, tags: e.target.value })}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
                {(editingHospital&&editingHospital.tags)&&editingHospital?.tags.split(',').map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag.trim()}
                    onDelete={() => handleDeleteTag(tag.trim())}
                    color="primary"
                  />
                ))}
              </Box>
              {openPostcode && (
                <Dialog open={openPostcode} onClose={() => setOpenPostcode(false)}>
                  <DialogTitle>주소 검색</DialogTitle>
                  <DialogContent>
                    <DaumPostcode onComplete={handleCompletePostcode} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenPostcode(false)} color="primary">닫기</Button>
                  </DialogActions>
                </Dialog>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">취소</Button>
              <Button onClick={handleSave} color="primary">저장</Button>
            </DialogActions>
          </Dialog> */}
        </CardContent>
      </Card>
    </div>
  );
}
