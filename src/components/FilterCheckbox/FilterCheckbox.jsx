import './FilterCheckbox.css'

function FilterCheckbox () {
    return (
        <>
        <input type="checkbox" className='filter-checkbox' id='checkbox' name='checkbox' />
        <label htmlFor='checkbox' className='filter-checkbox__label'>Короткометражки</label>
        </>
    )
}

export default FilterCheckbox;