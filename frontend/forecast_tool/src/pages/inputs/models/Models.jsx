import { Container, Row, Col, Button, Table } from "react-bootstrap";
import  ModelsList from "./ModelsList"


export const Models = () => {
    return (
        <div>
            <Row className="mt-3">
                <Col>
                    <Button variant="primary" className="btn-sm">Register Model</Button>{' '}
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <div>
                        <ModelsList />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Models;