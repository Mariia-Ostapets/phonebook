import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from "./operations";
import { logOut } from "../auth/operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
    isModalOpen: false,
    contactIdToDelete: null,
    isEditModalOpen: false,
    contactToEdit: null,
  },
  reducers: {
    openModal(state, action) {
      state.isModalOpen = true;
      state.contactIdToDelete = action.payload;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.contactIdToDelete = null;
    },
    openEditModal(state, action) {
      state.isEditModalOpen = true;
      state.contactToEdit = action.payload;
    },
    closeEditModal(state) {
      state.isEditModalOpen = false;
      state.contactToEdit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
        state.isModalOpen = false;
        state.contactIdToDelete = null;
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(updateContact.pending, handlePending)
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.isModalOpen = false;
        state.contactIdToDelete = null;
      })
      .addCase(updateContact.rejected, handleRejected)
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.error = null;
        state.loading = false;
      });
  },
});

export const { openModal, closeModal, openEditModal, closeEditModal } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
