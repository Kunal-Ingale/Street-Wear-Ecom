import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,getAuth } from 'firebase/auth';
import { clearCart } from './CartSlice';
import { auth } from '../Firebase/firebase';
// const dispatch  = useDispatch();

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        // Add other necessary fields here
      };
      return user;
    } catch (error) {
     console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        
      };
    
      return user;
    } catch (error) {
     
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch,rejectWithValue }) => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      dispatch(clearCart()); 
      return null;
    } catch (error) {
      
      return rejectWithValue(error.message);
    }
  }
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    checked: false,
  },
  reducers: {
    checkAuthState: (state) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        state.user = user;
      }
      state.checked = true; // Set checked to true after checking auth state
    },
  },
  
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
       
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      })

      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // Clear user state on logout
       
        localStorage.removeItem('user');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AuthSlice.reducer;
export const { checkAuthState } = AuthSlice.actions;