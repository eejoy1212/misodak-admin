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
import { getUsers } from '../api/user';
import './Board.css';
import { HospitalRegisterTxtfield } from '../Component/HospitalRegisterTxtfield';
import { MainSearchBar } from '../Component/MainSearchBar';
import { getBoard } from '../api/board';
import moment from 'moment';

interface Write {
  id: number;
writer:string;
content:string;
category:string;
image1:string;
image2:string;
image3:string;
image4:string;
image5:string;
views:string;
activated:boolean;
updateDate:string;
registerDate:string;
}
interface WriteProps {

}
export function Board(props: WriteProps) {
  const headerColor = "#F0FBEB";
  const headerTxtColor = "#333333";
  const [writes, setWrites] = useState<Write[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<Write | null>(null);

  const fetchUrls = async () => {
    try {
      const res = await getBoard(page);
      console.log("게시글 조회>>>", res);
      setWrites(res);
      return res.length;
    } catch (error) {
      console.error(error);
    }
  };

  const onOpenEdit = (user: Write) => {
    setSelected(user);
    setOpenEdit(true);
  };

  const onClose = () => {
    setOpenEdit(false);
    setSelected(null); // 다이얼로그를 닫을 때 선택된 유저 초기화
  };

  const handleFieldChange = (field: keyof Write, value: string) => {
    if (selected) {
      setSelected({ ...selected, [field]: value });
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [page]);

  const onClickNext = async () => {
    const usersLength = writes.length;
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
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            paddingBottom: "0px",
          }}
        >
      <Typography fontSize={"18px"}>게시글 임의 관리</Typography>

          <MainSearchBar placeholder='게시글 검색' onSearch={() => { }} />

          <TableContainer
            component={Paper}
            variant='outlined'
            sx={{ borderTop: "1px solid #14AC2B", maxHeight: 650 }}
          >
            <Table 
        //  size='small'
            aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow
           
                >
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }}>작성일</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }}>수정일</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">작성자</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">내용</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="left">카테고리</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">이미지1</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">이미지2</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">이미지3</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">이미지4</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">이미지5</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">조회수</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">수정</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">활성/비활성</TableCell>
                  <TableCell sx={{ backgroundColor: headerColor, color: headerTxtColor }} align="center">삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {writes.map((write, index) => (
                  <TableRow key={index} 
                  
                  >
                    <TableCell   sx={{ color: headerTxtColor  }}>{moment(write.registerDate).format("YYYY-MM-DD")}</TableCell>
                    <TableCell   sx={{ color: headerTxtColor  }}>{moment(write.updateDate).format("YYYY-MM-DD")}</TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="left">{write.writer ?? "-"}</TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="left">{write.content ?? "-"}</TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="left">{write.category ?? "-"}</TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="center">
                      
                      <img
                      className='write-img'
                      src={write.image1}
                      />
                    </TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="center">  
                      <img
                      className='write-img'
                      src={write.image2}
                      /></TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="center">  
                      <img
                      className='write-img'
                      src={write.image3}
                      /></TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="center">  
                      <img
                      className='write-img'
                      src={write.image4}
                      /></TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="center">  
                      <img
                      className='write-img'
                      src={write.image5}
                      /></TableCell>
                    <TableCell  sx={{ color: headerTxtColor  }} align="center">{write.views}</TableCell>
                
                    <TableCell  sx={{ color: headerTxtColor  }} align="center">
                      <IconButton
                        onClick={() => { onOpenEdit(write) }}
                      ><FaPencilAlt /></IconButton>
                    </TableCell>

                    <TableCell sx={{ color: headerTxtColor }} align="center"><IconButton
                      onClick={() => { }}
                    >
                      {write.activated === true ? <GiNightSleep /> :
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

       
        </CardContent>
      </Card>
    </div>
  );
}
