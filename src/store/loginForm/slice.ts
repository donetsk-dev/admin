import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from '~/api'
import { AppThunk } from '~/store'
import { FieldData } from 'rc-field-form/lib/interface'
import { loginFormData } from './data'
import { authSlice } from '../auth'
import { hasRemember, showErrorFields } from '~/helpers'

export type LoginFormData = FieldData[]

export type LoginFormState = {
  loading: boolean
  form: LoginFormData
}

const initialState: LoginFormState = {
  loading: false,
  form: loginFormData
}

export const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    changeForm: (state, action: PayloadAction<LoginFormData>) => {
      state.form = [...action.payload]
    },
    changeLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

export const { changeLoader, changeForm } = loginFormSlice.actions

export const submit = (): AppThunk => async (dispatch, getState) => {
  dispatch(loginFormSlice.actions.changeLoader(true))
  const loginForm = getState().loginForm
  try {
    const { data } = await api.auth.login(getAuthData(loginForm.form))
    data.remember = hasRemember(loginForm.form)
    dispatch(authSlice.actions.changeSession(data))
  } catch (err) {
    showErrorFields(err, dispatch, changeForm, loginForm.form)
  }
  dispatch(changeLoader(false))
}

function getAuthData(data: LoginFormData) {
  const email = data.find(item => ~String(item?.name)?.indexOf('email'))?.value
  const password = data.find(item => ~String(item?.name)?.indexOf('password'))?.value
  return { email, password }
}
