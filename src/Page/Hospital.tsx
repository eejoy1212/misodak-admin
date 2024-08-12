import React, { useEffect, useState } from 'react';
import { Card, CardContent, MenuItem, Select, Switch, Typography, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import './Hospital.css';
import { MainSearchBar } from '../Component/MainSearchBar';
import { getDepHospital, getHospital, searchHospital } from '../api/hospital';
import { FaPencilAlt } from "react-icons/fa";
// 병원 데이터 타입 정의
interface Hospital {
  dutyName: string;
  dutyDivNam: string;
  dutyAddr: string;
  city: string;
  region: string;
  department: string;
  tags: string[];
  event: string;
  likes: number;
}

export interface HospitalProps {}
export interface SwitchProps {}

// 진료과 목록
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
  const [hospitals, setHospitals] = useState<Hospital[]>([]); // Hospital 타입 사용
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);

  const handleEditClick = (hospital: Hospital) => {
    setEditingHospital(hospital);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingHospital(null);
  };

  const handleSave = () => {
    // 여기에 병원 정보를 수정하고 서버에 업데이트하는 로직을 추가합니다.
    console.log('수정된 병원 정보:', editingHospital);
    handleCloseDialog();
  };

  function parseAddress(address: string): { city: string, region: string } | null {
    const cityEndIndex = address.search(/(시|도)/) + 1;
  
    if (cityEndIndex > 0) {
      const city = address.slice(0, cityEndIndex).trim();
      const regionMatch = address.slice(cityEndIndex).trim().match(/\S+(구|시|군)/);
  
      if (regionMatch) {
        const region = regionMatch[0];
        return { city, region };
      }
    }
    return null;
  }
  
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      searchHospitals(value);
    }, 1000);

    setSearchTimeout(timeout);
  };

  const searchHospitals = async (keyword: string) => {
    if (keyword.trim()==="") {
        fetchHospital()
    } else {
          const res = await searchHospital(keyword, page, rowsPerPage);
    setHospitals(res.content);
    }
  
  };

  const fetchHospital = async () => {
    const res = await getHospital();
    setHospitals(res.content);
    console.log("병원 데이터>>>", res.content);
  };

  useEffect(() => {
    fetchHospital();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // 페이지 변경 시 첫 페이지로 초기화
  };

  return (
    <div className="hospital-container">
        
      <Typography fontSize={"18px"}>병원정보 - 조회</Typography>
      <Card variant="outlined"
        sx={{
          height: "100%"
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingBottom: "0px", // 패딩을 줄여서 페이지네이션이 보이도록 함
          }}
        >
          <MainSearchBar placeholder='병원명,도시,지역' onSearch={handleSearch} />
          <div className="filter-row">
            <Typography fontSize={"16px"}>진료과</Typography>
            <Select
              value={selectedDepartment}
              onChange={onChangeDep}
              displayEmpty
              sx={{
                height: "36px",
                width: "200px",
              }}
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

          {/* MUI 테이블 */}
          <TableContainer
            component={Paper}
            variant='outlined'
            sx={{
              borderTop: "1px solid #14AC2B",
              maxHeight: 600, // 높이 제한을 두어 페이지네이션이 보이도록 설정
            }}
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
                {hospitals&&hospitals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((hospital, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: headerTxtColor }}>{hospital.dutyName}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{parseAddress(hospital.dutyAddr)?.city}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{parseAddress(hospital.dutyAddr)?.region }</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{hospital.dutyDivNam}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{hospital.tags ? hospital.tags.join(', ') : "-"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{"-"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{"-"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center"><IconButton
                    onClick={() => handleEditClick(hospital)}
                    ><FaPencilAlt/></IconButton></TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">비활성</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">삭제</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {hospitals&&<TablePagination
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
                value={editingHospital?.tags ?editingHospital?.tags.join(', ') : ''}
                onChange={(e) => setEditingHospital({ ...editingHospital!, tags: e.target.value.split(',').map(tag => tag.trim()) })}
              />
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
