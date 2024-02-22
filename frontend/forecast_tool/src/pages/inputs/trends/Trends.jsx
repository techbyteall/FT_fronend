
import { 
    Container, 
    Row, 
    Col,
    Button,
    Table
} from "react-bootstrap";
import TrendsList from "./TrendsList";

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
                <TrendsList />
            </Col>
        </Row>
        {/* <Row className="mt-3">
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
                            <td>raim</td>
                            <td>adl</td>
                            <td>@adl</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>raim2</td>
                            <td>adl</td>
                            <td>@adl2</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>raim</td>
                            <td>adl3</td>
                            <td>@adl3</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row> */}
    </div>
  )
}
