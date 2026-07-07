import { Link, Navigate, useParams } from "react-router-dom";
import Jumbotron from "../../templates/Jumbotron";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";


export default function LectureDetail() {
    //파라미터 처리
    const { lectureNo } = useParams();
    if(/^[0-9]+$/.test(lectureNo) === false) {
        return <Navigate to="/lecture/list" replace/>
    }

    //화면 처리
    const [lecture, setLecture] = useState(null);
    useEffect(()=>{
        loadData();
    }, []);

    // [1] 일반 함수에서 비동기 작업을 호출 : .then() 으로 후속작업을 지정
    // const loadData = useCallback(()=>{
    //     axios({
    //         //url:`http://localhost:8080/api/lecture/detail/${lectureNo}`,//경로변수일때
    //         url:`http://localhost:8080/api/lecture/detail`,//쿼리스트링일때 (+params 사용)
    //         method:"get",
    //         params:{ lectureNo : lectureNo }
    //     })
    //     .then(response=>{
    //         setLecture(response.data);
    //     });
    // }, []);

    // [2] 비동기 함수를 사용
    // - 함수 앞에 async 키워드를 추가
    // - then 대신 await 키워드 사용 가능
    const loadData = useCallback(async ()=>{
        // const response = await axios({
        //     url:`http://localhost:8080/api/lecture/detail/${lectureNo}`,
        //     method:"get"
        // });
        const response = await axios.get(`http://localhost:8080/api/lecture/detail/${lectureNo}`);
        setLecture(response.data);
    }, []);


    return (<>
        <Jumbotron title="강좌 상세 정보"/>

        { lecture === null ? (<>
            <h1>로딩중입니다...</h1>
        </>) : (<>
            <Row className="mt-4 fs-4">
                <Col sm={3} className="text-info fw-bold">
                    분류
                </Col>
                <Col sm={9}>
                    {lecture.lectureCategory}
                </Col>
            </Row>
            <Row className="mt-4 fs-4">
                <Col sm={3} className="text-info fw-bold">
                    강좌명
                </Col>
                <Col sm={9}>
                    {lecture.lectureTitle}
                </Col>
            </Row>
            <Row className="mt-4 fs-4">
                <Col sm={3} className="text-info fw-bold">
                    강의시간
                </Col>
                <Col sm={9}>
                    {lecture.lectureDuration} 시간
                </Col>
            </Row>
            <Row className="mt-4 fs-4">
                <Col sm={3} className="text-info fw-bold">
                    수강료
                </Col>
                <Col sm={9}>
                    {lecture.lecturePrice.toLocaleString()} KRW
                </Col>
            </Row>
            <Row className="mt-4 fs-4">
                <Col sm={3} className="text-info fw-bold">
                    수업방식
                </Col>
                <Col sm={9}>
                    {lecture.lectureType}
                </Col>
            </Row>

            <Row className="mt-5">
                <Col className="text-end">
                    <Button className="ms-2" variant="danger">삭제하기</Button>
                    <Button className="ms-2" variant="warning">수정하기</Button>
                    <Button className="ms-2" variant="secondary" as={Link} to={"/lecture/list"}>목록으로</Button>
                </Col>
            </Row>

        </>) }
    </>)
}