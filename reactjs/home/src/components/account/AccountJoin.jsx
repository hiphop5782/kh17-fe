import Jumbotron from "@templates/Jumbotron";
import { useCallback } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FaAsterisk } from "react-icons/fa6";

export default function AccountJoin() {
    //state
    const [account, setAccount] = useState({
        accountId: "",
        accountPassword: "",
        accountPassword2: "",
        accountEmail: "",
        accountNickname: "",
        accountBirth: "",
        accountContact: "",
        accountPost: "",
        accountAddress1: "",
        accountAddress2: "",
        accountMessage: ""
    });

    const [result, setResult] = useState({
        accountId: null,
        accountPassword: null,
        accountPassword2: null,
        accountEmail: null,
        accountNickname: null,
        accountBirth: null,
        accountContact: null,
        accountPost: null,
        accountAddress1: null,
        accountAddress2: null,
        accountMessage: null
    });

    //callback
    //- 입력
    const changeStringValue = useCallback(e=>{
        const { name , value } = e.target;
        setAccount(prev=>({
            ...prev,
            [name] : value
        }));
    }, []);

    //- 검사
    const checkAccountId = useCallback(e=>{
        const regex = /^[a-z][a-z0-9]{4,19}$/;
        const valid = regex.test(account.accountId);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev=>({...prev, accountId : clazz}));
    }, [account]);

    //view
    return (<>
        <Jumbotron title="가입 정보 입력" content="부정확한 정보 입력이 확인된 경우 계정 이용이 제한될 수 있습니다"/>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>아이디</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountId"
                    value={account.accountId} onChange={changeStringValue}
                    placeholder="알파벳 소문자 시작, 숫자 포함 5-20자 이내"
                    onBlur={checkAccountId}
                    className={result.accountId}/>
                <div className="valid-feedback">아이디 설정이 완료되었습니다</div>
                <div className="invalid-feedback">형식오류 or 사용중</div>
            </Col>
        </Row>
    </>)
}