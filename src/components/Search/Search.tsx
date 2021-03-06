import React, { useEffect, useRef, useState } from "react";
import { Icon } from "../Icon/Icon";
import search from "../../assets/Icons/search.svg";
import { SearchContainer, SelectContainer, Wrapper } from "./style";
import { DropDown } from "../Dropdown/Dropdown";
import { RecentSearches } from "../RecentSearches/RecentSearches";
import useOnClickOutside from "../../hooks/useClickOutside";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Input from "../Input/Input";
import { EndPoints } from "../../services/utils";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { EndPointType, Option } from "../../types";
interface SearchProps {
  onSubmit: (searchValue: string) => any;
  onChangeFilter: (filterValue: EndPointType | Option) => any;
}

export const Search: React.FC<SearchProps> = ({ onSubmit, onChangeFilter }) => {
  const searchFormRef = useRef(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { endpoint } = useSelector((state: RootState) => state.filters);
  const [endpointState, setEndpointState] = useState<Option | EndPointType>(
    endpoint
  );
  const [isValid, setIsValid] = useState(true);

  const closeInputExpand = () => setHasFocus(false);

  useOnClickOutside(searchFormRef, closeInputExpand);

  const [recentSearches, setRecentSearches] = useLocalStorage("searches", []);
  const [searches, setSearches] = useState<string[]>(recentSearches);

  useEffect(() => {
    setRecentSearches(searches);
  }, [searches, setRecentSearches]);

  const onClear = () => {
    setSearches([]);
  };

  const onDeleteSearch = (idx: number) => {
    setSearches((prevSearches) =>
      prevSearches.filter((search, currIdx) => currIdx !== idx)
    );
  };

  const addRecentSearch = (value: string) => {
    value && setSearches((prevSearches) => [value, ...prevSearches]);
  };

  const onEnterSearch = (
    ev: React.FormEvent<HTMLFormElement> | null,
    isRecentSearch: boolean,
    value: string
  ) => {
    ev && ev.preventDefault();
    if (!value && endpointState.value === EndPoints.EVERYTHING) {
      setIsValid(false);
      return;
    }
    if (!isRecentSearch && !isExistInRecentSearches(value))
      addRecentSearch(value);
    onSubmit(value);
    onChangeFilter(endpointState);
    setIsValid(true);
    closeInputExpand();
    searchInputRef.current?.blur();
  };

  const isExistInRecentSearches = (search: string) =>
    searches.findIndex((s) => s === search) > -1;

  const onClickSearch = (value: string) => {
    setInputValue(value);
    onEnterSearch(null, true, value);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const searchesToDisplay = searches.filter(
    (s) => s.includes(inputValue) && s !== inputValue
  );

  return (
    <SearchContainer
      isValid={isValid}
      onSubmit={(ev) => onEnterSearch(ev, false, inputValue)}
      hasFocus={hasFocus}
      ref={searchFormRef}
    >
      <Wrapper>
        <Input
          ref={searchInputRef}
          value={inputValue}
          onChange={inputChangeHandler}
          onFocus={() => setHasFocus(true)}
          noBorder
          isValid={isValid}
          placeholder={isValid ? "Search" : "Please enter your search term"}
        />
      </Wrapper>
      <SelectContainer>
        <DropDown
          onChange={(option) => setEndpointState(option)}
          initialValue="Top Headlines"
          currValue={endpointState}
          noBorder
          options={[
            { value: EndPoints.EVERYTHING, name: "Everything" },
            { value: EndPoints.HEADLINES, name: "Top Headlines" },
          ]}
        />
      </SelectContainer>
      {hasFocus && searchesToDisplay.length > 0 && (
        <RecentSearches
          onClear={onClear}
          onDeleteSearch={(idx) => onDeleteSearch(idx)}
          searches={searchesToDisplay}
          onClickSearch={onClickSearch}
        />
      )}
      <div onClick={() => onEnterSearch(null, false, inputValue)}>
        <Icon src={search} margin={13} color="purple" />
      </div>
    </SearchContainer>
  );
};
