import { Button } from "react-bootstrap";

export default function TestLeft({plusOne}) {
    
    return (<>
        <Button variant="primary" className="me-2"
            onClick={plusOne}>+1</Button>
    </>)
}