import { BsXLg } from "react-icons/bs";
import styles from "@/components/Header/Header.module.scss";
import { FC } from "react";
import { useNavigate } from "react-router-dom";


interface MobileSearchFormProps {
  searchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  isSearchValueClear: boolean;
  clearSearch: () => void;
}

const MobileSearchForm: FC<MobileSearchFormProps> = ({
  searchChange,
  searchValue,
  isSearchValueClear,
  clearSearch,
}) => {
  const navigate = useNavigate();

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue) {
      return;
    }
    navigate("/search", { state: { query: searchValue } });
  };

  return (
    <form className="mr-3 grow relative" onSubmit={onSearchSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className={
          styles.mobInput +
          " w-full pl-2 py-2 rounded-lg outline-none bg-[#ffffff] text-[#000] hover:bg-[#ccc] placeholder:text-[#000] dark:bg-[#323232] dark:text-[#fff] dark:placeholder:text-[#fff]"
        }
        onChange={searchChange}
        value={searchValue}
      />
      {!isSearchValueClear && (
        <button type="button" onClick={clearSearch}>
          <BsXLg
            className="text-xl text-[#010101] dark:text-[#fefefe] ml-2 absolute top-[10px] right-3"
            style={{ zIndex: "2000" }}
          />
        </button>
      )}
    </form>
  );
};

export default MobileSearchForm;
