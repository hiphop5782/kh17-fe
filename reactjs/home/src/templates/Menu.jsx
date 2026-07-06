import { Link } from "react-router-dom";


export default function Menu() {

    return (<>
        <Link to="/">홈</Link>
        <Link to="/country/list">국가정보</Link>
        <Link to="/lecture/list">강좌정보</Link>
        <Link to="/book/list">도서정보</Link>
    </>)
}