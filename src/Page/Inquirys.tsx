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
import { GrDocumentCsv } from "react-icons/gr";
import './Hospital.css';
import { MainSearchBar } from '../Component/MainSearchBar';
import { deleteHospital, getDepHospital, getHospital, putActivateHospital, putEditHospital } from '../api/hospital';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { GiNightSleep, GiSun } from "react-icons/gi";
import moment from 'moment';
import { getInquiries, searchGetInquiries } from '../api/inquiry';
import { appColor1, appColor2 } from '../const/const';

interface Inquiry {
  id: number;
  sender:string;
  message:string;
  name:string;
  nickname:string;
  phone:string;
  email:string;
  registerDate:string;
  updateDate:string;
  status:string;
  eventCount:string;
  boardCount:string;
  commnetCount:string;
  activated:boolean;
}

export interface InquiryProps { }
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

export function Inquirys(props: InquiryProps) {
    const headerColor =appColor2;
    const headerTxtColor = "#333333";
    const [inquirys, setInquirys] = useState<Inquiry[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const fetchUrls = async () => {
    const res = await getInquiries(page);
    console.log("문의내역 조회>>>",res)
    setInquirys(res);
  };
  const onClickNext = async () => {
    const nextPage = page + 1;
    
    // 다음 페이지 데이터를 가져와서 확인
    const res = await getInquiries(nextPage);
    // 다음 페이지 데이터가 없으면 페이지를 증가시키지 않음
    if (res.length > 0) {
      setInquirys(res);
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
  useEffect(() => {
    fetchUrls();
  }, [page]);
  const fetchSearchInquiries = async (keyword: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeOut=setTimeout(async()=>{
      await searchGetInquiries(page,keyword)
      .then(res=>setInquirys(res))
      .catch(err=>console.log("앱푸시 검색 오류:",err))
    },1000)
    setSearchTimeout(timeOut);
  };
  const onSearch = (e: any) => {
    const keyword=e.target.value
         fetchSearchInquiries(keyword);
     };
  return (
    <div className="hospital-container">
      <Typography fontSize={"18px"}>1:1 문의내역</Typography>
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingBottom: "0px",
          }}
        >
          <MainSearchBar placeholder='유저명, 문의글' onSearch={onSearch} />
         

          <TableContainer
            component={Paper}
            variant='outlined'
            sx={{ borderTop: `1px solid ${appColor1}`, maxHeight: 600 }}
          >
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }}>작성자</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">문의 글</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">작성일</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">최종수정일</TableCell>
                  {/* <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">활성/비활성</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">삭제</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {inquirys.map((inquiry, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: headerTxtColor }}>{inquiry.sender}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }}>{inquiry.message}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{moment(inquiry.registerDate).format("YY.MM.DD")}</TableCell>
               
                    <TableCell sx={{ color: headerTxtColor }} align="center">
                {moment(inquiry.updateDate).format("YY.MM.DD")}
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
