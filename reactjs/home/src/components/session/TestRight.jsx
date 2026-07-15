import { Button } from "react-bootstrap";

export default function TestRight({count, setCount}) {

    return (<>
        <Button variant="primary" className="me-2" onClick={e=>setCount(-500)}>+10</Button>
    </>)
}