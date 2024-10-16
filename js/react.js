import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

const Nav_bar = () => {
    return(
        <Navbar expand='lg'>
            <Navbar.Brand>Ezeiyoke Cosmas</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>

                <Nav className='ml-auto'>
                    <Nav.Link href='#'>Home</Nav.Link>
                    <Nav.Link href='#'>Instuctions</Nav.Link>

                </Nav>
            </Navbar.Collapse>
            </Navbar>
        
    );
}
export default Nav_bar