import { useCallback, useMemo, useState } from "react";
import Jumbotron from "./Jumbotron";

function Exam02_1() {
    //state
    const [student, setStudent] = useState(
        {
            studentName : "",
            studentKorean : 0,
            studentEnglish : 0,
            studentMath : 0
        }
    );

    //callback - 문자열입력(changeStringValue), 정수입력(changeNumericValue)
    const changeStringValue = useCallback(e=>{
        const {name, value} = e.target;
        setStudent({
            ...student, 
            [name]:value
        });
    }, [student]);

    const changeNumericValue = useCallback(e=>{
        const {name, value} = e.target;
        const regex = /[^0-9]+/g;
        const replacement = value.replace(regex, "");
        setStudent({
            ...student, 
            [name]:parseInt(replacement || 0)
        });
    }, [student]);

    //memo
    const total = useMemo(()=>{
        return student.studentKorean + student.studentEnglish + student.studentMath;//문자열
    }, [student]);
    const average = useMemo(()=>{
        return total / 3;
    }, [total]);

    //view
    return (
    <>
        <Jumbotron title="학생 성적 계산기2" content="시험 결과를 입력하시면 평균과 총점을 계산해드립니다"/>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">이름</label>
            <div className="col-sm-9">
                <input type="text" name="studentName" value={student.studentName}
                        onChange={changeStringValue}
                        className="form-control" placeholder="e.g.,피카츄"/>
            </div>
        </div>
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">국어점수</label>
            <div className="col-sm-9">
                <input type="text" inputMode="numeric" 
                        name="studentKorean" value={student.studentKorean}
                        onChange={changeNumericValue}
                        className="form-control" placeholder="e.g.,100"/>
            </div>
        </div>
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">영어점수</label>
            <div className="col-sm-9">
                <input type="text" inputMode="numeric" 
                        name="studentEnglish" value={student.studentEnglish}
                        onChange={changeNumericValue}
                        className="form-control" placeholder="e.g.,100"/>
            </div>
        </div>
        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">수학점수</label>
            <div className="col-sm-9">
                <input type="text" inputMode="numeric" 
                        name="studentMath" value={student.studentMath}
                        onChange={changeNumericValue}
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

export default Exam02_1;