import "./FilterCheckbox.css";
import { useState } from "react";

function FilterCheckbox() {

    const [isEnabled, setIsEnabled] = useState(false);

    const FilterCheckboxClassName = `filter-checkbox__button app__button ${
        isEnabled && "filter-checkbox__button_enabled"
      }`;

      const onClickCheckbox = () => {
        setIsEnabled(!isEnabled);
      }

  return (
    <div className="filter-checkbox">
      <button
        type="button"
        className={FilterCheckboxClassName}
        onClick={onClickCheckbox}
      />
      <p className="filter-checkbox__text">
        Короткометражки
      </p>
    </div>
  );
}

export default FilterCheckbox;
