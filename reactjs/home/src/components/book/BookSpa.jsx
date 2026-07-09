import Jumbotron from "@templates/Jumbotron";
import { useCallback } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Badge, Button, Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";
import { FaPlus, FaChevronDown, FaAsterisk, FaXmark } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

export default function BookSpa() {
    //모달을 띄우기 위한 state
    const [modal, setModal] = useState(false);

    const closeModal = useCallback(() => {
        resetBook();
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
    const [book, setBook] = useState({
        bookTitle:"",
        bookAuthor:"",
        bookPublisher:"",
        bookPublicationDate:"",
        bookPrice:0,
        bookPageCount:0,
        bookGenre:"",
    });
    const [result, setResult] = useState({
        bookTitle:null,
        bookAuthor:null,
        bookPublisher:null,
        bookPublicationDate:null,
        bookPrice:null,
        bookPageCount:null,
        bookGenre:null,
    });

    const changeStringValue = useCallback(e=>{
        const { name, value } = e.target;
        setBook({ ...book , [name]:value });
    }, [book]);
    const changeNumericValue = useCallback(e=>{
        const { name, value } = e.target;
        const replacement = value.replace(/[^0-9]+/g, "");
        const number = parseInt(replacement || 0);
        setBook({ ...book , [name]:number });
    }, [book]);

    const checkBookTitle = useCallback(()=>{
        const valid = book.bookTitle.length > 0;
        setResult({
            ...result,
            bookTitle : valid ? "is-valid" : "is-invalid"
        })
    }, [book, result]);
    const checkBookPublisher = useCallback(()=>{
        setResult({
            ...result,
            bookPublisher : "is-valid"
        })
    }, [book, result]);
    const checkBookAuthor = useCallback(()=>{
        const regex = /^[^!@#$]+$/;
        const valid = book.bookAuthor.length === 0 
                        || regex.test(book.bookAuthor);//없거나 형식에 맞거나
        setResult({
            ...result,
            bookAuthor : valid ? "is-valid" : "is-invalid"
        })
    }, [book, result]);
    const checkBookPublicationDate = useCallback(()=>{
        const regex = /^([0-9]{4})-(((02)-(0[1-9]|1[0-9]|2[0-9]))|((0[469]|11)-(0[1-9]|1[0-9]|2[0-9]|30))|((0[13578]|1[02])-(0[1-9]|1[0-9]|2[0-9]|3[01])))$/;
        const valid = book.bookPublicationDate.length === 0
                        || regex.test(book.bookPublicationDate);
        setResult({
            ...result,
            bookPublicationDate : valid ? "is-valid" : "is-invalid"
        });
    }, [book, result]);
    const checkBookPrice = useCallback(()=>{
        const valid = book.bookPrice >= 0;
        setResult({
            ...result,
            bookPrice : valid ? "is-valid" : "is-invalid"
        });
    }, [book, result]);
    const checkBookPageCount = useCallback(()=>{
        const valid = book.bookPageCount > 0;
        setResult({
            ...result,
            bookPageCount : valid ? "is-valid" : "is-invalid"
        });
    }, [book, result]);
    const checkBookGenre = useCallback(()=>{
        const valid = ["판타지","교양","소설","역사","과학","추리소설","자기계발","수험서"].includes(book.bookGenre);
        setResult({
            ...result,
            bookGenre: valid ? "is-valid" : "is-invalid"
        });
    }, [book, result]);

    useEffect(()=>{
        if(book.bookGenre === "" && result.bookGenre === null) 
            return;
        
        checkBookGenre();
    }, [book.bookGenre, result.bookGenre]);

    const allValid = useMemo(()=>{
        if(result.bookTitle !== "is-valid") return false;//필수
        if(result.bookAuthor === "is-invalid") return false;//선택
        if(result.bookPublisher === "is-invalid") return false;//선택
        if(result.bookPublicationDate === "is-invalid") return false;//선택
        if(result.bookPrice !== "is-valid") return false;//필수
        if(result.bookPageCount !== "is-valid") return false;//필수
        if(result.bookGenre !== "is-valid") return false;//필수
        return true;
    }, [result]);

    const resetBook = useCallback(()=>{
        setBook({
            bookTitle:"",
            bookAuthor:"",
            bookPublisher:"",
            bookPublicationDate:"",
            bookPrice:0,
            bookPageCount:0,
            bookGenre:"",
        });
        setResult({
            bookTitle:null,
            bookAuthor:null,
            bookPublisher:null,
            bookPublicationDate:null,
            bookPrice:null,
            bookPageCount:null,
            bookGenre:null,
        });
    }, []);

    //전송
    const send = useCallback(async ()=>{
        const response = await axios.post("/api/book/", book);
        toast.success("신규 도서가 등록되었습니다");
        //setModal(false);//모달을 닫는건 맞지만...(권장하지 않음)
        closeModal();//모달을 닫는 함수를 부른다 (권장)

        //목록 갱신을 어떻게 할것인가?
        //1. 내가 등록한 데이터만 목록 맨 앞에 추가한다 (갱신한 척 한다)
        //2. 진짜 목록을 갱신한다

        //1. setBookList([신규정보, 기존목록]);
        //- 연관 항목으로 설정되어 있어야 기존 값을 알아낼 수 있음
        //setBookList([response.data, ...bookList]);
        
        //- 값 변경을 함수 형태로 설정하면 과거값을 추적하지 않아도 사용 가능
        setBookList(prev=>([response.data, ...prev]));
    }, [book, /*bookList*/]);

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
                <Modal.Title>신규 도서 등록</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>
                            <span>도서명</span>
                            <FaAsterisk className="text-danger"/>
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" name="bookTitle" value={book.bookTitle}
                                    onChange={changeStringValue} onBlur={checkBookTitle}
                                    placeholder="e.g.,어린왕자"
                                    className={result.bookTitle}/>
                            <div className="valid-feedback">도서명이 설정되었습니다</div>
                            <div className="invalid-feedback">필수 작성 항목입니다</div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>지은이</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" name="bookAuthor" value={book.bookAuthor}
                                    onChange={changeStringValue} onBlur={checkBookAuthor}
                                    placeholder="e.g.,J.K.롤링"
                                    className={result.bookAuthor}/>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>출판사</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" name="bookPublisher" value={book.bookPublisher}
                                    onChange={changeStringValue} onBlur={checkBookPublisher}
                                    placeholder="e.g.,바른북스"
                                    className={result.bookPublisher}/>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>출간일</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="date" name="bookPublicationDate" 
                                    value={book.bookPublicationDate}
                                    onChange={changeStringValue} 
                                    onBlur={checkBookPublicationDate}
                                    className={result.bookPublicationDate}/>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>
                            <span>판매가</span>
                            <FaAsterisk className="text-danger"/>
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" name="bookPrice" value={book.bookPrice}
                                    onChange={changeNumericValue} onBlur={checkBookPrice}
                                    inputMode="numeric" placeholder="e.g.,10000"
                                    className={result.bookPrice}/>
                            <div className="valid-feedback">판매가 설정이 완료되었습니다</div>
                            <div className="invalid-feedback">정상적인 숫자 형태로 작성하세요</div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>
                            <span>페이지</span>
                            <FaAsterisk className="text-danger"/>
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" name="bookPageCount" value={book.bookPageCount}
                                    onChange={changeNumericValue} onBlur={checkBookPageCount}
                                    inputMode="numeric" placeholder="e.g.,100"
                                    className={result.bookPageCount}/>
                            <div className="valid-feedback">페이지 설정이 완료되었습니다</div>
                            <div className="invalid-feedback">정상적인 숫자 형태로 작성하세요</div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Form.Label column sm={3}>
                            <span>장르</span>
                            <FaAsterisk className="text-danger"/>
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Select name="bookGenre" value={book.bookGenre}
                                    onChange={changeStringValue}
                                    className={result.bookGenre}>
                                <option value="">선택하세요</option>
                                <option>판타지</option>
                                <option>교양</option>
                                <option>소설</option>
                                <option>역사</option>
                                <option>과학</option>
                                <option>추리소설</option>
                                <option>자기계발</option>
                                <option>수험서</option>
                            </Form.Select>
                            <div className="invalid-feedback">필수 선택 항목입니다</div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    <FaXmark/>
                    <span>취소하기</span>
                </Button>
                <Button variant="success" disabled={allValid === false}
                        onClick={send}>
                    <FaPlus/>
                    <span>등록하기</span>
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}