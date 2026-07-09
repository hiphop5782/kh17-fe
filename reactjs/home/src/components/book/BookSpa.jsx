import Jumbotron from "@templates/Jumbotron";
import { useCallback } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Badge, Button, Col, ListGroup, Modal, Row } from "react-bootstrap";
import { FaPlus, FaChevronDown } from "react-icons/fa6";
import axios from "axios";

export default function BookSpa() {
    //모달을 띄우기 위한 state
    const [modal, setModal] = useState(false);

    const closeModal = useCallback(() => {

        setModal(false);
    }, []);

    //목록
    const [bookList, setBookList] = useState([]);
    const [last, setLast] = useState(false);
    const [size, setSize] = useState(10);
    const lastBookId = useMemo(()=>{
        return bookList.length > 0 ? bookList[bookList.length-1].bookId : 0;
    }, [bookList]);
    const loadList = useCallback(async ()=>{
        //const response = await axios.get(`/api/book/lastBookId/${lastBookId}/size/${size}`);
        const response = await axios.post(
            "/api/book/list-more", 
            { lastNo : lastBookId , size : size }
        );
        //setBookList(response.data.list);//덮어쓰기
        setBookList([...bookList, ...response.data.list]);//이어쓰기
        setLast(response.data.last);
    }, [lastBookId, size, bookList]);
    useEffect(()=>{
        loadList();
    }, []);

    //등록


    return (<>
        <Jumbotron title="도서 CRUD 통합 구현" content="한 페이지에서 CRUD를 모두 처리해봅니다" />

        {/* 등록을 위한 모달을 띄우는 버튼 */}
        <Row className="mt-4">
            <Col className="text-end">
                <Button variant="success" onClick={e => setModal(true)}>
                    <FaPlus />
                    <span>신규 등록</span>
                </Button>
            </Col>
        </Row>

        {/* 목록 */}
        <Row className="mt-4">
            <Col>
                <ListGroup>
                    {bookList.map(book=>(
                    <ListGroup.Item key={book.bookId}>
                        <div className="p-4">
                            <h2 className="d-flex align-items-end">
                                <Badge>{book.bookId}</Badge>
                                <span className="ms-2">{book.bookTitle}</span>
                                <small className="text-muted ms-4 fs-5">{book.bookGenre}</small>
                            </h2>
                            <hr/>
                            <p className="text-muted">
                                <span>{book.bookAuthor || "작자 미상"}</span>
                                <span className="ms-4">{book.bookPublisher}</span>
                            </p>
                            <p className="mt-2">도서에 대한 설명........</p>
                            <hr/>
                            <p className="text-info">
                                <span className="me-4">{book.bookPrice.toLocaleString()}원</span>
                                <span className="me-4">{book.bookPageCount.toLocaleString()}p</span>
                                {book.bookPublicationDate && (
                                    <span>{book.bookPublicationDate} 출간</span>
                                )}                                
                            </p>
                        </div>
                    </ListGroup.Item>
                    ))}

                </ListGroup>

                {/* 더보기 */}
                { last !== true && (
                    <Button variant="outline-info" className="w-100" onClick={loadList}>
                        <FaChevronDown/>
                        <span className="mx-2">더보기</span>
                        <FaChevronDown/>
                    </Button>
                ) }
            </Col>
        </Row>


        {/* 모달 */}
        <Modal
            show={modal}
            onHide={closeModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                I will not close if you click outside me. Do not even try to press
                escape key.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button>
            </Modal.Footer>
        </Modal>
    </>)
}