import './Header.css';
import logo from '../../images/logo.svg'

function Header() {
    return(
        <header className='header'>
            <img src={logo} alt="логотип" className='header__logo' />
            <ul className='header__nav'>
                <li className='header__link'>Регистрация</li>
                <li><button className='header__button'>Войти</button></li>
            </ul>
        </header>
    )
}

export default Header;