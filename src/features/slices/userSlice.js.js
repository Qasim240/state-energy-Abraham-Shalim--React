import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  selectedAppointment: null,
  selectedRange: 50,
  utilityBill: 2000,
  insuranceBill: 2000,
  categories: [],
  cart: [],
  cartCount: 0,

  roofSelection: {
    variant: '',
    squareFootage: '',
    color: '',
    adders: []
  },
  solarSelection: {
    panelAmount: '',
    panelSize: '',
    totalKW: '',
    includeBattery: false,
    batteryCapacity: '',
    inverterCapacity: '',
    adders: []
  },
  hvacSelection: {
    variant: '',
    capacity: '',
    adders: []
  },
  windowSelection: [],
  doorSelection: [],
  insulationSelection: {
    subCategory: '',
    rValue: '',
    squareFootage: '',
    insulationRemoval: false,
    adders: []
  },
  otherSelection: {
    feedback: '',
    totalPrice: '',
    adders: []
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, user } = action.payload;
      state.user = {
        token,
        ...user,
        full_name: `${user.first_name} ${user.last_name}`,
      };
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.selectedAppointment = null;
      state.categories = [];

      state.roofSelection = {
        variant: '',
        squareFootage: '',
        color: '',
        adders: []
      };
      state.solarSelection = {
        panelAmount: '',
        panelSize: '',
        totalKW: '',
        includeBattery: false,
        batteryCapacity: '',
        inverterCapacity: '',
        adders: []
      };
      state.hvacSelection = {
        variant: '',
        capacity: '',
        adders: []
      };
      state.windowSelection = [];
      state.doorSelection = [];
      state.insulationSelection = {
        subCategory: '',
        rValue: '',
        squareFootage: '',
        insulationRemoval: false,
        adders: []
      };
      state.otherSelection = {
        feedback: '',
        totalPrice: '',
        adders: []
      };
    },
    setSelectedAppointment: (state, action) => {
      state.selectedAppointment = action.payload;
    },
    setUtilityBill: (state, action) => {
      state.utilityBill = action.payload;
    },
    setInsuranceBill: (state, action) => {
      state.insuranceBill = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setRoofSelection: (state, action) => {
      state.roofSelection = action.payload;
    },
    setSolarSelection: (state, action) => {
      state.solarSelection = action.payload;
    },
    setHvacSelection: (state, action) => {
      state.hvacSelection = action.payload;
    },
    setWindowSelection: (state, action) => {
      state.windowSelection = action.payload;
    },
    setDoorSelection: (state, action) => {
      state.doorSelection = action.payload;
    },
    setInsulationSelection: (state, action) => {
      state.insulationSelection = action.payload;
    },
    setOtherSelection: (state, action) => {
      state.otherSelection = action.payload;
    },
    addToCart: (state, action) => {
      if (!Array.isArray(state.cart)) {
        state.cart = [];
        state.cartCount = 0;
      }
      state.cart.push(action.payload);
      state.cartCount = state.cart.length;
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      state.cartCount = state.cart.length;
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartCount = 0;
    }
  },
});

export const {
  setUser,
  clearUser,
  setSelectedAppointment,
  setUtilityBill,
  setInsuranceBill,
  setCategories,
  setRoofSelection,
  setSolarSelection,
  setHvacSelection,
  setWindowSelection,
  setDoorSelection,
  setInsulationSelection,
  setOtherSelection, // New action for Other category
  addToCart,
  removeCartItem,
  clearCart,
} = userSlice.actions;

export default userSlice.reducer;