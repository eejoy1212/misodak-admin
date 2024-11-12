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
import './Hospital.css';
import { MainSearchBar } from '../Component/MainSearchBar';
import { deleteHospital, getDepHospital, getHospital, postRegisterHospital, putActivateHospital, putEditHospital } from '../api/hospital';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { GiNightSleep, GiSun } from "react-icons/gi";
import { searchHospitals } from '../api/hospital';
import DaumPostcode from 'react-daum-postcode';
import { appColor1, appColor2, departmentOptions, parseAddress } from '../const/const';

// 병원 데이터 타입 정의
interface Hospital {
  id: number;
  dutyName: string;
  dutyDivNam: string;
  dutyAddr: string;
  city: string;
  region: string;
  department: string;
  location: string;
  tags: string; // tags is now a string
  event: string;
  likes: number;
  rnum: string;
  dutyInf: string;
  activated:boolean;
}

export interface HospitalProps { }
interface SwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props}
  checked={props.checked}
  onChange={props.onChange}
  />
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

export function Hospital(props: HospitalProps) {
  const headerColor = appColor2;
  const headerTxtColor = "#333333";
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [openPostcode, setOpenPostcode] = useState(false);
  const [openAddDialog,setOpenAddDialog]=useState(false)
  const [newHospital,setNewHospital]=useState<Hospital | null>(null);
  const [eventToggle,setEventToggle]=useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [editImage, setEditImage] = useState<File | null>(null);
  const handleEditClick = (hospital: Hospital) => {
    const matchingDiv = departmentOptions.filter(op => op.label === hospital.dutyDivNam)[0].value;
    const formattedHospital = { ...hospital, dutyDivNam: matchingDiv };
    setEditingHospital(formattedHospital);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingHospital(null);
    fetchHospital();
  };
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewHospital(null)
    fetchHospital();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditImage(e.target.files[0]);
    }
  };

  const handleAdd = async () => {
   
    if (newHospital) {
       const formData = new FormData();
        formData.append('image', image as Blob); // 이미지 파일 추가
    formData.append('dutyName', newHospital.dutyName);
    formData.append('city', newHospital.city);
    formData.append('location', newHospital.location);
    formData.append('dutyAddr', newHospital.dutyAddr);
    formData.append('dutyDivNam', newHospital.dutyDivNam);
    formData.append('tags', newHospital.tags);
    formData.append('rnum', newHospital.rnum);
    formData.append('dutyInf', newHospital.dutyInf);

    await postRegisterHospital(formData); // postRegisterHospital 함수가 multipart/form-data 형식 지원하도록 수정 필요
    }
   
    handleCloseAddDialog(); // 다이얼로그 닫기
  };
  const handleSave = async () => {
    if (editingHospital) {
      const formData = new FormData();
      formData.append("image",editImage as Blob)
      formData.append("id", editingHospital.id.toString());
      formData.append("dutyName", editingHospital.dutyName);
      formData.append("city", editingHospital.city);
      formData.append("location", editingHospital.location);
      formData.append("dutyAddr", editingHospital.dutyAddr);
      formData.append("dutyDivNam", editingHospital.dutyDivNam);
      formData.append("tags", editingHospital.tags);
      formData.append("dutyInf", editingHospital.dutyInf);
      await putEditHospital(
      formData
      );
    }
    handleCloseDialog();
  };
  // const handleAdd = async () => {
  //   if (newHospital) {
  //     await postRegisterHospital(
  //       newHospital?.dutyName,
  //       newHospital?.city,
  //       newHospital?.location,
  //       newHospital?.dutyAddr,
  //       newHospital.dutyDivNam,
  //       newHospital.tags,
  //       newHospital?.dutyInf,
  //       newHospital?.rnum
  //     );
  //   }
  //   handleCloseAddDialog();
  // };

  const handleCompletePostcode = (data: any) => {
    const parsedAddress = parseAddress(data.address);
    console.log("parse city region>>>",parsedAddress,data)
    setEditingHospital({
      ...editingHospital!,
      dutyAddr: data.address,
      city: data.sido || '',
      location: data.sigungu || ''
    });
    setOpenPostcode(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(async () => {
      await searchHospitals(value, page)
        .then(res => setHospitals(res))
        .catch(error => console.error("병원 검색 오류:", error));
    }, 1000);

    setSearchTimeout(timeout);
  };

  const fetchHospital = async () => {
    const res = await getHospital(page);
    console.log("병원 조회>>>",res)
    const containEventRes=res.filter((r:any)=>r.events.length>0)
    const notContainEventRes=res.filter((r:any)=>r.events.length===0)
    // if (eventToggle) {
    //     setHospitals(containEventRes);
    // }else{
    //     setHospitals(notContainEventRes);
    // }
    setHospitals(res);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    searchHospitals(searchTerm, page)
      .then(res => setHospitals(res.content))
      .catch(error => console.error("페이지 변경 오류:", error));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0);
    searchHospitals(searchTerm, page)
      .then(res => setHospitals(res.content))
      .catch(error => console.error("페이지 크기 변경 오류:", error));
  };

  const handleInActivate = async (id: number, nowActivate: boolean) => {
    const res = window.confirm(`${nowActivate === true ? "비활성" : "활성"} 하시겠습니까?`);
    if (res) {
      await putActivateHospital(id);
      fetchHospital();
    }
  };

  const handleDelete = async (id: number, hospitalName: string) => {
    const res = window.confirm(`${hospitalName}을 삭제 하시겠습니까?`);
    if (res) {
      await deleteHospital(id);
      fetchHospital();
    }
  };

  const fetchDepHospital = async (category: string) => {
    const res = await getDepHospital(category);
    setHospitals(res.content);
  };

  const onChangeDep = (e: any) => {
    const category: string = e.target.value;
    if (category === "ALL") {
      fetchHospital();
    } else {
      fetchDepHospital(category);
    }
    setSelectedDepartment(e.target.value);
  };

  const handleDeleteTag = (tagToDelete: string) => {
    const updatedTags = editingHospital?.tags
      .split(',')
      .filter(tag => tag.trim() !== tagToDelete)
      .join(', ');

    setEditingHospital((prev) => {
      if (prev) {
        return {
          ...prev,
          tags: updatedTags || '',
        };
      }
      return prev;
    });
  };

  const onClickNext = async () => {
    const rowsLength = hospitals.length;
    if (rowsLength === rowsPerPage) {
      setPage((p) => p + 1);
    }
  };

  const onClickPrev = async () => {
    if (page > 0) {
      setPage((p) => p - 1);
    }
  };
  const handleEventToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventToggle(e.target.checked); // 이벤트 토글 상태 업데이트
  };
  useEffect(() => {
    fetchHospital();
  }, [page]);
