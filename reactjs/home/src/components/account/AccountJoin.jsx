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

    const checkAccountPassword = useCallback(e=>{
        //비밀번호 검사
        const regex = /^(?=.*?[A-Z]+)(?=.*?[a-z]+)(?=.*?[0-9]+)(?=.*?[\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\'\"\`\~\<\>\.\,\/\?\\\|]+)[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\'\"\`\~\<\>\.\,\/\?\\\|]{8,16}$/;
        const valid = regex.test(account.accountPassword);
        const clazz = valid ? "is-valid" : "is-invalid";
        
        //비밀번호 확인 검사
        const valid2 = account.accountPassword.length > 0 
                    && account.accountPassword === account.accountPassword2;
        const clazz2 = valid2 ? "is-valid" : "is-invalid";

        //결과 변경
        setResult(prev=>({
            ...prev,
            accountPassword : clazz,
            accountPassword2 : clazz2
        }));
    }, [account]);

    const checkAccountEmail = useCallback(e=>{
        const regex = /^([a-z][a-z0-9]{4,19})@([A-Za-z0-9\-\.]{1,})(\.[a-z]{2,3})$/;
        const valid = regex.test(account.accountEmail);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev=>({
            ...prev,
            accountEmail : clazz
        }));
    }, [account]);

    const checkAccountNickname = useCallback(e=>{
        const regex = /^[가-힣A-Za-z0-9]{1,10}$/;
        const valid = regex.test(account.accountNickname);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev=>({
            ...prev,
            accountNickname : clazz
        }));
    }, [account]);

    const checkAccountBirth = useCallback(e=>{
        const regex = /^([0-9]{4})-(((02)-(0[1-9]|1[0-9]|2[0-9]))|((0[469]|11)-(0[1-9]|1[0-9]|2[0-9]|30))|((0[13578]|1[02])-(0[1-9]|1[0-9]|2[0-9]|3[01])))$/;
        const valid = account.accountBirth.length === 0 || regex.test(account.accountBirth);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev=>({
            ...prev,
            accountBirth : clazz
        }));
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

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>비밀번호</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="password" name="accountPassword"
                    value={account.accountPassword} onChange={changeStringValue}
                    placeholder="대문자,소문자,숫자,특수문자 포함 8-16자 이내"
                    onBlur={checkAccountPassword}
                    className={result.accountPassword}/>
                <div className="valid-feedback">비밀번호 설정이 완료되었습니다</div>
                <div className="invalid-feedback">영문 대/소문자, 숫자, 특수문자를 반드시 포함하여 작성하세요</div>
            </Col>
        </Row>

        <Row className="mt-2">
            <Form.Label column sm={3}>
                <span>비밀번호 확인</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="password" name="accountPassword2"
                    value={account.accountPassword2} onChange={changeStringValue}
                    placeholder="비밀번호를 한 번 더 입력하세요"
                    onBlur={checkAccountPassword}
                    className={result.accountPassword2}/>
                <div className="valid-feedback">비밀번호가 일치합니다</div>
                <div className="invalid-feedback">비밀번호를 입력하지 않았거나 일치하지 않습니다</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>이메일</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" inputMode="email" name="accountEmail"
                    value={account.accountEmail} onChange={changeStringValue}
                    placeholder="test@email.com"
                    onBlur={checkAccountEmail}
                    className={result.accountEmail}/>
                <div className="valid-feedback">이메일 인증 완료</div>
                <div className="invalid-feedback">올바르지 않거나 사용중인 이메일</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>닉네임</span>
                <FaAsterisk className="text-danger"/>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountNickname"
                    value={account.accountNickname} onChange={changeStringValue}
                    placeholder="한글 또는 숫자 10자 이내"
                    onBlur={checkAccountNickname}
                    className={result.accountNickname}/>
                <div className="valid-feedback">닉네임 설정이 완료되었습니다</div>
                <div className="invalid-feedback">올바르지 않거나 사용중인 닉네임</div>
            </Col>
        </Row>


        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>생년월일</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="date" name="accountBirth"
                    value={account.accountBirth} onChange={changeStringValue}
                    onBlur={checkAccountBirth}
                    className={result.accountBirth}/>
                {/* <div className="valid-feedback"></div> */}
                <div className="invalid-feedback">날짜 형식이 올바르지 않습니다</div>
            </Col>
        </Row>
    </>)
}