import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function KakaopayBuyDetailVersion2() {
    //path variable
    const { purchaseNo } = useParams();

    useEffect(()=>{
        loadData();
    }, []);
    const loadData = useCallback(async ()=>{
        const { data } = await apiClient.get(`/purchase/heavy/${purchaseNo}`);
        console.log(data);
    }, []);

    return (<>
        <Jumbotron title="상품 결제 상세" content="PG사와 연동된 결제 정보 내역입니다"/>

        
    </>)
}