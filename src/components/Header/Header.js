import React, { PureComponent } from 'react';
import { AuthConsumer } from '../../contexts/Auth';
import Button from '../Button'
import './Header.css';

class Header extends PureComponent {
  render() {
    return (
      <AuthConsumer>{
        { ({isAuthorized, email})  => ( 
          <header className="header">
        <p className="header__title section-title">Header</p>
           </header>
        )
        }
        </AuthConsumer>
     
    );
  }
}

export default Header;