console.log("병원정보>>>",hospitals)
  return (
    <div className="hospital-container">
      {/* 병원추가 창 */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
            <DialogTitle>병원 추가</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="병원명"
                fullWidth
                value={newHospital?.dutyName || ''}
                onChange={(e) => setNewHospital({ ...newHospital!, dutyName: e.target.value })}
              />
              
              <TextField
                margin="dense"
                label="도시"
                fullWidth
                value={newHospital?.city || ''}
                onChange={(e) => setNewHospital({ ...newHospital!, city: e.target.value })}
                onClick={() => setOpenPostcode(true)}
              />
              <TextField
                margin="dense"
                label="지역"
                fullWidth
                value={newHospital?.location || ''}
                onChange={(e) => setNewHospital({ ...newHospital!, location: e.target.value })}
                onClick={() => setOpenPostcode(true)}
              />
              <Select
                margin="dense"
                label="진료과"
                fullWidth
                value={newHospital?.dutyDivNam || ''}
                onChange={(e) => setNewHospital({ ...newHospital!, dutyDivNam: e.target.value })}
              >
                {departmentOptions.slice(1).map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                margin="dense"
                label="태그"
                fullWidth
                value={newHospital?.tags || ''}
                onChange={(e) => setNewHospital({ ...newHospital!, tags: e.target.value })}
              />
                 <TextField
                margin="dense"
                label="좋아요수"
                fullWidth
                value={newHospital?.rnum || ''}
                onChange={(e) => setNewHospital({ ...newHospital!, rnum: e.target.value })}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
                {(newHospital && newHospital.tags) && newHospital?.tags.split(',').map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag.trim()}
                    onDelete={() => handleDeleteTag(tag.trim())}
                    color="primary"
                  />
                ))}
              </Box>
              <Button variant="contained" component="label">
          이미지 선택
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
        {image && <p>{image.name}</p>}
        
        {/* {openPostcode && (
          <Dialog open={openPostcode} onClose={() => setOpenPostcode(false)}>
            <DialogTitle>주소 검색</DialogTitle>
            <DialogContent>
              <DaumPostcode onComplete={handleCompletePostcode} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenPostcode(false)} color="primary">
                닫기
              </Button>
            </DialogActions>
          </Dialog>
        )} */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">취소</Button>
              <Button onClick={handleAdd} color="primary">저장</Button>
            </DialogActions>
          </Dialog>
      <Typography fontSize={"18px"}>병원정보 - 조회</Typography>
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingBottom: "0px",
          }}
        >
             <div className="exhibit-search-row">  <MainSearchBar placeholder='병원명,도시,지역' onSearch={handleSearch} />
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
            >병원 추가</Button>
             </div>
        
          <div className="filter-row">
            <Typography fontSize={"16px"}>진료과</Typography>
            <Select
              value={selectedDepartment}
              onChange={onChangeDep}
              displayEmpty
              sx={{ height: "36px", width: "200px" }}
            >
              {departmentOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {/* <Typography fontSize={"16px"}>이벤트 히스토리</Typography>
            <IOSSwitch checked={eventToggle} onChange={handleEventToggleChange} /> */}
          </div>

          <TableContainer
            component={Paper}
            variant='outlined'
            sx={{ borderTop: `1px solid ${appColor1}`, maxHeight: 600 }}
          >
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }}>병원명</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">도시</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">지역</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">진료과</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">태그</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">등록이벤트</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">좋아요 수</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">수정</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">활성/비활성</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hospitals.map((hospital, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: headerTxtColor }}>{hospital.dutyName}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{parseAddress(hospital.dutyAddr)?.city}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{parseAddress(hospital.dutyAddr)?.region}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{hospital.dutyDivNam}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{hospital.tags ? hospital.tags : "-"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{hospital.rnum}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{"-"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center"><IconButton
                      onClick={() => handleEditClick(hospital)}
                    ><FaPencilAlt /></IconButton></TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center"><IconButton
                      onClick={() => handleInActivate(hospital.id,hospital.activated)}
                    >
                    {hospital.activated===true?  <GiNightSleep />:
                    <GiSun
                    color={appColor1}
                    />}
                    </IconButton></TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">
                      <IconButton
                        onClick={() => handleDelete(hospital.id, hospital.dutyName)}
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

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>병원 정보 수정</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="병원명"
                fullWidth
                value={editingHospital?.dutyName || ''}
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
              <Select
                margin="dense"
                label="진료과"
                fullWidth
                value={editingHospital?.dutyDivNam || ''}
                onChange={(e) => setEditingHospital({ ...editingHospital!, dutyDivNam: e.target.value })}
              >
                {departmentOptions.slice(1).map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                margin="dense"
                label="태그"
                fullWidth
                value={editingHospital?.tags || ''}
                onChange={(e) => setEditingHospital({ ...editingHospital!, tags: e.target.value })}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
                {(editingHospital && editingHospital.tags) && editingHospital?.tags.split(',').map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag.trim()}
                    onDelete={() => handleDeleteTag(tag.trim())}
                    color="primary"
                  />
                ))}
              </Box>
              <Button variant="contained" component="label">
          이미지 선택
          <input type="file" hidden onChange={handleEditImageChange} />
        </Button>
        {editImage && <p>{editImage.name}</p>}
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
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
