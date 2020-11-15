import React, { Component } from 'react'
import  {Spinner,Alert,Row,Col,Button}from 'react-bootstrap'
import RepoCard from './RepoCard'



export default class Content extends Component {

    constructor(props){
        super(props)
    }

    render() {
        const {error,cards,loading} = this.props
        return (
            <div>
                <Row className="justify-content-around">
                        {cards.map((item, key) => <Col sm={6} md={4} lg={3} key={key}>
                            <RepoCard no={item.no}
                                img={item.img}
                                title={item.title}
                                author={item.author}
                                stars={item.stars}
                                forks={item.forks}
                                issues={item.issues}
                                url={item.url}
                            />
                        </Col>)}
                    </Row>
                    <div className="text-center">
                        {error && <Alert variant="danger" >{error} {error}</Alert>}
                    </div>
                    <div className="text-center">
                        <Button onClick={this.loadMore} disabled={loading}> {loading && <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />} Loading.....</Button>
                    </div>
            </div>
        )
    }
}

