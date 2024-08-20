import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DashboardLayout } from './Layout/DashboardLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from './Page/Main';
import { Hospital } from './Page/Hospital';
import { HospitalRegister } from './Page/HospitalRegister';
import { ForbiddenManage } from './Page/ForbiddenManage';
import { Urls } from './Page/Urls';
import { UrlRegister } from './Page/UrlRegister';
import { ExhibitRegister } from './Page/ExhibitRegister';
import { Exhibit } from './Page/Exhibit';
import { AppPushCreate } from './Page/AppPushCreate';
import { AppPushs } from './Page/AppPush';
import { Users } from './Page/Users';
import { Inquirys } from './Page/Inquirys';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter(

  [

{
  element:<DashboardLayout />,
  //내부 화면만 교체
  children:[
{
      
  path: "/",
  element: <Main/>
},
{
      
  path: "/hospital",
  element: <Hospital/>
},
{
      
  path: "/hospital-register",
  element: <HospitalRegister/>
},

{
      
  path: "/forbidden-manage",
  element: <ForbiddenManage/>
},
{
      
  path: "/url-create",
  element: <UrlRegister/>
},
{
      
  path: "/urls",
  element: <Urls/>
},
{
      
  path: "/exhibit-create",
  element: <ExhibitRegister/>
},
{
      
  path: "/exhibit",
  element: <Exhibit/>
},
{
      
  path: "/apppush-create",
  element: <AppPushCreate/>
},
{
      
  path: "/apppushs",
  element: <AppPushs/>
},
{
      
  path: "/users",
  element: <Users/>
},
{
      
  path: "/inquirys",
  element: <Inquirys/>
},
]
}

],

);
root.render(
  <React.StrictMode>
  <RouterProvider   router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
