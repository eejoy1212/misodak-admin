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
import { deleteHospital, getDepHospital, getHospital, putActivateHospital, putEditHospital } from '../api/hospital';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { searchHospitals } from '../api/hospital';
import DaumPostcode from 'react-daum-postcode';
import { parseAddress } from '../const/const';

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
}

export interface HospitalProps { }
export interface SwitchProps { }

const departmentOptions = [
  { value: 'ALL', label: '전체' },
  { value: 'CLINIC', label: '의원' },
  { value: 'DENTAL', label: '치과의원' },
  { value: 'ORIENTAL', label: '한의원' },
  { value: 'NURSING', label: '요양병원' },
  { value: 'PUBLIC', label: '보건소' },
  { value: 'GENERAL', label: '종합병원' },
  { value: 'HOSPITAL', label: '병원' },
  { value: 'TRADITIONAL', label: '한방병원' },
  { value: 'OTHER', label: '기타' },
  { value: 'OTHER_AMBULANCE', label: '기타(구급차)' },
];

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

export function Hospital(props: HospitalProps) {
  const headerColor = "#F0FBEB";
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

  const handleEditClick = (hospital: Hospital) => {
    setEditingHospital(hospital);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingHospital(null);
    window.location.reload();
  };

  const handleSave = async () => {
    if (editingHospital) {
      await putEditHospital(
        editingHospital.id, 
        editingHospital?.dutyName, 
        editingHospital?.city, 
        editingHospital?.location, 
        editingHospital?.dutyAddr, 
        "CLINIC", 
        editingHospital.tags, 
        editingHospital?.dutyInf
      );
    }
    handleCloseDialog();
  };

  const handleCompletePostcode = (data: any) => {
    setEditingHospital({
      ...editingHospital!,
      dutyAddr: data.address,
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
      await searchHospitals(value, { page: 1, size: rowsPerPage, sort: 'dutyName' })
        .then(res => setHospitals(res))
        .catch(error => console.error("병원 검색 오류:", error));
    }, 1000);

    setSearchTimeout(timeout);
  };

  const fetchHospital = async () => {
    const res = await getHospital();
    setHospitals(res.content);
  };

  useEffect(() => {
    fetchHospital();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    searchHospitals(searchTerm, { page: newPage, size: rowsPerPage, sort: 'dutyName' })
      .then(res => setHospitals(res.content))
      .catch(error => console.error("페이지 변경 오류:", error));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0);
    searchHospitals(searchTerm, { page: 0, size: newSize, sort: 'dutyName' })
      .then(res => setHospitals(res.content))
      .catch(error => console.error("페이지 크기 변경 오류:", error));
  };

  const handleInActivate = async (id: number) => {
    const res = window.confirm("비활성 하시겠습니까?");
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

  // 태그 삭제 핸들러
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

  return (
    <div className="hospital-container">
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
          <MainSearchBar placeholder='병원명,도시,지역' onSearch={handleSearch} />
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
            <Typography fontSize={"16px"}>이벤트 히스토리</Typography>
            <IOSSwitch />
          </div>

          <TableContainer
            component={Paper}
            variant='outlined'
            sx={{ borderTop: "1px solid #14AC2B", maxHeight: 600 }}
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
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">비활성</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hospitals && hospitals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((hospital, index) => (
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
                      onClick={() => handleInActivate(hospital.id)}
                    ><GiNightSleep /></IconButton></TableCell>
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
          {hospitals && <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={hospitals.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />}
          {/* 수정 다이얼로그 */}
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
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
