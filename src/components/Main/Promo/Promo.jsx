import './Promo.css';
import promoLogo from '../../../images/text__COLOR_landing-logo.svg';

function Promo() {
    return (
        <section className='promo'>
            <h1 className='promo__heading'>Учебный проект студента факультета <br/>Веб-разработки.</h1>
            <p className='promo__paragraph'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <button className='promo__button' type='button'>Узнать больше</button>
            <img src={promoLogo} alt="Логотип промо-страницы" className='promo__logo' />            
        </section>
    )
}

export default Promo;