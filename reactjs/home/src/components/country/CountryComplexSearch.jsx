import Jumbotron from "@templates/Jumbotron"
import { useCallback } from "react";
import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { FaMagnifyingGlass } from "react-icons/fa6"
import axios from "axios";

export default function CountryComplexSearch() {
    //state
    const [condition, setCondition] = useState({
        countryName : "",
    });

    //callback
    const changeStringValue = useCallback(e=>{
        const { name, value } = e.target;
        setCondition(prev=>({
            ...prev,
            [name] : value
        }));
    }, []);

    const send = useCallback(async ()=>{
        const response = await axios.post("/api/country/complexSearch", condition);
        console.log(response.data);
    }, [condition]);

    //view
    return (<>
        <Jumbotron title="국가 복합 검색 예제" content="조건이 있을지 없을지 모르는 형태를 처리해봅시다"/>

        {/* 검색 화면 */}
        <Row className="mt-4">
            <Form.Label column sm={3}>국가명</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" value={condition.countryName}
                        name="countryName" onChange={changeStringValue}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col>
                <Button variant="success" size="lg" className="w-100"
                        onClick={send}>
                    <FaMagnifyingGlass className="me-2"/>
                    <span>검색하기</span>
                </Button>
            </Col>
        </Row>

        {/* 검색 결과 표시 */}
    </>)
}