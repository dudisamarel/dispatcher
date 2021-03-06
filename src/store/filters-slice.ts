import { createSlice } from "@reduxjs/toolkit";
import { EndPoints } from "../services/utils";
import { EndPointType, Option } from "../types";

interface IFilters {
  endpoint: EndPointType;
  category: Option;
  date: {
    startDate: string | null;
    endDate: string | null;
  };
  country: Option;
  sourcesList: { name: string; value: string }[];
  selectedSource: Option;
  sortBy: Option;
  language: Option;
  searchQuery: string | null;
  fullSourceList: { name: string; value: string }[];
  toaster: { msg?: string; isOpen: boolean };
}

const initialOption: Option = { name: "All", value: "" };

const initialState = {
  endpoint: { value: EndPoints.HEADLINES, name: "Top Headlines" },
  category: initialOption,
  date: {
    startDate: null,
    endDate: null,
  },
  country: initialOption,
  sourcesList: [],
  selectedSource: initialOption,
  sortBy: initialOption,
  language: initialOption,
  searchQuery: "",
  fullSourceList: [],
  toaster: { msg: "", isOpen: false },
} as IFilters;

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeEndpoint(state, action) {
      const { value } = action.payload;
      if (value === state.endpoint.value) return;
      switch (value) {
        case EndPoints.HEADLINES:
          return (state = {
            ...initialState,
            endpoint: action.payload,
            searchQuery: state.searchQuery,
          });
        case EndPoints.EVERYTHING:
          return (state = {
            ...initialState,
            endpoint: action.payload,
            searchQuery: state.searchQuery,
          });
      }
    },
    setCountry(state, action) {
      if (action.payload === state.country) return;
      if (state.selectedSource.value)
        return {
          ...state,
          toaster: {
            msg: "You can't mix country with source field, Source filter has been reset.",
            isOpen: true,
          },
          country: action.payload,
          selectedSource: initialState.selectedSource,
        };
      else state.country = action.payload;
    },
    setSearchQuery(state, action) {
      if (action.payload !== state.searchQuery)
        state.searchQuery = action.payload;
    },
    setCategory(state, action) {
      if (action.payload === state.category) return;
      if (state.selectedSource.value) {
        return {
          ...state,
          toaster: {
            msg: "You can't mix category with source field, Source filter has been reset.",
            isOpen: true,
          },
          category: action.payload,
          selectedSource: initialOption,
        };
      } else state.category = action.payload;
    },
    setToaster(state, action) {
      state.toaster = action.payload;
    },
    setIntialCountry(state, action) {
      state.country = action.payload;
    },
    setSelectedSource(state, action) {
      if (action.payload.value === state.selectedSource.value) return;
      if (state.country.value || state.category.value)
        return {
          ...state,
          toaster: {
            msg: "You can't mix source field with other fields , Filters have been reset.",
            isOpen: true,
          },
          selectedSource: action.payload,
          country: initialOption,
          category: initialOption,
        };
      else state.selectedSource = action.payload;
    },
    setSourcesList(state, action) {
      state.sourcesList = [...action.payload];
    },
    setFullSourceList(state, action) {
      state.fullSourceList = [...action.payload];
    },
    setLanguage(state, action) {
      if (action.payload === state.language) return;
      state.language = action.payload;
    },
    setSortBy(state, action) {
      if (action.payload === state.sortBy) return;

      state.sortBy = action.payload;
    },
    setDate(state, action) {
      const { startDate, endDate } = action.payload;
      state.date = { startDate: startDate, endDate: endDate };
    },
    setMobileFilter(state, action) {
      const { endpoint, results, datePayload } = action.payload;

      switch (endpoint.value) {
        case EndPoints.HEADLINES:
          return (state = {
            ...initialState,
            searchQuery: state.searchQuery,
            country: results.country,
            endpoint: endpoint,
            category: results.category,
            selectedSource: results.source,
          });
        case EndPoints.EVERYTHING:
          return (state = {
            ...initialState,
            date: datePayload,
            searchQuery: state.searchQuery,
            sortBy: results.sortBy,
            endpoint: endpoint,
            language: results.lang,
            selectedSource: results.source,
          });
      }
    },
  },
});

export const filtersActions = filtersSlice.actions;

export default filtersSlice;
