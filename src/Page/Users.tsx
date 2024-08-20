import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  MenuItem,
  Select,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { GiNightSleep, GiSun } from "react-icons/gi";
import moment from 'moment';
import { getUsers } from '../api/user';
import './Users.css';
import { HospitalRegisterTxtfield } from '../Component/HospitalRegisterTxtfield';
import { MainSearchBar } from '../Component/MainSearchBar';

interface User {
  id: number;
  name: string;
  nickname: string;
  phone: string;
  email: string;
  registerTime: string;
  status: string;
  eventCount: string;
  boardCount: string;
  commentCount: string;
  activated: boolean;
}
interface UserProps {

}
export function Users(props: UserProps) {
  const headerColor = "#F0FBEB";
  const headerTxtColor = "#333333";
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);

  const fetchUrls = async () => {
    try {
      const res = await getUsers(page);
      console.log("유저목록 조회>>>", res);
      setUsers(res);
      return res.length;
    } catch (error) {
      console.error(error);
    }
  };

  const onOpenEdit = (user: User) => {
    setSelected(user);
    setOpenEdit(true);
  };

  const onClose = () => {
    setOpenEdit(false);
    setSelected(null); // 다이얼로그를 닫을 때 선택된 유저 초기화
  };

  const handleFieldChange = (field: keyof User, value: string) => {
    if (selected) {
      setSelected({ ...selected, [field]: value });
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [page]);

  const onClickNext = async () => {
    const usersLength = users.length;
    console.log("user length>>>", usersLength);

    if (usersLength === rowsPerPage) {
      setPage((p) => p + 1);
    }
  };

  const onClickPrev = async () => {
    if (page > 0) {
      setPage((p) => p - 1);
    }
  };

  return (
    <div className="hospital-container">
      <Typography fontSize={"18px"}>유저 조회</Typography>
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingBottom: "0px",
          }}
        >
          <MainSearchBar placeholder='유저명, 닉네임' onSearch={() => { }} />

          <TableContainer
            component={Paper}
            variant='outlined'
            sx={{ borderTop: "1px solid #14AC2B", maxHeight: 600 }}
          >
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }}>이름</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">닉네임</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">연락처</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">이메일</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">가입일</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">Status</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">이벤트참여</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">좋아요</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">댓글</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">수정</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">활성/비활성</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: headerTxtColor }}>{user.name ?? "-"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{user.nickname ?? "-"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{user.phone ?? "-"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="left">{user.email ?? "-"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{user.registerTime ? moment(user.registerTime).format("YY.MM.DD") : "-"}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{user.status ? `🟢` : `🛑`}</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{user.eventCount ?? "-"} 회</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{user.boardCount ?? "-"} 회</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">{user.commentCount ?? "-"} 회</TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">
                      <IconButton
                        onClick={() => { onOpenEdit(user) }}
                      ><FaPencilAlt /></IconButton>
                    </TableCell>

                    <TableCell sx={{ color: headerTxtColor }} align="center"><IconButton
                      onClick={() => { }}
                    >
                      {user.activated === true ? <GiNightSleep /> :
                        <GiSun
                          color='#14AC2B'
                        />}
                    </IconButton></TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">
                      <IconButton
                        onClick={() => { }}
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
          <Dialog open={openEdit} onClose={onClose}>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <DialogTitle>유저 수정</DialogTitle>

              <div className="user-edit-row">
                <div className="user-edit-title">
                  가입일
                </div>
                <TextField
                  size='small'
                  sx={{
                    width: "300px"
                  }}
                  type="date"
                  value={selected?.registerTime ? moment(selected.registerTime).format('YYYY-MM-DD') : ''}
                  onChange={(e) => handleFieldChange('registerTime', e.target.value)}
                  fullWidth
                />
              </div>

              {/* 다른 필드들도 비슷하게 추가 가능합니다. 예시: */}
              <div className="user-edit-row">
                <div className="user-edit-title">
                  이름
                </div>
                <HospitalRegisterTxtfield
                  value={selected?.name ?? ''}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                />
              </div>

              <div className="user-edit-row">
                <div className="user-edit-title">
                  닉네임
                </div>
                <HospitalRegisterTxtfield
                  value={selected?.nickname ?? ''}
                  onChange={(e) => handleFieldChange('nickname', e.target.value)}
                />
              </div>

              <div className="user-edit-row">
                <div className="user-edit-title">
                  연락처
                </div>
                <HospitalRegisterTxtfield
                  value={selected?.phone ?? ''}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                />
              </div>
              <div className="user-edit-row">
                <div className="user-edit-title">
                  이메일
                </div>
                <HospitalRegisterTxtfield
                  value={selected?.email ?? ''}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                />
              </div>
              <div className="user-edit-row">
                <div className="user-edit-title">
                  Status
                </div>
                <Select
                  size='small'
                  sx={{
                    width: "300px"
                  }}
                  value={selected?.status ? "🟢" : "🛑"}
                  onChange={(e) => handleFieldChange('status', e.target.value)}
                  fullWidth
                >
                  <MenuItem value={"🟢"}>🟢</MenuItem>
                  <MenuItem value={"🛑"}>🛑</MenuItem>
                </Select>
              </div>
              <div className="user-edit-row">
                <div className="user-edit-title">
                  이벤트참여
                </div>
                <HospitalRegisterTxtfield
                  value={selected?.eventCount ?? ''}
                  onChange={(e) => handleFieldChange('eventCount', e.target.value)}
                />
              </div>
              <div className="user-edit-row">
                <div className="user-edit-title">
                  작성 글
                </div>
                <HospitalRegisterTxtfield
                  value={selected?.boardCount ?? ''}
                  onChange={(e) => handleFieldChange('boardCount', e.target.value)}
                />
              </div>
              <div className="user-edit-row">
                <div className="user-edit-title">
                  작성 댓글
                </div>
                <HospitalRegisterTxtfield
                  value={selected?.commentCount ?? ''}
                  onChange={(e) => handleFieldChange('commentCount', e.target.value)}
                />
              </div>

            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">취소</Button>
              <Button onClick={() => { /* 유저 저장 로직 추가 */ }} color="primary">저장</Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
