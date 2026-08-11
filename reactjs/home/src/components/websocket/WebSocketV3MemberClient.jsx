import { Client } from "@stomp/stompjs";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import SockJS from "sockjs-client";
import { loginUserState } from "@utils/storage";
import { Button, Col, Row, Form } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa6";
import Jumbotron from "@templates/Jumbotron";

export default function WebSocketV3MemberClient() {

    const [client, setClient] = useState(null);//서버와의 연결정보를 가진 객체
    const loginUser = useAtomValue(loginUserState);
    const [history, setHistory] = useState([]);//메세지 이력
    const [input, setInput] = useState("");//사용자의 입력

    useEffect(()=>{
        //최초 1회 실행해야할 작업
        const client = connectToServer();
        setClient(client);

        //페이지 이탈 시 해야할 작업
        return ()=>{
            disconnectFromServer(client);
            setClient(null);
        };
    }, []);

    //연결 함수
    const connectToServer = useCallback(()=>{
        //연결(socket) 생성
        const socket = new SockJS(`${import.meta.env.VITE_SERVER_URL}/ws-member`);

        //연결을 관리할 도구(client) 생성하여 반환
        const client = new Client({
            //연결 객체를 생성하는 함수
            webSocketFactory : () => socket , 
            
            //웹소켓의 상황별 Callback 지정
            onConnect: ()=>{//연결되었을 때
                //채널구독 및 수신작업 안내
                client.subscribe("/public/chat", (message)=>{
                    const json = JSON.parse(message.body);
                    setHistory(prev=>[...prev, json]);
                });
                client.subscribe(`/private/dm/${loginUser.accountId}`, (message)=>{
                    const json = JSON.parse(message.body);
                    setHistory(prev=>[...prev, json]);
                });
            },
            //디버깅 설정(옵션)
            debug: (str)=>console.log(str)
        });

        //클라이언트 활성화
        client.activate();

        return client;
    }, []);
    //연결 종료 함수
    const disconnectFromServer = useCallback((client)=>{
        if(client) {//client가 존재한다면
            client.deactivate();//비활성화
        }
    }, []);

    //메세지 전송 함수
    const sendMessage = useCallback(()=>{
        //보낼 수 있는 상태인지를 검증
        if(isConnect === false) return;
        if(input.trim() === "") return;

        //메세지 전송을 위한 JSON 데이터 생성
        const json = { content : input };

        //STOMP 규격에 맞는 메세지 생성
        const stompMessage = {
            destination: "/app/chat",//서버로 보낼 목적지
            body: JSON.stringify(json),//전송할 내용 (직렬화된 JSON)
        };

        //전송
        client.publish(stompMessage);
        setInput("");//입력값 청소
    }, [client, input]);

    //client가 연결중인지 확인하는 메모
    const isConnect = useMemo(()=>{
        if(client === null) return false;//client가 없는 경우
        if(client.active === false) return false;//deactivate() 상태인 경우
        return true;
    }, [client]);

    return (<>
        <Jumbotron title="WebSocket Version 3" content="인증된 사용자끼리의 웹소켓 통신 구현"/>

        <Row className="mt-5">
            <Form.Label column sm={3}>메세지 입력</Form.Label>
            <Col sm={9}>

                <div className="d-flex">
                    {/* 입력창과 버튼은 연결이 활성화 되어있을 경우에만 사용 가능하도록 설정 */}
                    <Form.Control type="text" disabled={isConnect === false}
                            value={input} 
                            onChange={e=>setInput(e.target.value)}
                            onKeyUp={e=>{
                                //엔터를 누르면 전송버튼과 동일한 기능을 실행
                                if(e.key === "Enter") sendMessage();
                            }}
                    />

                    <Button variant="success" className="text-nowrap ms-2" 
                            disabled={isConnect === false} onClick={sendMessage}>
                        <FaPaperPlane/>
                        <span className="ms-2 d-none d-sm-inline">전송</span>
                    </Button>
                </div>


            </Col>
        </Row>
    </>);
}