import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://15.164.184.13:8080",
});
// prevent CORS error
axios.defaults.withCredentials = true;

// 병원 목록 가져오기
export const getHospital = async () => {
  const { data } = await axiosInstance.get("/v1/hospitals");
  return data;
};

// 특정 카테고리의 병원 목록 가져오기
export const getDepHospital = async (category: string) => {
  const { data } = await axiosInstance.get(`/v1/hospitals/${category}`);
  return data;
};

// 검색을 통한 병원 목록 가져오기 (페이지네이션 포함)
// export const searchHospital = async (keyword: string, page: number, size: number, sort: string[] = []) => {
//   const sortParams = sort.join(',');

//   const url = `/v1/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}&sort=${sortParams}`;

//   const { data } = await axiosInstance.get(url);

//   return data;
// };
// 병원을 검색하는 함수
export const searchHospitals = async (keyword: string, pageable: { page: number; size: number; sort: string }) => {
  console.log("pageable>>>",pageable)
   const url = `/v1/search?keyword=${encodeURIComponent(keyword)}&page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}`
  const { data } = await axiosInstance.get(url);
  console.log("search>>>",data)
  return data;
};

// 병원을 활성/비활성화하는 함수
export const putActivateHospital = async (id: number) => {
  const { data } = await axiosInstance.put(`/v1/admin/hospital/activate/${id}`);
  
  return data;
};
// 병원을 수정하는 함수
export const putEditHospital = async (id: number,dutyName:string,city:string,location:string,dutyAddr:string,dutyDivNam:string,tags:string,dutyInf:string) => {
  console.log("putEditHospital",
    id,
    dutyName,
    city,
    location,
    dutyAddr,
    dutyDivNam,
    tags,
    dutyInf)
  const { data } = await axiosInstance.put(`/v1/admin/hospital`,{
    id,
    dutyName,
    city,
    location,
    dutyAddr,
    dutyDivNam,
    tags,
    dutyInf
  });
  
  return data;
};
// 병원을 등록하는 함수
export const postRegisterHospital = async (dutyName:string, city:string, location:string, dutyAddr:string, dutyDivNam:string, tags:string, dutyInf:string, rnum:string) => {
  console.log("register", dutyName, city, location, dutyAddr, dutyDivNam, tags, dutyInf);

  try {
    const { data } = await axiosInstance.post('/v1/admin/hospital', {
      dutyName,
      city,
      location,
      dutyAddr,
      dutyDivNam,
      tags,
      dutyInf,
      rnum,
    });
    return data;
  } catch (error) {
    console.error("Error registering hospital:", error);
    throw error;
  }
};
// 병원을 삭제하는 함수
export const deleteHospital = async (id: number) => {
  const { data } = await axiosInstance.delete(`/v1/admin/hospital/${id}`);
  return data;
};