import Jumbotron from "@templates/Jumbotron"
import { useCallback } from "react";
import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6"
import { TbTilde } from "react-icons/tb";
import axios from "axios";
import { useMemo } from "react";
import { toast } from "react-toastify";

export default function CountryComplexSearch() {
    //state
    const [condition, setCondition] = useState({
        countryRegions : [],
        countryName : "",
        countryCapital : "",
        minCountryPopulation: "",
        maxCountryPopulation: "",
        size:10,
        orders:[
            // "country_population desc",
            // "country_name asc",
        ]
    });

    //callback
    const changeStringValue = useCallback(e=>{
        const { name, value } = e.target;
        setCondition(prev=>({
            ...prev,
            [name] : value
        }));
    }, []);
    const changeNumericValue = useCallback(e=>{
        const { name, value } = e.target;
        const replacement = value.replace(/[^0-9]+/g, "");
        setCondition(prev=>({
            ...prev,
            [name] : replacement
        }));
    }, []);

    const send = useCallback(async ()=>{
        const response = await axios.post("/api/country/complexSearch", condition);
        console.log(response.data);
    }, [condition]);

    const checkCountryRegion = useCallback(e=>{
        //console.log(e.target.checked, e.target.value);
        //true면 추가, false면 제거
        const { checked, value } = e.target;

        const clone = [...condition.countryRegions];
        const clone2 = checked ? [...clone, value] : clone.filter(region=> region !== value);

        setCondition({ ...condition, countryRegions:clone2 });
    }, [condition]);

    //state는 변경이 가능하므로 변경 불가능한건 memo로 생성할 수도 있다
    //const [orderList, setOrderList] = useState(["..."]);
    const orderList = useMemo(()=>{
        return [
            "country_name asc",
            "country_population desc",
            "country_capital asc"
        ];
    }, []);

    //선택 가능한 목록 : orderList의 항목 중에 condition.orders에 없는 요소들만 검색하여 반환
    const availableOrderList = useMemo(()=>{
        return orderList.filter(order=>!condition.orders.includes(order));
    }, [orderList, condition.orders]);

    //condition 중에서 orders에 한 개의 데이터를 추가
    const addOrder = useCallback(e=>{
        if(availableOrderList.length === 0){
            toast.error("더 이상 추가가 불가능합니다");
            return;
        }

        const clone = [...condition.orders];
        const clone2 = [...clone, availableOrderList[0]];
        setCondition({...condition, orders : clone2});
    }, [condition, availableOrderList]);

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
            <Form.Label column sm={3}>인구수</Form.Label>
            <Col sm={9}>
                <div className="d-flex align-items-center">
                    <Form.Control type="text" name="minCountryPopulation"
                            value={condition.minCountryPopulation}
                            onChange={changeNumericValue}/>
                    <TbTilde className="mx-2" size={30}/>
                    <Form.Control type="text" name="maxCountryPopulation"
                            value={condition.maxCountryPopulation}
                            onChange={changeNumericValue}/>
                </div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>검색 개수</Form.Label>
            <Col sm={9}>
                <Form.Select name="size" value={condition.size} onChange={changeNumericValue}>
                    <option value={""}>한번에 보기</option>
                    <option value={10}>10개씩 보기</option>
                    <option value={20}>20개씩 보기</option>
                    <option value={50}>50개씩 보기</option>
                    <option value={100}>100개씩 보기</option>
                </Form.Select>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3} className="d-inline-flex align-items-center">
                <span>정렬 방식</span>
                <FaPlus className="ms-2 text-info" onClick={addOrder}/>
            </Form.Label>
            <Col sm={9}>
                {condition.orders.length === 0 ? (
                <span>기본값(번호순)</span>
                ) : (<>
                {/* condition.orders의 내용을 반복적으로 출력 */}
                <ul>
                    {condition.orders.map((order, index)=>(
                    <li key={index}>{order}</li>
                    ))}
                </ul>
                </>)}
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