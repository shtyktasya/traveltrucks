"use client";

import styles from "./Filters.module.css";
import { CiMap } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

type Filters = {
  location: string;
  form: string;
  engine: string;
  transmission: string;
};

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onApply: () => void;
  onReset: () => void;
};

export default function Filters({
  filters,
  setFilters,
  onApply,
  onReset,
}: Props) {
  const handleReset = () => {
    const emptyFilters = {
      location: "",
      form: "",
      engine: "",
      transmission: "",
    };
    setFilters(emptyFilters);
    onReset();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <div className={styles.block}>
          <label className={styles.label}>Location</label>
          <div className={styles.inputWrapper}>
            <CiMap className={styles.icon} />
            <input
              className={styles.input}
              type="text"
              placeholder="City..."
              value={filters.location}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className={styles.filterWrapper}>
          <h2 className={styles.title}>Filters</h2>

          <div className={styles.block}>
            <label className={styles.label}>Camper form</label>
            <div className={styles.radioGroup}>
              {["alcove", "panel_van", "integrated"].map((type) => (
                <label key={type} className={styles.radioItem}>
                  <input
                    type="radio"
                    name="form"
                    checked={filters.form === type}
                    onChange={() =>
                      setFilters((prev) => ({ ...prev, form: type }))
                    }
                  />
                  <span className={styles.radioCustom}></span>
                  {type === "panel_van"
                    ? "Panel Van"
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.block}>
            <label className={styles.label}>Engine</label>
            <div className={styles.radioGroup}>
              {["diesel", "petrol", "hybrid", "electric"].map((type) => (
                <label key={type} className={styles.radioItem}>
                  <input
                    type="radio"
                    name="engine"
                    checked={filters.engine === type}
                    onChange={() =>
                      setFilters((prev) => ({
                        ...prev,
                        engine: type,
                      }))
                    }
                  />
                  <span className={styles.radioCustom}></span>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.block}>
            <label className={styles.label}>Transmission</label>
            <div className={styles.radioGroup}>
              {["automatic", "manual"].map((type) => (
                <label key={type} className={styles.radioItem}>
                  <input
                    type="radio"
                    name="transmission"
                    checked={filters.transmission === type}
                    onChange={() =>
                      setFilters((prev) => ({
                        ...prev,
                        transmission: type,
                      }))
                    }
                  />
                  <span className={styles.radioCustom}></span>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.btn}>
        <button
          className={`${styles.searchBtn} ${styles.filtersBtn}`}
          onClick={onApply}
        >
          Search
        </button>

        <button
          className={`${styles.resetBtn} ${styles.filtersBtn}`}
          onClick={handleReset}
        >
          <RxCross2 className={styles.resetIcon} />
          Clear filters
        </button>
      </div>
    </div>
  );
}
