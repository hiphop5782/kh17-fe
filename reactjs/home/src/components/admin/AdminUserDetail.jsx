import Jumbotron from "@templates/Jumbotron"
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom"
import { apiClient } from "@utils/reaxios";
import { Button, Col, Placeholder, Row } from "react-bootstrap";

export default function AdminUserDetail() {
    
    //딱 한번만 최초 시점에 그 누구보다 빠르게 불러오는 처리 담당 (변경 불가)
    const { accountId } = useParams();

    const [account, setAccount] = useState(null);
    useEffect(()=>{
        loadData();
    }, []);

    const loadData = useCallback(async ()=>{
        const { data } = await apiClient.get(`/account/${accountId}`);
        setAccount(data);
    }, []);

    //주소를 완성해서 반환하는 메모
    const unionAddress = useMemo(()=>{
        if(account === null) return "";
        if(account.accountPost === null) return "";
        if(account.accountAddress1 === null) return "";
        if(account.accountAddress2 === null) return "";
        return `[${account.accountPost}] ${account.accountAddress1} ${account.accountAddress2}`;
    }, [account]);

    //로딩중인 화면을 따로 보여줄 때
    // if(account === null) {
    //     return (<h1>로딩중인 화면</h1>)
    // }


    //로딩완료시 화면
    return (<>
        
        <Jumbotron title={`${account?.accountNickname ?? ""}님의 개인 정보`}/>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">아이디</Col>
            <Col sm={9} className="text-secondary">
                {account === null ? (
                <Placeholder as="span" animation="glow">
                    <Placeholder xs={2}/>
                </Placeholder>
                ) : (
                <span>{account?.accountId}</span>
                )}
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">닉네임</Col>
            <Col sm={9} className="text-secondary">{account?.accountNickname}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">이메일</Col>
            <Col sm={9} className="text-secondary">{account?.accountEmail}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">생년월일</Col>
            <Col sm={9} className="text-secondary">{account?.accountBirth}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">연락처</Col>
            <Col sm={9} className="text-secondary">{account?.accountContact}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">주소</Col>
            <Col sm={9} className="text-secondary">{unionAddress}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">등급</Col>
            <Col sm={9} className="text-secondary">{account?.accountLevel}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">포인트</Col>
            <Col sm={9} className="text-secondary">
                {account?.accountPoint.toLocaleString()} point
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">가입일</Col>
            <Col sm={9} className="text-secondary">{account?.accountJoin}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종로그인</Col>
            <Col sm={9} className="text-secondary">{account?.accountLogin}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종변경일</Col>
            <Col sm={9} className="text-secondary">{account?.accountChange}</Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">상태메세지</Col>
            <Col sm={9} className="text-secondary">{account?.accountMessage}</Col>
        </Row>

    </>)
}