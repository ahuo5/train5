import React, { Component } from 'react'
import  {Container,Nav,Card}from 'react-bootstrap'


 export default class Header extends Component {
    
    
    constructor(props){
        super(props)
    }

    render() {

        const menuItems = [
            'All',
            'Javascript',
            'Ruby',
            'Java',
            'Css',
            'Python'
        ]

        return (
            <div>
                <Container>
                    <Nav className="justify-content-center" variant="tabs" activeKey={this.props.activeKey || 'All' } onSelect={(selectedKey) => this.props.onClick(selectedKey)} >
                        {menuItems.map((item, key) => <Nav.Item key={key}><Nav.Link eventKey={item} >{item}</Nav.Link></Nav.Item>)}
                    </Nav>
                </Container>
            </div>
        )
    }
}



