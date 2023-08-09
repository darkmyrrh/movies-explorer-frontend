import './Profile.css';

function Profile () {
    return (
        <section className='profile'>
            <h2 className='profile__title'>Привет, Виталий!</h2>
            <form className='profile__form'>
                <label className='profile__label'>Имя<input type="text" placeholder='Виталий' className='profile__input' /></label>
                <label className='profile__label'>Почта<input type="text" placeholder='test@test.ru' className='profile__input' /></label>
                <button type='submit' className='profile__submit'>Редактировать</button>
            </form>
            <button type='button' className='profile__exit'>Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;