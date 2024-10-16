import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, addCourse, updateCourse, removeCourse } from '../redux/coursesSlice';

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { courses, status, error } = useSelector((state) => state.courses);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

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
    setIsModalOpen(false);  // Close modal after adding
  };

  const handleOpenModalForUpdate = (course) => {
    setEditingCourse(course);
    setNewCourse({ title: course.title, description: course.description });
    setIsUpdating(true);
    setIsModalOpen(true);
  };

  const handleUpdateCourse = () => {
    const updatedCourse = { ...editingCourse, title: newCourse.title, description: newCourse.description };
    dispatch(updateCourse(updatedCourse));
    setNewCourse({ title: '', description: '' });
    setIsUpdating(false);
    setIsModalOpen(false);  // Close modal after updating
  };

  const handleRemoveCourse = (courseId) => {
    dispatch(removeCourse(courseId));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCourse({ title: '', description: '' });
    setIsUpdating(false);
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

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Course
      </button>

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
                  onClick={() => handleOpenModalForUpdate(course)}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/2">
            <h2 className="text-xl font-bold mb-4">{isUpdating ? 'Update Course' : 'Add Course'}</h2>
            <input
              type="text"
              name="title"
              value={newCourse.title}
              onChange={handleInputChange}
              placeholder="Course Title"
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              name="description"
              value={newCourse.description}
              onChange={handleInputChange}
              placeholder="Course Description"
              className="border p-2 w-full mb-2"
            />
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={isUpdating ? handleUpdateCourse : handleAddCourse}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {isUpdating ? 'Update Course' : 'Add Course'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
