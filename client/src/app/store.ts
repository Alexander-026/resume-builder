import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import resumeBuilderSlice from "../features/resumeBuilder/resumeBuilderSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    resumeBuilder: resumeBuilderSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
