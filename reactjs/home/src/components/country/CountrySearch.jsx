import Jumbotron from "@templates/Jumbotron";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import axios from "axios";

export default function CountrySearch() {
    //state
    const [keyword, setKeyword] = useState("");
    const [searchList, setSearchList] = useState([]);

    //callback
    const changeKeyword = useCallback(e=>{
        setKeyword(e.target.value);
    }, []);

    useEffect(()=>{
        searchKeyword();
    }, [keyword]);

    const searchKeyword = useCallback(async ()=>{
        if(keyword.length === 0) {
            setSearchList([]);
            return;
        }

        const response = await axios.get(`/api/country/countryName/${keyword}`);
        setSearchList(response.data);
    }, [keyword]);

    return (<>
        <Jumbotron title="국가명 검색 샘플"/>

        {/* 검색창 */}
        <Row className="mt-4">
            <Col>
                <div className="position-relative">
                    <Form.Control placeholder="검색어 입력" size="lg"
                        value={keyword} 
                        onChange={changeKeyword}/>
                    <ListGroup className="position-absolute start-0 end-0 top-100">
                        {searchList.map(country=>(
                        <ListGroup.Item key={country.countryNo}>
                            {country.countryName}
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col>
                <h2>결과가 표시될 영역</h2>
            </Col>
        </Row>
    </>)
}