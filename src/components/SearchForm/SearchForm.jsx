import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm (handleSubmit) {
    return (
        <>
        <form action={handleSubmit} className='search-form'>
            <input type="text" placeholder='Фильм' className='search-form__input' />
            <button type='submit' className='search-form__submit'>Найти</button>            
        </form>
        <FilterCheckbox />
        </>
    )
}

export default SearchForm;