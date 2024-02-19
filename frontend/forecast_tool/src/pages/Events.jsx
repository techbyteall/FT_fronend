import { 
    Container, 
    Row, 
    Col,
    Button
} from "react-bootstrap";

export const Events = () => {
  return (
    <div>
        <Container fluid>
            <Row className="mt-3">
                <Col>
                    <Button variant="primary" className="btn-sm">Register EventSet</Button>{' '}
                </Col>
            </Row>
        </Container>
    </div>
  )
}
