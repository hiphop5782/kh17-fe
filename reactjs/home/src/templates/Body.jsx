import { Route, Routes } from "react-router-dom";
import Home from "@components/Home";
import NotFound from "@error/NotFound";

import CountryList from "@components/country/CountryList";
import CountryAdd from "@components/country/CountryAdd";
import CountryDetail from "@components/country/CountryDetail";
import CountryEdit from "@components/country/CountryEdit";
import CountrySearch from "@components/country/CountrySearch";

import LectureList from "@components/lecture/LectureList";
import LectureAdd from "@components/lecture/LectureAdd";
import LectureDetail from "@components/lecture/LectureDetail";

import BookList from "@components/book/BookList";
import BookSpa from "@components/book/BookSpa";


export default function Body() {

    return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        
        <Route path="/country/list" element={<CountryList/>}/>
        <Route path="/country/add" element={<CountryAdd/>}/>
        {/* 제일 마지막에 적혀있는 값을 countryNo라는 이름으로 관리하겠다 */}
        <Route path="/country/detail/:countryNo" element={<CountryDetail/>}/>
        <Route path="/country/edit/:countryNo" element={<CountryEdit/>}/>
        <Route path="/country/search" element={<CountrySearch/>}/>
        
        <Route path="/lecture/list" element={<LectureList/>}/>
        <Route path="/lecture/add" element={<LectureAdd/>}/>
        <Route path="/lecture/detail/:lectureNo" element={<LectureDetail/>}/>
        
        <Route path="/book/list" element={<BookList/>}/>
        <Route path="/book/spa" element={<BookSpa/>}/>

        {/* fallback route */}
        <Route path="*" element={<NotFound/>}/>
    </Routes>
    )
}