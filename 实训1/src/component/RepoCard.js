import React, { Component } from 'react'
import {Card}from 'react-bootstrap'


export default class RepoCard extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <Card border="secondary" style={{ marginTop: '8px', marginBottom: '8px' }}>
            <Card.Header className="text-center">{this.props.no}</Card.Header>
            <Card.Body>
                <Card.Img src="images/image.png" data-src={this.props.img} className="lazyload" />
                <Card.Title className="text-center"><Card.Link href={this.props.url} target="_blank">{this.props.title}</Card.Link></Card.Title>
                <Card.Text><i className="fa fa-user fa-lg fa-fw" style={{ color: 'black' }}></i>{this.props.author}</Card.Text>
                <Card.Text><i className="fa fa-star fa-lg fa-fw" style={{ color: 'black' }}></i>{this.props.stars}</Card.Text>
                <Card.Text><i className="fa fa-code-fork fa-lg fa-fw" style={{ color: 'black' }}></i>{this.props.forks}</Card.Text>
                <Card.Text><i className="fa fa-warning fa-lg fa-fw" style={{ color: 'black' }}></i>{this.props.issues}</Card.Text>
            </Card.Body>
            </Card>
            )
            
        
    }
}

