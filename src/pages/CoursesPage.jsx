import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, addCourse, updateCourse, removeCourse } from '../redux/coursesSlice';

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { courses, status, error } = useSelector((state) => state.courses);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log('Courses state:', courses);
  }, [courses]);

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleAddCourse = () => {
    dispatch(addCourse(newCourse));
    setNewCourse({ title: '', description: '' });
  };

  const handleUpdateCourse = (course) => {
    const updatedCourse = { ...course, title: `Updated: ${course.title}` };
    dispatch(updateCourse(updatedCourse));
  };

  const handleRemoveCourse = (courseId) => {
    dispatch(removeCourse(courseId));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(courses)) {
    console.error('Courses is not an array:', courses);
    return <div>Error: Courses data is not in the expected format.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      
      <div className="mb-4">
        <input
          type="text"
          name="title"
          value={newCourse.title}
          onChange={handleInputChange}
          placeholder="Course Title"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="description"
          value={newCourse.description}
          onChange={handleInputChange}
          placeholder="Course Description"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddCourse}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Course
        </button>
      </div>

      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id} className="border p-4 mb-2 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p>{course.description}</p>
              </div>
              <div>
                <button
                  onClick={() => handleUpdateCourse(course)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleRemoveCourse(course.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoursesPage;