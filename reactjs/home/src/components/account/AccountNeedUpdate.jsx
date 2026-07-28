import Jumbotron from "@templates/Jumbotron";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AccountNeedUpdate() {

    return (<>
        <Jumbotron title="비밀번호 변경 필요 안내"/>

        <Row className="mt-5">
            <Col>
                비밀번호를 변경한지 오래되어 보안상 위험할 수 있습니다.<br/>
                변경을 권장합니다.
            </Col>
        </Row>
        <Row className="mt-5">
            <Col>
                <Button as={Link} to={"/account/password"} 
                                variant="success" size="lg"
                                className="w-100">
                    비밀번호 변경하기
                </Button>

                <Button variant="secondary" size="lg"
                                className="w-100 mt-2">
                    나중에 변경하기
                </Button>
            </Col>
        </Row>
    </>)
}