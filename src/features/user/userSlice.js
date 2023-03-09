import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const userObj = JSON.parse(localStorage.getItem('user'))
const isLoggedIn = userObj ? true : false;

const initialState = {
  isLoggedIn: isLoggedIn,
  user: userObj?.user,
  status: 'idle',
  error: null
}

export const register = createAsyncThunk('users/register', async (credential) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credential)
  }

  const response = await fetch(`http://localhost:3001/register`, requestOptions)

  if (response.ok) {
    return response
  } else {
    throw Error(response.statusText)
  }
})


export const login = createAsyncThunk('users/login', async (credential) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credential)
  }

  const res = await fetch('http://localhost:3001/login', requestOptions)

  if (res.ok) {
    const data = await res.json()
    localStorage.setItem('user', JSON.stringify(data))
    console.log(data)
    return data
  } else {
    throw Error(res.statusText)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    statusReset(state, action) {
      state.status = 'idle'
    },
    logout(state, action) {
      localStorage.removeItem('user')
      state.isLoggedIn = false
      state.user = null
    }
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = 'loading'
    },
    [login.fulfilled]: (state, action) => {
      state.status = 'successed'
      state.isLoggedIn = true
      state.user = action.payload
    },
    [register.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message
    },
    [register.pending]: (state, action) => {
      state.status = 'loading'
    },
    [register.fulfilled]: (state, action) => {
      state.status = 'successed';
    },
    [register.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message
    }
  }
})

export const { statusReset, logout } = userSlice.actions;
export default userSlice.reducer;