import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;

export const selectLoading = (state) => state.contacts.loading;

export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    if (!nameFilter) {
      return contacts;
    }
    return contacts.filter((contact) => {
      const nameMatches = contact.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const numberMatches = contact.number.includes(nameFilter.toLowerCase());
      return nameMatches || numberMatches;
    });
  }
);
