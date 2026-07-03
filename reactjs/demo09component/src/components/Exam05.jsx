import { useCallback, useEffect, useMemo, useState } from "react";
import Jumbotron from "./Jumbotron";
import { FaAsterisk, FaPlus } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

function Exam05() {
    //state
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

    //callback
    const changeStringValue = useCallback(e=>{
        const {name, value} = e.target;
        setBook({ ...book, [name] : value});
    }, [book]);
    const changeNumericValue = useCallback(e=>{
        const {name, value} = e.target;
        const regex = /[^0-9]+/g;
        const replacement = value.replace(regex, "");
        const newValue = parseInt(replacement);
        setBook({ ...book, [name] : newValue });
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
    const clear = useCallback(()=>{
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

    const send = useCallback(()=>{
        axios({
            url:"http://localhost:8080/api/book/insert",
            method:"post",
            data:book
        })
        .then(response=>{
            toast.success("도서 등록 완료");
            clear();
        });
    }, [book]);

    //effect
    useEffect(()=>{
        if(book.bookGenre === "" && result.bookGenre === null) 
            return;
        
        checkBookGenre();
    }, [book.bookGenre, result.bookGenre]);
    
    //memo
    const allValid = useMemo(()=>{
        if(result.bookTitle !== "is-valid") return false;
        if(result.bookAuthor === "is-invalid") return false;
        if(result.bookPublisher === "is-invalid") return false;
        if(result.bookPublicationDate === "is-invalid") return false;
        if(result.bookPrice !== "is-valid") return false;
        if(result.bookPageCount !== "is-valid") return false;
        if(result.bookGenre !== "is-valid") return false;

        return true;
    }, [result]);

    //view
    return (<>
        <Jumbotron title="도서 등록 화면"/>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>도서명</span>
                <FaAsterisk className="text-danger"/>
            </label>
            <div className="col-sm-9">
                <input type="text" name="bookTitle" placeholder="e.g.,어린왕자"
                    value={book.bookTitle} onChange={changeStringValue}
                    onBlur={checkBookTitle}
                    className={`form-control ${result.bookTitle}`}/>
                <div className="invalid-feedback">필수 작성 항목입니다</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>출판사</span>
            </label>
            <div className="col-sm-9">
                <input type="text" name="bookPublisher" placeholder="e.g.,책과사람들"
                    value={book.bookPublisher} onChange={changeStringValue}
                    onBlur={checkBookPublisher}
                    className={`form-control ${result.bookPublisher}`}/>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>지은이</span>
            </label>
            <div className="col-sm-9">
                <input type="text" name="bookAuthor" placeholder="e.g.,셰익스피어"
                    value={book.bookAuthor} onChange={changeStringValue}
                    onBlur={checkBookAuthor}
                    className={`form-control ${result.bookAuthor}`}/>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>출간일</span>
            </label>
            <div className="col-sm-9">
                <input type="date" name="bookPublicationDate"
                    value={book.bookPublicationDate} onChange={changeStringValue}
                    onBlur={checkBookPublicationDate}
                    className={`form-control ${result.bookPublicationDate}`}/>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>판매가</span>
                <FaAsterisk className="text-danger"/>
            </label>
            <div className="col-sm-9">
                <input type="text" name="bookPrice"
                    value={book.bookPrice} onChange={changeNumericValue}
                    onBlur={checkBookPrice}
                    className={`form-control ${result.bookPrice}`}/>
                <div className="valid-feedback">가격 설정이 완료되었습니다</div>
                <div className="invalid-feedback">0 이상 숫자로 설정하세요</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>페이지</span>
                <FaAsterisk className="text-danger"/>
            </label>
            <div className="col-sm-9">
                <input type="text" name="bookPageCount"
                    value={book.bookPageCount} onChange={changeNumericValue}
                    onBlur={checkBookPageCount}
                    className={`form-control ${result.bookPageCount}`}/>
                <div className="valid-feedback">페이지수 설정이 완료되었습니다</div>
                <div className="invalid-feedback">0보다 큰 값으로 설정하세요</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">
                <span>장르</span>
                <FaAsterisk className="text-danger"/>
            </label>
            <div className="col-sm-9">
                <select name="bookGenre" value={book.bookGenre} onChange={changeStringValue}
                    className={`form-control ${result.bookGenre}`}>
                    <option value="">선택하세요</option>
                    <option>판타지</option>
                    <option>교양</option>
                    <option>소설</option>
                    <option>역사</option>
                    <option>과학</option>
                    <option>추리소설</option>
                    <option>자기계발</option>
                    <option>수험서</option>
                </select>
                <div className="invalid-feedback">필수 선택 항목입니다</div>
            </div>
        </div>

        <div className="row mt-5">
            <div className="col text-end">
                <button className="btn btn-success btn-lg" disabled={!allValid}
                        onClick={send}>
                    <FaPlus className="me-2"/>
                    <span>등록하기</span>
                </button>
            </div>
        </div>
    </>)
}

export default Exam05;