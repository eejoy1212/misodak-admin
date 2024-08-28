import React, { memo, useEffect, useState } from 'react';
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
  TextareaAutosize,
} from '@mui/material';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { GiNightSleep, GiSun } from "react-icons/gi";
import moment from 'moment';
import { deleteUser, getUsers, putActivateUser, putEditUser, searchGetUsers } from '../api/user';
import './Users.css';
import { HospitalRegisterTxtfield } from '../Component/HospitalRegisterTxtfield';
import { MainSearchBar } from '../Component/MainSearchBar';
import { GrClose } from 'react-icons/gr';
import { appColor1, appColor2 } from '../const/const';

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
  memo:string;
}
interface UserProps {

}
export function Users(props: UserProps) {
  const headerColor = appColor2;
  const headerTxtColor = "#333333";
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
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
  const fetchSearchUsers = async (keyword: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeOut=setTimeout(async()=>{
      await searchGetUsers(page,keyword)
      .then(res=>setUsers(res))
      .catch(err=>console.log("유저 검색 오류:",err))
    },1000)
    setSearchTimeout(timeOut);
  };
  const onSearch = (e: any) => {
    const keyword=e.target.value
         fetchSearchUsers(keyword);
     };
     const handleInActivate = async (id: number, nowActivate: boolean) => {
      const res = window.confirm(`${nowActivate === true ? "비활성" : "활성"} 하시겠습니까?`);
      if (res) {
        await putActivateUser(id);
        fetchUrls();
      }
    };
    const handleDelete = async (id: number, name: string) => {
      const password = prompt('관리자 비밀번호를 입력하세요:');
      if (password) {
        const res = window.confirm(`${name}을 삭제 하시겠습니까?`);
        if (res) {
          await deleteUser(id, password);
          fetchUrls();
        }
      } else {
        alert('비밀번호가 입력되지 않았습니다.');
      }
    };

    const onEditUser=async()=>{try {
 
      if (selected) {
               const newSelected={
                id:selected.id,
                registerTime:selected.registerTime,
                nickname:selected.nickname,
                phone:selected.phone,
                email:selected.email,
                activated:selected.activated,
                memo:selected.memo
              }
                  // 현재 시간을 기준으로 변환
const formattedDateStr = moment(selected.registerTime).set({
  hour: moment().hour(),
  minute: moment().minute(),
  second: moment().second(),
  millisecond: moment().millisecond()
}).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
         console.log("selected>>>",newSelected) 
          await putEditUser(    selected.id,
            formattedDateStr,
            selected.nickname,
            selected.phone,
            selected.email,
           selected.activated,
            selected.memo)
      window.confirm("수정을 성공적으로 완료했습니다.")
      onClose()
      } else {
      
      }
 
      fetchUrls()
    } catch (error) {
      window.confirm(`수정을 실패했습니다:${error}`)
    }
      
    } 
  return (
    <div className="hospital-container">
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingBottom: "0px",
          }}
        >
      <Typography fontSize={"18px"}>유저 조회</Typography>

          <MainSearchBar placeholder='이름,닉네임,연락처,이메일,관심지역' onSearch={onSearch} />

          <TableContainer
            component={Paper}
            variant='outlined'
            sx={{ borderTop: `1px solid ${appColor1}`, maxHeight: 650 }}
          >
            <Table 
        //  size='small'
            aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow
           
                >
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
                  <TableRow key={index} 
                  
                  >
                    <TableCell   sx={{ color: headerTxtColor  }}>{user.name ?? "-"}</TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="left">{user.nickname ?? "-"}</TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="left">{user.phone ?? "-"}</TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="left">{user.email ?? "-"}</TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="center">{user.registerTime ? moment(user.registerTime).format("YY.MM.DD") : "-"}</TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="center">{user.status ? `🟢` : `🛑`}</TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="center">{user.eventCount ?? "-"} 회</TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="center">{user.boardCount ?? "-"} 회</TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="center">{user.commentCount ?? "-"} 회</TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="center">
                      <IconButton
                        onClick={() => { onOpenEdit(user) }}
                      ><FaPencilAlt /></IconButton>
                    </TableCell>

                    <TableCell sx={{ color: headerTxtColor }} align="center"><IconButton
                      onClick={() => { 
                        handleInActivate(user.id,user.activated)
                      }}
                    >
                      {user.activated === true ? <GiNightSleep /> :
                        <GiSun
                          color={appColor1}
                        />}
                    </IconButton></TableCell>
                    <TableCell sx={{ color: headerTxtColor }} align="center">
                      <IconButton
                        onClick={() => {
                          handleDelete(user.id,user.name)
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
          <Dialog 
// maxWidth="sm"
fullWidth
open={openEdit} onClose={onClose}>
      <DialogTitle
              sx={{
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between"
              }}
              >
                <span>유저 수정</span>
                <IconButton><GrClose/></IconButton>
                </DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
          
<div className="user-edit-left">
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
              <div className="user-edit-row">
                <div className="user-edit-title">
                  메모
                </div>
                <HospitalRegisterTxtfield
                  value={selected?.memo ?? ''}
                  onChange={(e) => handleFieldChange('memo', e.target.value)}
                />
             
              </div>
          
</div>
{/* <div
              className='edit-v-divider'
              />
<div className="user-edit-right">
  <div className="edit-tabview">
    
  </div>
</div> */}
            

            </DialogContent>
            <DialogActions>
            {/* <Button
                                variant='outlined'
                                sx={{
                                    marginLeft:"140px",
                                    width:"100px",
                                    borderColor:"black",
                                    color:"black",
                                    ":hover":{
                                        width:"100px",
                                        borderColor:"black",
                                        color:"black",  
                                    }
                                }}
                                onClick={onClose}
                                >취소</Button> */}
                                <Button
                                 variant='contained'
                                 sx={{
                                    backgroundColor:appColor1,
                                    width:"100px",
                                    ":hover":{
                                        backgroundColor:appColor1,
                                    width:"100px",  
                                    }
                                 }}
                                 onClick={onEditUser}
                                >저장</Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
