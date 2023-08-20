import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <input
        type="checkbox"
        name="checkbox"
        id="checkbox"
        className="filter-checkbox__input root__button"
      />
      <label htmlFor="checkbox" className="filter-checkbox__text root__button">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
