import { 
    Container, 
    Row, 
    Col,
    Button,
    Table
} from "react-bootstrap";

import { useState, useEffect } from 'react';
import jsonData from '../assets/mockupdata.json';
import axios from 'axios';

// mockup data
const data = () => JSON.parse(JSON.stringify(jsonData));


export const Models = () => {

    const [modelsData, setModelsData] = useState(data);

    useEffect(() => {
        // axios
        //     .get('https://jsonkeeper.com/b/LBWW')
        //     .then(res=> {
        //         console.log(res);
        //         setModelsData(res.data);
        //     })
        //     .catch(err=> {
        //         console.log(err);
        //     })
    }, []);


    return (
        <div>
            <Row className="mt-3">
                <Col>
                    <Button variant="primary" className="btn-sm">Register Model</Button>{' '}
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Table bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className="bg-lightgrey">ID</th>
                                <th className="bg-lightgrey">Model Name</th>
                                <th className="bg-lightgrey">Created By</th>
                                <th className="bg-lightgrey">Created Date</th>
                                <th className="bg-lightgrey">Location</th>                                
                                <th className="bg-lightgrey">Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                modelsData.map((modelData)=>{
                                    return (
                                        <tr key={ modelData.modelId }>
                                            
                                            <td>{ modelData.modelId }</td>
                                            <td>{ modelData.modelName }</td>
                                            <td>{ modelData.createdBy }</td>
                                            <td>{ modelData.createdDate }</td>
                                            <td>{ modelData.modelLocation }</td>                                            
                                            <td>{ modelData.modelComments } </td>
                                            
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}
