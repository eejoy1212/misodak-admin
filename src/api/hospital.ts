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
export const searchHospital = async (keyword: string, page: number, size: number, sort: string[] = []) => {
  const sortParams = sort.join(',');

  const url = `/v1/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}&sort=${sortParams}`;

  const { data } = await axiosInstance.get(url);

  return data;
};