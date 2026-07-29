import Jumbotron from "@templates/Jumbotron";
import { useCallback, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { apiClient } from "@utils/reaxios";
import { toast } from "react-toastify";

export default function AdminSaleAdd() {
    //state
    const [sale, setSale] = useState({
        saleName : "",
        saleCategory : "",
        saleOriginalPrice : "",
        saleDiscountPrice : "",
        saleContent : "",
        saleStock : ""
    });

    //callback
    const changeStringValue = useCallback((e)=>{
        const { name, value } = e.target;
        setSale(prev=>({
            ...prev, 
            [name] : value
        }));
    }, []);
    const changeNumericValue = useCallback((e)=>{
        const { name, value } = e.target;
        const replacement = value.replace(/[^0-9]+/g, "");
        const result = replacement.length === 0 ? "" : parseInt(replacement);
        setSale(prev=>({
            ...prev, 
            [name] : result
        }));
    }, []);

    const sendData = useCallback(async ()=>{
        const { data } = await apiClient.post("/sale/", sale);
        toast.success("상품 등록이 완료되었습니다");
        console.log(data);
    }, [sale]);

    //view
    return (<>
        <Jumbotron title="상품 등록" content="상품 등록을 위한 정보를 입력하세요"/>

        <Row className="mt-5">
            <Form.Label column sm={3}>상품명</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="saleName" value={sale.saleName}
                        onChange={changeStringValue} placeholder="e.g., 갤럭시 노트 8"/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>카테고리</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="saleCategory" value={sale.saleCategory}
                        onChange={changeStringValue} placeholder="e.g., 통신기기"/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>정가</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="saleOriginalPrice" value={sale.saleOriginalPrice}
                        onChange={changeNumericValue} placeholder="e.g., 2000000"/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>할인가</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="saleDiscountPrice" value={sale.saleDiscountPrice}
                        onChange={changeNumericValue} placeholder="e.g., 1990000"/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>재고수량</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="saleStock" value={sale.saleStock}
                        onChange={changeNumericValue} placeholder="e.g., 10"/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>상세설명</Form.Label>
            <Col sm={9}>
                <Form.Control as="textarea" rows={6} 
                        name="saleContent" value={sale.saleContent}
                        onChange={changeStringValue} placeholder="상품에 대한 설명 작성"/>
            </Col>
        </Row>

        <Row className="mt-5">
            <Col className="text-end">
                <Button variant="success" size="lg" className="w-md-auto" onClick={sendData}>
                    <FaPlus/>
                    <span className="ms-2">상품 등록하기</span>              
                </Button>
            </Col>
        </Row>
    </>)
}