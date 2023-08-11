import {axiosServer} from "./server";

// 게시글 목록
export const getArticles = async () => {
  const res = await axiosServer().get<any>(`/articles/`);
  return res.data;
}

// 게시글 상세 내용 
export const getArticleDetail = async (articleNo: number) => {
  const res = await axiosServer().get<any>(`/articles/${articleNo}`);
  return res.data;
}

// 게시글 작성
export const registArticle = async (article: Object) => {
  const res = await axiosServer().post<any>(`/articles/`, article);
}

// 게시글 수정
export const updateArticle = async (article: Object) => {
  const res = await axiosServer().put<any>(`/articles`, article);
}

// 게시글 삭제
export const deleteArticle = async (articleNo: number) => {
  const res = await axiosServer().delete<any>(`/articles/${articleNo}`);
}

// 댓글 목록
export const getComments = async (articleNo: number) => {
  const res = await axiosServer().get<any>(`/comments/${articleNo}`);
  return res.data;
}

// 댓글 작성
export const registComment = async (comment: Object) => {
  const res = await axiosServer().post<any>(`/comments`);
}

// 댓글 수정
export const updateComment = async (comment: Object) => {
  const res = await axiosServer().put<any>(`/comments`);
}

// 댓글 삭제
export const deleteComment = async (commentNo: number) => {
  const res = await axiosServer().delete<any>(`/comments/${commentNo}`);
}