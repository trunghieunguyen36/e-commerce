import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Link } from 'react-router-dom';


import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
   <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>

      <div className='options'>
        <Link className='option' to='/shop'>Shop</Link>

        <Link className='option' to='/contact'>Contact</Link>

        {currentUser
        ? (<div className='option' onClick={() => auth.signOut()}>Sign Out</div>)
        : (<Link className='option' to='/signin'>Sign In</Link>)}

        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
   </div>
)

const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStatetoProps)(Header);
