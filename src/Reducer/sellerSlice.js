import { createSlice } from "@reduxjs/toolkit";

const uploadProductSlice = createSlice({
  name: "product",
  initialState: {
    product: {
      name: null,
      sort: null,
      description: null,
      image: null,
      price: null,
      warehouse: null,
      weight: null,
      status: null,
      IdAuthor: null,
      datePost: null,
    },
    upload: {
      productInf: null,
      error: false,
    },
  },
  reducers: {
    nameInput: (state, action) => {
      state.product.name = action.payload;
    },
    sortInput: (state, action) => {
      state.product.sort = action.payload;
    },
    descriptionInput: (state, action) => {
      state.product.description = action.payload;
    },
    imageInput: (state, action) => {
      state.product.image = action.payload;
    },
    priceInput: (state, action) => {
      state.product.price = action.payload;
    },
    warehouseInput: (state, action) => {
      state.product.warehouse = action.payload;
    },
    weightInput: (state, action) => {
      state.product.weight = action.payload;
    },
    statusInput: (state, action) => {
      state.product.status = action.payload;
    },
    IdAuthorInput: (state, action) => {
      state.product.IdAuthor = action.payload;
    },
    datePostInput: (state, action) => {
      state.product.datePost = action.payload;
    },
    // upload
    uploadSuccessfull: (state, action) => {
      state.upload.productInf = action.payload;
    },
    uploadFailed: (state, action) => {
      state.upload.error = true;
    },
  },
});

export const {
  nameInput,
  sortInput,
  descriptionInput,
  imageInput,
  priceInput,
  warehouseInput,
  weightInput,
  statusInput,
  IdAuthorInput,
  datePostInput,
  uploadSuccessfull,
  uploadFailed,
} = uploadProductSlice.actions;

export { uploadProductSlice };
