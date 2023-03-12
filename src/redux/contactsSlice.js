import { createSlice } from "@reduxjs/toolkit";
import { createContact, deleteContact, fetchContacts } from "./operations";

const initialContacts = {
  items: [],
  isLoading: false,
  error: null
};

const handlePending = state => {
  state.isLoading = true;
}

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(createContact.pending, handlePending)
      .addCase(createContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createContact.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(contact => contact.id !== action.payload.id)
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContact.rejected, handleRejected)

    // [fetchContacts.pending]: handlePending,
    // [fetchContacts.fulfilled](state, action) {
    //   state.items = action.payload;
    //   state.isLoading = false;
    //   state.error = null;
    // },
    // [fetchContacts.rejected]: handleRejected,

    // [createContact.pending]: handlePending,
    // [createContact.fulfilled](state, action) {
    //   state.items.push(action.payload);
    //   state.isLoading = false;
    //   state.error = null;
    // },
    // [createContact.rejected]: handleRejected,

    // [deleteContact.pending]: handlePending,
    // [deleteContact.fulfilled](state, action) {
    //   state.items = state.items.filter(contact => contact.id !== action.payload.id)
    //   state.isLoading = false;
    //   state.error = null;
    // },
    // [deleteContact.rejected]: handleRejected,
  },
})

export const contactsReducer = contactsSlice.reducer;