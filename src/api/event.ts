import { axiosInstance } from "./base";

// 이벤트 목록 가져오기
export const getEvents = async (page:number) => {
    const { data } = await axiosInstance.get(`/v1/admin/event/${page}`);
    return data;
  };
  // 이벤트 목록 검색
export const searchGetEvents = async (page:number,keyword:string) => {
  const { data } = await axiosInstance.get(`/v1/admin/event/search/${page}?keyword=${keyword}`);
  return data;
};
// 이벤트 csv
export const downloadCsvGetEvent = async () => {
  const response = await axiosInstance.get('/v1/admin/event/csv', {
    responseType: 'blob', // CSV 파일을 받기 위해 'blob'으로 설정
  });
  return response;
};
