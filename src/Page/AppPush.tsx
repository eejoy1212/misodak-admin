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
  Box,
  CircularProgress
} from '@mui/material';
import { GrClose, GrDocumentCsv } from "react-icons/gr";
import './Hospital.css';
import { MainSearchBar } from '../Component/MainSearchBar';
import { deleteHospital, getDepHospital, getHospital, putActivateHospital, putEditHospital } from '../api/hospital';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { GiNightSleep, GiSun } from "react-icons/gi";
import { searchHospitals } from '../api/hospital';
import DaumPostcode from 'react-daum-postcode';
import { appColor1, appColor2, departmentOptions, parseAddress } from '../const/const';
import { getEvents } from '../api/event';
import { deleteAppPush, getAppPushs, putActivateAppPush, putSendAppPush, searchGetAppPushs } from '../api/apppush';
import { AppPushCreate } from './AppPushCreate';
import { AppPushEdit } from './AppPushEdit';
import { RiMailSendFill } from 'react-icons/ri';
import { MdCheckCircle } from 'react-icons/md';

export interface AppPush {
  id: number;
  campaignName:string;
status:string;
ctr:string;
activated:boolean;
sendAt:string;
segment:string;
city:string;
location:string;
filter:string;
title:string;
body:string;
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

export function AppPushs(props: UrlsProps) {
    const headerColor = appColor2;
    const headerTxtColor = "#333333";
    const [urls, setUrls] = useState<AppPush[]>([]);
  const [page, setPage] = useState(0);
  const [editingAppPush,setEditingAppPush]=useState<AppPush|null>(null)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAddDialog,setOpenAddDialog]=useState(false)
  const [openEditDialog,setOpenEditDialog]=useState(false)
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const fetchUrls = async () => {
    const res = await getAppPushs(page);
    console.log("앱푸시 조회>>>",res)
    setUrls(res);
  };

  useEffect(() => {
    fetchUrls();
  }, [page]);
  useEffect(() => {
    if (!openAddDialog) {
    fetchUrls();
      
    }
  }, [openAddDialog]);
  const onCloseAdd=()=>{
    setOpenAddDialog(false)
  }
  const onCloseEdit=()=>{
    setOpenEditDialog(false)
  }
  const onClickNext = async () => {
    const nextPage = page + 1;
    
    // 다음 페이지 데이터를 가져와서 확인
    const res = await getAppPushs(nextPage);

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
const handleDelete = async (id: number, name: string) => {
  const res = window.confirm(`${name}을 삭제 하시겠습니까?`);
  if (res) {
    await deleteAppPush(id);
    fetchUrls();
  }
};
const handleInActivate = async (id: number, nowActivate: boolean) => {
  const res = window.confirm(`${nowActivate === true ? "비활성" : "활성"} 하시겠습니까?`);
  if (res) {
    await putActivateAppPush(id);
    fetchUrls();
  }
};
const fetchSearchExhibit = async (keyword: string) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  const timeOut=setTimeout(async()=>{
    await searchGetAppPushs(page,keyword)
    .then(res=>setUrls(res))
    .catch(err=>console.log("앱푸시 검색 오류:",err))
  },1000)
  setSearchTimeout(timeOut);
};
const onSearch = (e: any) => {
  const keyword=e.target.value
       fetchSearchExhibit(keyword);
   };
   const onSendAppPush=async(id:number)=>{
    const res=window.confirm("발송하시겠습니까? ")
    if (res) {
        await  putSendAppPush(id)
        fetchUrls()
    }else{

    }

   }
  return (
    <div className="hospital-container">
      {/* 앱푸시 생성 다이얼로그 */}
      <Dialog open={openAddDialog}
      onClose={onCloseAdd}
      maxWidth="md"
      >
        <DialogTitle
        sx={{
          display:"flex",
          alignItems:"center",justifyContent:"space-between"
        }}
        >
          <span>앱푸시 생성</span>
          <IconButton
          onClick={()=>{
            setOpenAddDialog(false)
          }}
          ><GrClose/></IconButton>
        </DialogTitle>
<DialogContent>
<AppPushCreate onClose={onCloseAdd}/>

</DialogContent>

      </Dialog>

      <Typography fontSize={"18px"}>앱푸시 - 관리</Typography>
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingBottom: "0px",
          }}
        >
          <div className="exhibit-search-row">
          <MainSearchBar placeholder='캠페인명,도시,지역' onSearch={onSearch} />
          <Button
              variant='contained'
              sx={{
                width:"200px",
                backgroundColor: appColor1,
                ":hover": {
                  backgroundColor: appColor1
                }
              }}
              onClick={()=>{
                setOpenAddDialog(true)
              }}
            >앱푸시 생성</Button>
          </div>
         
          {/* <div className="filter-row">
            <Typography fontSize={"16px"}>진료과</Typography>
            <Select
              value={""}
              onChange={()=>{}}
              displayEmpty
              sx={{ height: "36px", width: "200px" }}
            >
              {departmentOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <Typography fontSize={"16px"}>이벤트 히스토리</Typography>
            <IOSSwitch />
          </div> */}

          <TableContainer
            component={Paper}
            variant='outlined'
            sx={{ borderTop: `1px solid ${appColor1}`, maxHeight: 600 }}
          >
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }}>캠페인명</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">대상</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">Status</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">CTR</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">도시</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">지역</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">발송일시</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">완료</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">발송</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">활성/비활성</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {urls.map((url, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: headerTxtColor }}>{url.campaignName}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{url.segment}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{url.status}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{url.ctr+"%"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{url.city}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{url.location}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{url.sendAt??"-"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{'완료'}</TableCell>
                   
                    <TableCell sx={{ color: headerTxtColor }} align="center"><IconButton
                      onClick={() => {
                        onSendAppPush(url.id)  }}
                    >{url.sendAt?<MdCheckCircle/>:<RiMailSendFill 
                    
                    />}</IconButton></TableCell>
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
                          handleDelete(url.id,url.campaignName)
                        }}
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
