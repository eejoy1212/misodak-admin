import * as React from 'react';
import './DashboardLayout.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import { MdDashboard, MdNotificationsNone, MdOutlineEventNote, MdLayers, MdDiamond } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { appColor1 } from '../const/const';

export interface DashboardLayoutProps {}

export function DashboardLayout(props: DashboardLayoutProps) {
  const [openTab, setOpenTab] = React.useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const getSelected = (path: string) => {
    return location.pathname === path;
  };

  const handleTabClick = (tab: string) => {
    setOpenTab((prevTab) => (prevTab === tab ? null : tab));
  };

  const handleDashboardClick = () => {
    setOpenTab(null); // 다른 모든 탭을 닫기 위해 null로 설정
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="sidebar">
          <div className="sidebar-top">
            <Avatar />
            <Typography fontSize={"14px"}>관리자</Typography>
          </div>
          <Typography fontSize={"18px"} sx={{ color: "#999999", width: "calc(100% - 40px)", marginLeft: "20px", marginRight: "20px", marginTop: "36px", marginBottom: "10px" }}>Menu</Typography>
          <ul className="menus">
            {/* <li className={`menu ${openTab === null && getSelected("/") ? "select" : ""}`} onClick={handleDashboardClick}>
              <div className={`indicator ${openTab === null && getSelected("/") ? "" : "opacity"}`} />
              <MdDashboard size={"20px"} color={`${openTab === null && getSelected("/") ? appColor1 : "#999999"}`} style={{ marginLeft: "10px" }} />
              <strong style={{ color: `${openTab === null && getSelected("/") ? appColor1 : "#999999"}` }}>Dashboard</strong>
            </li> */}
            {/* <li className="menu" >
              <div className={`indicator ${getSelected("/noti") ? "" : "opacity"}`} />
              <MdNotificationsNone size={"20px"} color={`${getSelected("/noti") ? appColor1 : "#999999"}`} style={{ marginLeft: "10px" }} />
              <strong style={{ color: `${getSelected("/noti") ? appColor1 : "#999999"}` }}>Notification</strong>
            </li> */}
            <li className={`menu ${openTab === "info" ? "select" : ""}`} onClick={() => handleTabClick("info")}>
              <div className={`indicator ${openTab === "info" ? "" : "opacity"}`} />
              <MdOutlineEventNote size={"20px"} color={`${openTab === "info" ? appColor1 : "#999999"}`} style={{ marginLeft: "10px" }} />
              <strong style={{ color: `${openTab === "info" ? appColor1 : "#999999"}` }}>병원관리</strong>
            </li>
            {openTab === "info" && (
              <ul>
                <li className={`${location.pathname === "/hospital" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/hospital")}>정보 조회</li>
                <li className={`${location.pathname === "/hospital-register" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/hospital-register")}>정보 등록</li>
              </ul>
            )}
            <li className={`menu ${openTab === "event" ? "select" : ""}`} onClick={() => handleTabClick("event")}>
              <div className={`indicator ${openTab === "event" ? "" : "opacity"}`} />
              <MdLayers size={"20px"} color={`${openTab === "event" ? appColor1 : "#999999"}`} style={{ marginLeft: "10px" }} />
              <strong style={{ color: `${openTab === "event" ? appColor1 : "#999999"}` }}>이벤트관리</strong>
            </li>
            {openTab === "event" && (
              <ul>
                {/* <li className={`${location.pathname === "/url-create" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/url-create")}>URL 생성</li> */}
                <li className={`${location.pathname === "/urls" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/urls")}>URL 정보</li>
                {/* <li className={`${location.pathname === "/exhibit-create" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/exhibit-create")}>기획전 생성</li> */}
                <li className={`${location.pathname === "/exhibit" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/exhibit")}>기획전 관리</li>
                {/* <li className={`${location.pathname === "/apppush-create" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/apppush-create")}>앱푸시 생성</li> */}
                <li className={`${location.pathname === "/apppushs" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/apppushs")}>앱푸시 관리</li>
                <li className={`${location.pathname === "/users" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/users")}>유저조회</li>
              </ul>
            )}
            <li className={`menu ${openTab === "community" ? "select" : ""}`} onClick={() => handleTabClick("community")}>
              <div className={`indicator ${openTab === "community" ? "" : "opacity"}`} />
              <FaRegUser size={"20px"} color={`${openTab === "community" ? appColor1 : "#999999"}`} style={{ marginLeft: "10px" }} />
              <strong style={{ color: `${openTab === "community" ? appColor1 : "#999999"}` }}>커뮤니티관리</strong>
            </li>
            {openTab === "community" && (
              <ul>
                <li className={`${location.pathname === "/hospital" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/hospital")}>글 임의 생성</li>
                <li className={`${location.pathname === "/hospital-register" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/hospital-register")}>댓글 임의 생성</li>
                <li className={`${location.pathname === "/board" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/board")}>게시글 임의 관리</li>
                <li className={`${location.pathname === "/forbidden-manage" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/forbidden-manage")}>금지어 관리</li>
              </ul>
            )}
            <li className={`menu ${openTab === "etc" ? "select" : ""}`} onClick={() => handleTabClick("etc")}>
              <div className={`indicator ${openTab === "etc" ? "" : "opacity"}`} />
              <MdDiamond size={"20px"} color={`${openTab === "etc" ? appColor1 : "#999999"}`} style={{ marginLeft: "10px" }} />
              <strong style={{ color: `${openTab === "etc" ? appColor1 : "#999999"}` }}>기타관리</strong>
            </li>
            {openTab === "etc" && (
              <ul>
                <li className={`${location.pathname === "/inquirys" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/inquirys")}>1:1 문의내역</li>
                <li className={`${location.pathname === "/term" ? "select-sub-menu" : "sub-menu"}`} onClick={() => navigate("/term")}>이용약관</li>
              </ul>
            )}
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
