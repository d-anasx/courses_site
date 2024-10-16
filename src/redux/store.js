import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice'; // Assuming the courses slice is in a file named coursesSlice.js

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    // Add other reducers here as your app grows
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['your-non-serializable-action-type'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      // Ignore these paths in the state
      ignoredPaths: ['courses.someNonSerializableProp'],
    },
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;