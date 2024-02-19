
import { 
    Container, 
    Row, 
    Col,
    Button,
    Table
} from "react-bootstrap";

export const Trends = () => {
  return (
    <div>
        <Row className="mt-3">
            <Col>
                <Button variant="primary" className="btn-sm">Register TrendSet</Button>{' '}
            </Col>
        </Row>
        <Row className="mt-3">
            <Col>
                <Table bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Larry the Bird</td>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    </div>
  )
}
