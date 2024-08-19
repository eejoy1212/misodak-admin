import * as React from 'react';
import './DashboardLayout.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import { MdDashboard } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { MdOutlineEventNote } from "react-icons/md";
import { MdLayers } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdDiamond } from "react-icons/md";
export interface DashboardLayoutProps {
}
const menuTitleSx = {
    color: "#999999",
    width: "calc(100% - 40px)",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "36px",
    marginBottom: "10px"
}

const iconStyle = { marginLeft: "10px" }
export function DashboardLayout(props: DashboardLayoutProps) {
    const [openInfoTab,setOpenInfoTab]=React.useState(false)
    const [openCommunityTab,setOpenCommunityTab]=React.useState(false)
    const location = useLocation()
    const navigate=useNavigate()
    const getSelected = (path: string) => {
        const isSelect = location.pathname === path
        return isSelect
    }
    const onClickInfoTab=()=>{
        setOpenInfoTab(p=>!p)
    }
    const onClickCommunityTab=()=>{
        setOpenCommunityTab(p=>!p)
    }
    return (
        <div className="dashboard-container">
            <div
            className='dashboard'
        >
            <div className="sidebar">
                <div className="sidebar-top">
                    <Avatar />
                    <Typography fontSize={"14px"}>관리자</Typography>
                </div>
                <Typography fontSize={"18px"}
                    sx={menuTitleSx}
                >Menu</Typography>
                <ul className="menus">

                    <li className={`menu ${getSelected("/") ? "select" : ""}`}
                     onClick={()=>{
                        navigate("/")
                    }}
                    >
                        <div
                            className={`indicator ${getSelected("/") ? "" : "opacity"}`}
                        />
                        <MdDashboard
                            size={"20px"}
                            color={`${getSelected("/") ? "#14AC2B" : "#999999"}`}
                            style={iconStyle}
                        />
                        <strong
                            style={{
                                color: `${getSelected("/") ? "#14AC2B" : "#999999"}`
                            }}
                        >Dashboard</strong>
                    </li>
                    <li className="menu">    <div
                        className={`indicator ${getSelected("/noti") ? "" : "opacity"}`}
                    />
                        <MdNotificationsNone size={"20px"}
                            color={`${getSelected("/noti") ? "#14AC2B" : "#999999"}`}
                            style={iconStyle} />
                        <strong
                            style={{
                                color: `${getSelected("/noti") ? "#14AC2B" : "#999999"}`
                            }}
                        >Notification</strong>
                    </li>
                    <li className={`menu ${openInfoTab ? "select" : ""}`}
                    onClick={onClickInfoTab}
                    >    <div
                        className={`indicator ${openInfoTab ? "" : "opacity"}`}
                    />
                        <MdOutlineEventNote
                            size={"20px"}
                            color={`${openInfoTab ? "#14AC2B" : "#999999"}`}
                            style={iconStyle}
                        />
                        <strong
                            style={{
                                color: `${openInfoTab ? "#14AC2B" : "#999999"}`
                            }}
                        >병원관리</strong>
                    </li>
                 {openInfoTab&&   <ul
              
                 >
                    <li
                    onClick={()=>{
                        navigate("/hospital")
                    }}
                    className={`${location.pathname==="/hospital"?"select-sub-menu":"sub-menu"}`}
                    >정보 조회</li>
                    <li
                    className={`${location.pathname==="/hospital-register"?"select-sub-menu":"sub-menu"}`}
                    onClick={()=>{
                        navigate("/hospital-register")
                    }}
                    >정보 등록</li>
                    {/* <li
                    className={`${location.pathname==="/hospital-edit"?"select-sub-menu":"sub-menu"}`}
                    >정보 수정</li> */}
                    </ul>}
                    <li className="menu">    <div
                          className={`indicator ${getSelected("/event") ? "" : "opacity"}`}
                    />
                        <MdLayers
                            size={"20px"}
                            color={`${getSelected("/event") ? "#14AC2B" : "#999999"}`}
                            style={iconStyle}
                        />
                        <strong
                         style={{
                            color: `${getSelected("/event") ? "#14AC2B" : "#999999"}`
                        }}
                        >이벤트관리</strong>
                    </li>
                    <li className={`menu ${openCommunityTab ? "select" : ""}`}
                    onClick={onClickCommunityTab}
                    >    <div
                      className={`indicator ${openCommunityTab ? "" : "opacity"}`}
                    /><FaRegUser  size={"20px"}
                    color={`${openCommunityTab ? "#14AC2B" : "#999999"}`}
                    style={iconStyle}/>
                        <strong
                         style={{
                            color: `${openCommunityTab ? "#14AC2B" : "#999999"}`
                        }}
                        >커뮤니티관리</strong>
                    </li>
                    {openCommunityTab&&   <ul
                   
                    >
                    <li
                    onClick={()=>{
                        navigate("/hospital")
                    }}
                    className={`${location.pathname==="/hospital"?"select-sub-menu":"sub-menu"}`}
                    >글 임의 생성</li>
                    <li
                    className={`${location.pathname==="/hospital-register"?"select-sub-menu":"sub-menu"}`}
                    onClick={()=>{
                        navigate("/hospital-register")
                    }}
                    >댓글 임의 생성</li>
                      <li
                    className={`${location.pathname==="/hospital-register"?"select-sub-menu":"sub-menu"}`}
                    onClick={()=>{
                        navigate("/hospital-register")
                    }}
                    >
                        
                        게시글 임의 관리</li>
                        <li
                    className={`${location.pathname==="/forbidden-manage"?"select-sub-menu":"sub-menu"}`}
                    onClick={()=>{
                        navigate("/forbidden-manage")
                    }}
                    >
                        
                        금지어 관리</li>
                    {/* <li
                    className={`${location.pathname==="/hospital-edit"?"select-sub-menu":"sub-menu"}`}
                    >정보 수정</li> */}
                    </ul>}
                    <li className="menu">    <div
                         className={`indicator ${getSelected("/etc") ? "" : "opacity"}`}
                    />
                    <MdDiamond
                    size={"20px"}
                    color={`${getSelected("/etc") ? "#14AC2B" : "#999999"}`}
                    style={iconStyle}
                    />
                        <strong
                         style={{
                            color: `${getSelected("/etc") ? "#14AC2B" : "#999999"}`
                        }}
                        >기타관리</strong>
                    </li>
                </ul>
            </div>
            <Outlet />
        </div></div>

    );
}
