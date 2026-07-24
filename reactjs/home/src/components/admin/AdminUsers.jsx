import Jumbotron from "@templates/Jumbotron"
import { useCallback, useState } from "react"
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { FaEraser, FaMagnifyingGlass } from "react-icons/fa6";
import { apiClient } from "@utils/reaxios";

export default function AdminUsers() {
    //state
    const [condition, setCondition] = useState({
        accountId: "",
        accountNickname : "",
        accountContact : "",
        accountEmail : "",
        accountAddress : "",
        accountBirthBegin : "", accountBirthEnd : "",
        accountJoinBegin : "", accountJoinEnd : "",
        accountLoginBegin : "", accountLoginEnd : "",
        accountLevels : [],
        accountBlock : ""
    });
    const changeStringValue = useCallback(e=>{
        const { name, value } = e.target;
        setCondition(prev=>({
            ...prev,
            [name] : value
        }));
    }, []);

    const [list, setList] = useState([]);
    const [last, setLast] = useState(true);

    //검색
    const sendSearch = useCallback(async e=>{
        e.preventDefault();//기본 form 전송 차단
        
        const { data } = await apiClient.post("/account/search", condition);
        setList(data.list);//덮어쓰기
        // setList(prev=>[...prev, ...data.list]);//이어쓰기
        setLast(data.last);
    }, [condition]);

    //view
    return (<>
        <Jumbotron title="관리자용 회원 검색"/>

        {/* 옵션 입력화면 */}
        <Form onSubmit={sendSearch}>

        <Row className="mt-5">
            <Form.Label column sm={3}>아이디</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountId"
                    value={condition.accountId} onChange={changeStringValue}
                    placeholder="정확히 일치해야 검색"/>
            </Col>
        </Row>
        <Row className="mt-2">
            <Form.Label column sm={3}>닉네임</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountNickname"
                    value={condition.accountNickname} onChange={changeStringValue}
                    placeholder="정확히 일치해야 검색"/>
            </Col>
        </Row>
        <Row className="mt-2">
            <Form.Label column sm={3}>연락처</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountContact" inputMode="tel"
                    value={condition.accountContact} onChange={changeStringValue}
                    placeholder="정확히 일치해야 검색"/>
            </Col>
        </Row>
        <Row className="mt-2">
            <Form.Label column sm={3}>이메일</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountEmail" inputMode="email"
                    value={condition.accountEmail} onChange={changeStringValue}
                    placeholder="일부분만 일치해도 검색"/>
            </Col>
        </Row>
        <Row className="mt-2">
            <Form.Label column sm={3}>주소</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountAddress"
                    value={condition.accountAddress} onChange={changeStringValue}
                    placeholder="일부분만 일치해도 검색"/>
            </Col>
        </Row>

        <Row className="mt-4 text-end">
            <Col>
                {/* 
                <Button type="reset" variant="danger" size="lg"
                        className="w-md-auto">
                    <FaEraser className="me-2"/>
                    <span>초기화</span>
                </Button> 
                */}

                <Button type="submit" variant="success" size="lg"
                        className="w-md-auto">
                    <FaMagnifyingGlass className="me-2"/>
                    <span>검색하기</span>
                </Button>
            </Col>
        </Row>

        </Form>

        <hr/>
        {/* 결과 출력화면 */}
        <Row className="mt-5">
            <Col>
                <Table responsive striped hover className="text-nowrap">
                    <thead>
                        <tr>
                            <th>아이디</th>                            
                            <th>닉네임</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(account=>(
                        <tr key={account.accountId}>
                            <td>{account.accountId}</td>
                            <td>{account.accountNickname}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>

    </>)
}