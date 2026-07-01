import { useCallback, useMemo, useState } from "react";
import Jumbotron from "./Jumbotron";

function Exam02() {
    //state
    const [student, setStudent] = useState(
        {
            studentName : "",
            studentKorean : "",
            studentEnglish : "",
            studentMath : ""
        }
    );

    //callback
    const changeStudent = useCallback(e=>{
        const {name, value} = e.target;

        setStudent(
            { 
                ...student, //나머지 유지
                [name] : value //입력값만 변경
            }
        );
    }, [student]);

    //memo
    const total = useMemo(()=>{
        //return student.studentKorean + student.studentEnglish + student.studentMath;//문자열
        return parseInt(student.studentKorean) 
                + parseInt(student.studentEnglish)
                + parseInt(student.studentMath);
    }, [student]);
    const average = useMemo(()=>{
        return total / 3;
    }, [total]);

    //view
    return (
    <>
        <Jumbotron title="학생 성적 계산기" content="시험 결과를 입력하시면 평균과 총점을 계산해드립니다"/>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">이름</label>
            <div className="col-sm-9">
                <input type="text" name="studentName" value={student.studentName}
                        onChange={changeStudent}
                        className="form-control" placeholder="e.g.,피카츄"/>
            </div>
        </div>
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">국어점수</label>
            <div className="col-sm-9">
                <input type="text" inputMode="numeric" 
                        name="studentKorean" value={student.studentKorean}
                        onChange={changeStudent}
                        className="form-control" placeholder="e.g.,100"/>
            </div>
        </div>
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">영어점수</label>
            <div className="col-sm-9">
                <input type="text" inputMode="numeric" 
                        name="studentEnglish" value={student.studentEnglish}
                        onChange={changeStudent}
                        className="form-control" placeholder="e.g.,100"/>
            </div>
        </div>
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">수학점수</label>
            <div className="col-sm-9">
                <input type="text" inputMode="numeric" 
                        name="studentMath" value={student.studentMath}
                        onChange={changeStudent}
                        className="form-control" placeholder="e.g.,100"/>
            </div>
        </div>

        {/* 결과화면 */}
        <div className="row mt-4">
            <div className="col">
                <div className="shadow p-4 rounded bordered">
                    {student.studentName} 님의 성적은 다음과 같습니다. <br/>
                    총점은 {total}점이고, 평균은 {average.toFixed(2)} 점입니다.
                </div>
            </div>
        </div>

    </>
    )
}

export default Exam02;