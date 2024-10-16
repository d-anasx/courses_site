import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3030";

// Helper function for API calls
const apiCall = async (method, endpoint, data = null) => {
  try {
    const config = { method, url: `${BASE_URL}${endpoint}` };
    if (data) config.data = data;
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error.response?.data || error.message;
  }
};

export const fetchCourses = createAsyncThunk("courses/fetchCourses", 
  async () => {
    const data = await apiCall("get", "/courses");
    console.log('Fetched courses:', data);
    return data;
  }
);

export const addCourse = createAsyncThunk("courses/addCourse", 
  (course) => apiCall("post", "/courses/", course)
);

export const removeCourse = createAsyncThunk("courses/removeCourse", 
  (courseId) => apiCall("delete", `/courses/${courseId}`).then(() => courseId)
);

export const updateCourse = createAsyncThunk("courses/updateCourse", 
  (course) => apiCall("put", `/courses/${course.id}`, course)
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
        console.log('Courses state after fetch:', state.courses);
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      .addCase(removeCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(course => course.id !== action.payload);
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(course => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      });
  }
});

export const { reducer: coursesReducer } = coursesSlice;

export default coursesSlice.reducer;