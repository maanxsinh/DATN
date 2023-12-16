import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const manageProduct = createSlice({
  name: "detail",
  initialState: {
    arrayProductId: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    // pushProductId: (state, action) => {
    //   const isPresent = state.arrayProductId.includes(action.payload);
    //   if (isPresent === false) {
    //     state.arrayProductId.push(action.payload);
    //   }

    //   console.log(">>>arrayProductId:", state.arrayProductId);
    // },
    // removeProductId: (state, action) => {
    //   const isPresent = state.arrayProductId.includes(action.payload);
    //   if (isPresent === true) {
    //     state.arrayProductId = state.arrayProductId.filter(
    //       (item) => item !== action.payload
    //     );
    //   }
    // },
    saveArrayProduct: (state, action) => {
      state.arrayProductId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(confirmProduct.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(confirmProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("FULFILLED");
    });
    builder.addCase(confirmProduct.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
      console.log("REJECTED");
    });
  },
});

const editProductSlice = createSlice({
  name: "edit product",
  initialState: {
    productId: null,
    dataSource: { price: 0 },
    dataEdit: {},
  },
  reducers: {
    getProductId: (state, action) => {
      state.productId = action.payload;
    },
    setdataSource: (state, action) => {
      state.dataSource = action.payload;
    },
    setNameEdit: (state, action) => {
      state.dataSource.name = action.payload;
    },
    setSortEdit: (state, action) => {
      state.dataSource.sort = action.payload;
    },
    setPriceEdit: (state, action) => {
      state.dataSource.price = action.payload;
    },
    setWarehouseEdit: (state, action) => {
      state.dataSource.warehouse = action.payload;
    },
    setDescriptionEdit: (state, action) => {
      state.dataSource.description = action.payload;
    },
    setWeightEdit: (state, action) => {
      state.dataSource.weight = action.payload;
    },
    setStatusEdit: (state, action) => {
      state.dataSource.status = action.payload;
    },
    setImageEdit: (state, action) => {
      state.dataSource.image = action.payload;
    },
    setDataEditProduct: (state, action) => {
      state.dataEdit = action.payload;
    },
    resetInputEditProduct: (state, action) => {
      state.dataEdit.name = "";
      state.dataEdit.sort = "";
      state.dataEdit.price = "";
      state.dataEdit.warehouse = "";
      state.dataEdit.description = "";
      state.dataEdit.weight = "";
      state.dataEdit.status = "";
      state.dataEdit.image = "";
    },
  },
});

export const confirmProduct = createAsyncThunk(
  "load/confirm",
  async (arrayProductId) => {
    const res = await axios.post(
      `${process.env.REACT_APP_PORT_API}/confirmProduct`,
      { arrayProductId }
    );
    console.log(">>>du lieu:", res);
    return res;
  }
);

export const { pushProductId, removeProductId, saveArrayProduct } =
  manageProduct.actions;

export const {
  getProductId,
  setdataSource,
  setDescriptionEdit,
  setImageEdit,
  setNameEdit,
  setPriceEdit,
  setSortEdit,
  setStatusEdit,
  setWarehouseEdit,
  setWeightEdit,
  resetInputEditProduct,
  setDataEditProduct,
} = editProductSlice.actions;

export { manageProduct, editProductSlice };
