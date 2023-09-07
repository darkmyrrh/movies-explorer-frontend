import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSubmit, handleChange, checked, onChange, inputValue }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="search-form"
        type="search"
        method="GET"
        id="search"
      >
        <input
          placeholder="Фильм"
          className="search-form__input"
          required
          onChange={handleChange}
          value={inputValue}
        />
        <button type="submit" className="search-form__submit app__button">
          Найти
        </button>
      </form>
      <FilterCheckbox checked={checked} onChange={onChange} />
    </>
  );
}

export default SearchForm;
