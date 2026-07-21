//Axios를 백엔드 인증 구조에 맞게 분할 및 개조하여 사용할 수 있도록 처리하여 제공하는 파일
import axios from "axios";

//기본 정보 설정
const baseURL = import.meta.env.VITE_SERVER_URL; //기본 주소

//상황별로 쓰일 Axios 객체를 생성하여 내보내기
//[1] 인증용 Axios 객체
export const authClient = axios.create({
    baseURL : `${baseURL}/service/auth`,
    timeout : 3000,
    withCredentials : true
});

//[2] 인증 메일용 Axios 객체
export const certClient = axios.create({
    baseURL : `${baseURL}/service/cert`,
    timeout : 10000,
    withCredentials : false
});

//[3] API 요청용 Axios 객체
export const apiClient = axios.create({
    baseURL : `${baseURL}/api`,
    timeout : 5000,
    withCredentials : true
});


//(추가) [3]번 API 요청용 Axios객체의 요청이 실패한 상황 중 응답코드가 401번인 경우 갱신 요청
//- axios에는 interceptor라는 기능이 존재
//- axios 공식 사이트에서 제공하는 interceptor 구문을 가져다가 수정

// 응답에 대한 인터셉터
apiClient.interceptors.response.use(
  response=>response,
  //요청이 실패한 경우만 분석해서 재작업을 지시
  function (error) {
    // console.log(Object.keys(error));//error 객체의 모든 필드명을 배열로 출력
    // console.log(error?.response?.status);
    if(error?.response?.status !== 401) {
        //통과
        return Promise.reject(error);
    }

    //401인 상황 (=나는 로그인되어있다고 생각하는데 서버가 아니라고 하는 상황)
    //→ Refresh로 요청을 보내서 나온 결과로 갈아끼워서 응답을 완수시킨다
    console.log("액세스 토큰 만료됨 → 갱신 요청 시작");
    console.log(error.config);//원래 요청정보


    return Promise.reject(error);
  }
);