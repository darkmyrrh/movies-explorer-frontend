import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(handleSubmit) {
  return (
    <>
      <form action={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Фильм"
          className="search-form__input"
          required
        />
        <button type="submit" className="search-form__submit app__button">
          Найти
        </button>
      </form>
      <FilterCheckbox />
    </>
  );
}

export default SearchForm;
