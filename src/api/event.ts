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
// 이벤트 delete
export const deleteUrl = async (id:number) => {
  const response = await axiosInstance.delete(`/v1/admin/event/${id}`);
  return response;
};
// 이벤트 활성화
export const putActivateEvent = async (id:number) => {
  const response = await axiosInstance.put(`/v1/admin/event/activate/${id}`);
  return response;
};
// 이벤트 숨김
export const putVisibleEvent = async (id:number) => {
  const response = await axiosInstance.put(`/v1/admin/event/visible/${id}`);
  return response;
};
// 이벤트 생성
export const postCreateEvent = async (content: { data: any, image: File | null }) => {
  try {
    const formData = new FormData();
    
    // JSON 데이터를 문자열로 변환 후 FormData에 추가
    formData.append('data', JSON.stringify(content.data));
    console.log("data in axios>>>",content.data)
    // 이미지를 FormData에 추가
    if (content.image) {
      formData.append('image', content.image);
    }

    // FormData를 이용해 multipart/form-data로 전송
    const { data } = await axiosInstance.post('/v1/admin/event', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
console.log("data>>>",data)
    return data;
  } catch (error) {
    console.error("이벤트 생성 실패:", error);
    throw error;
  }
};
// 이벤트 수정
export const putUpdateEvent = async (content: { data: any, image: File | null }) => {
  try {
      const formData = new FormData();

      // JSON 데이터를 문자열로 변환 후 FormData에 추가
      formData.append('data', JSON.stringify(content.data));
      console.log("data in axios>>>", content.data);

      // 이미지를 FormData에 추가
      // if (content.image) {
          formData.append('image', content.image??"");
      // }

      // FormData를 이용해 multipart/form-data로 전송
      const { data } = await axiosInstance.put('/v1/admin/event', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      console.log("data>>>", data);
      return data;
  } catch (error) {
      console.error("이벤트 수정 실패:", error);
      throw error;
  }
};