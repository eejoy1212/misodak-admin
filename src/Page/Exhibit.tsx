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
import { GrClose, GrDocumentCsv } from "react-icons/gr";
import './Hospital.css';
import { MainSearchBar } from '../Component/MainSearchBar';
import { deleteHospital, getDepHospital, getHospital, putActivateHospital, putEditHospital } from '../api/hospital';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { GiNightSleep, GiSun } from "react-icons/gi";
import { searchHospitals } from '../api/hospital';
import DaumPostcode from 'react-daum-postcode';
import { departmentOptions, parseAddress } from '../const/const';
import { getEvents } from '../api/event';
import { deleteExhibit, getExhibits, putActivateExhibit, searchGetExhibits } from '../api/exhibit';
import moment from 'moment';
import { ExhibitRegister } from './ExhibitRegister';

// 병원 데이터 타입 정의
interface Exhibit {
  id: number;
  name:string;
  startTime:string;
  endTime:string;
  hospitalDutyName:string;
  hospitalDutyAddr:string;
  eventIds:[];
  status:string;
  exposureLocation:string;
  activated:boolean;
  thumbnail:string;
  detail:string;
}

export interface ExhibitProps { }
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

export function Exhibit(props: ExhibitProps) {
    const headerColor = "#F0FBEB";
    const headerTxtColor = "#333333";
    const [exhibits, setExhibits] = useState<Exhibit[]>([]);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
 const [openAddDialog,setOpenAddDialog]=useState(false)
    const [editingExhibit, setEditingExhibit] = useState<Exhibit | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const fetchUrls = async () => {
    
    const res = await getExhibits(page);
    console.log("기획전 조회>>>",res)
    setExhibits(res);

  };
  const fetchSearchExhibit = async (keyword: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeOut=setTimeout(async()=>{
      await searchGetExhibits(page,keyword)
      .then(res=>setExhibits(res))
      .catch(err=>console.log("기획전 검색 오류:",err))
    },1000)
    setSearchTimeout(timeOut);
  };
  const onClickNext = async () => {
    const nextPage = page + 1;
    
    // 다음 페이지 데이터를 가져와서 확인
    const res = await getExhibits(nextPage);

    // 다음 페이지 데이터가 없으면 페이지를 증가시키지 않음
    if (res.length > 0) {
        setExhibits(res);
        setPage(nextPage);
    } else {
        console.log("더 이상 페이지가 없습니다.");
    }
};
const handleDelete = async (id: number, exhibitName: string) => {
  const res = window.confirm(`${exhibitName}을 삭제 하시겠습니까?`);
  if (res) {
    await deleteExhibit(id);
    fetchUrls();
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
  
  const onSearch = (e: any) => {
 const keyword=e.target.value
      fetchSearchExhibit(keyword);
  };
  const handleInActivate = async (id: number, nowActivate: boolean) => {
    const res = window.confirm(`${nowActivate === true ? "비활성" : "활성"} 하시겠습니까?`);
    if (res) {
      await putActivateExhibit(id);
      fetchUrls();
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingExhibit(null);
    fetchUrls();
  };

  return (
    <div className="hospital-container">
      {/* 기획전 추가 다이얼로그 */}
      <Dialog open={openAddDialog}
      fullScreen
      >
        <DialogTitle
        sx={{
          display:"flex",
          flexDirection:"row",
          alignItems:"center",
          justifyContent:"space-between"
        }}
        >
          <span>기획전 추가</span>
          <IconButton
          onClick={()=>{
            setOpenAddDialog(false)
          }
          }
          ><GrClose/></IconButton>
          </DialogTitle>
        <DialogContent>
          <ExhibitRegister/>
        </DialogContent>
      </Dialog>
      <Typography fontSize={"18px"}>기획전 - 관리</Typography>
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
          <MainSearchBar placeholder='기획전명,이벤트명,도시,지역' onSearch={onSearch} />
          <Button
              variant='contained'
              sx={{
                width:"200px",
                backgroundColor: "#14AC2B",
                ":hover": {
                  backgroundColor: "#14AC2B"
                }
              }}
              onClick={()=>{
                setOpenAddDialog(true)
              }}
            >기획전 추가</Button>

          </div>
          
          <TableContainer
            component={Paper}
            variant='outlined'
            sx={{ borderTop: "1px solid #14AC2B", maxHeight: 600 }}
          >
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }}>기획전명</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">기간</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">상담참여</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">클릭수</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">귀속이벤트</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">Status</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">노출위치</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">수정</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">활성/비활성</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exhibits.map((exhibit, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: headerTxtColor }}>{exhibit.name}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{`${moment(exhibit.startTime).format("YYYY-MM-DD")} ~ ${moment(exhibit.endTime).format("YYYY-MM-DD")}`}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{`상담참여`}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{'클릭수'}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{`${exhibit.eventIds?exhibit.eventIds.length:0} 개`}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{exhibit.status?"진행 중":"만료"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{exhibit.exposureLocation??"-"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center"><IconButton
                      onClick={() => {}}
                    ><FaPencilAlt /></IconButton></TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center"><IconButton
                    onClick={() => handleInActivate(exhibit.id,exhibit.activated)}
                    >
                    {exhibit.activated===true?  <GiNightSleep />:
                    <GiSun
                    color='#14AC2B'
                    />}
                    </IconButton></TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">
                      <IconButton
                        onClick={() => {
                          handleDelete(exhibit.id,exhibit.name)
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
                borderColor: "#14AC2B",
                color: "#14AC2B",
                ":hover": {
                  borderColor: "#14AC2B",
                  color: "#14AC2B",
                }
              }}
              onClick={onClickPrev}
            >Prev</Button>
            {page + 1} Page
            <Button
              variant='contained'
              sx={{
                backgroundColor: "#14AC2B",
                ":hover": {
                  backgroundColor: "#14AC2B"
                }
              }}
              onClick={onClickNext}
            >Next</Button>
          </div>
          {/* 수정 다이얼로그 */}
          <Dialog open={false} onClose={()=>{}}>
            <DialogTitle>병원 정보 수정</DialogTitle>
            <DialogContent>
             
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">취소</Button>
              <Button onClick={()=>{}} color="primary">저장</Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
