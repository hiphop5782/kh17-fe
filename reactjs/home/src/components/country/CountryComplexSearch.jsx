import Jumbotron from "@templates/Jumbotron"
import { useCallback } from "react";
import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { FaMagnifyingGlass } from "react-icons/fa6"
import axios from "axios";

export default function CountryComplexSearch() {
    //state
    const [condition, setCondition] = useState({
        countryRegions : [],
        countryName : "",
        countryCapital : "",
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

    const checkCountryRegion = useCallback(e=>{
        console.log(e.target.checked, e.target.value);
    }, []);

    //view
    return (<>
        <Jumbotron title="국가 복합 검색 예제" content="조건이 있을지 없을지 모르는 형태를 처리해봅시다"/>

        {/* 검색 화면 */}
        <Row className="mt-4">
            <Form.Label column sm={3}>대륙</Form.Label>
            <Col sm={9}>
                <Form.Check type="checkbox" value={"아시아"} label="아시아" onChange={checkCountryRegion} checked={condition.countryRegions.includes("아시아")}/>
                <Form.Check type="checkbox" value={"아프리카"} label="아프리카" onChange={checkCountryRegion} checked={condition.countryRegions.includes("아프리카")}/>
                <Form.Check type="checkbox" value={"북아메리카"} label="북아메리카" onChange={checkCountryRegion} checked={condition.countryRegions.includes("북아메리카")}/>
                <Form.Check type="checkbox" value={"남아메리카"} label="남아메리카" onChange={checkCountryRegion} checked={condition.countryRegions.includes("남아메리카")}/>
                <Form.Check type="checkbox" value={"오세아니아"} label="오세아니아" onChange={checkCountryRegion} checked={condition.countryRegions.includes("오세아니아")}/>
                <Form.Check type="checkbox" value={"유럽"} label="유럽" onChange={checkCountryRegion} checked={condition.countryRegions.includes("유럽")}/>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>국가명</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" value={condition.countryName}
                        name="countryName" onChange={changeStringValue}/>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>수도명</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" value={condition.countryCapital}
                        name="countryCapital" onChange={changeStringValue}/>
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