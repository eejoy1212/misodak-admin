import { axiosInstance } from "./base";

// 기획전 목록 가져오기
export const getExhibits = async (page:number) => {
    const { data } = await axiosInstance.get(`/v1/admin/exhibition/${page}`);
    return data;
  };
  // 기획전 카테고리 가져오기
export const searchGetExhibits = async (page:number,keyword:string) => {
  const { data } = await axiosInstance.get(`/v1/admin/exhibition/search/${page}?keyword=${keyword}`);
  return data;
};
// 기획전을 활성/비활성화하는 함수
export const putActivateExhibit = async (id: number) => {
  const { data } = await axiosInstance.put(`/v1/admin/exhibition/activate/${id}`);
  
  return data;
};
// 기획전을 수정하는 함수
export const putEditExhibit = async (editedExhibit:any) => {
  console.log("editedExhibit",
    editedExhibit)
  const { data } = await axiosInstance.put(`/v1/admin/exhibition`,{
    editedExhibit
  });
  
  return data;
};
// 기획전을 삭제하는 함수
export const deleteExhibit = async (id: number) => {
  console.log("Delete 기획전>>>",id)
  const { data } = await axiosInstance.delete(`/v1/admin/exhibition/${id}`);
  return data;
};
//기획전 추가
export const postAddExhibit=async(formData:any)=>{
  console.log("form Data>>>",formData)
  const { data } = await axiosInstance.post('/v1/admin/exhibition', 
    formData,
    {
  headers: {
      'Content-Type': 'multipart/form-data'
  }
  });
  return { data };
}
