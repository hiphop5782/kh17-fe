import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import NoImage from "@assets/images/no-image.png";

import { apiClient } from "@utils/reaxios";
import { Link } from "react-router-dom";

export default function SaleList() {
    //data
    const [items, setItems] = useState([]);
    const loadItems = useCallback(async ()=>{
        const { data } = await apiClient.post("/sale/list", {});
        //data는 백엔드에서의 SaleListResponseVO
        setItems(data.items);
    }, []);
    useEffect(()=>{
        loadItems();
    }, []);

    //일회용 계산 함수
    const calculateDiscountPercent = useCallback(({saleOriginalPrice, saleDiscountPrice})=>{
        return 100 - (saleDiscountPrice * 100 / saleOriginalPrice);
    }, []);

    //view
    return (<>
        <Jumbotron title="상품 목록" content="원하는 상품을 클릭하여 상세 정보를 확인하세요!"/>
        
        {/* 상품 목록 - 카드 리스트 형태로 출력 */}
        <Row className="mt-5">
            {items.map(item=>{
            
            //추가 코드 작성 (현재 회차에서만 유효한 코드)
            const { saleOriginalPrice, saleDiscountPrice } = item;
            const percent = saleDiscountPrice * 100 / saleOriginalPrice;
            const discount = 100 - percent;
            const result = discount.toLocaleString();

            return (
            <Col key={item.saleNo} sm={6} md={4} className="mb-4">
                <Card>
                    <Card.Img variant="top" src={NoImage} />
                    <Card.Body>
                        <Card.Title>{item.saleName}</Card.Title>
                        <Card.Text>
                            <div>
                                <Badge bg="info">{item.saleCategory}</Badge>
                            </div>
                            <div className="mt-4 fs-4">
                                <s className="text-muted">{item.saleOriginalPrice.toLocaleString()} 원</s>
                                <br/>
                                <b className="text-danger">{item.saleDiscountPrice.toLocaleString()} 원</b>
                                {/* ( ↓ {100 - item.saleDiscountPrice * 100 / item.saleOriginalPrice} % ) */}
                                {/* ( ↓ {calculateDiscountPercent(item)} %) */}
                                ( ↓ {result} %)
                            </div>
                        </Card.Text>

                        <div className="text-end">
                            <Button variant="primary" as={Link} to={`/sale/detail/${item.saleNo}`}>
                                상세보기 →
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            )})}
        </Row>
    </>)
}