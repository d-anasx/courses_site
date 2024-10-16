import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, addCourse, updateCourse, removeCourse } from '../redux/coursesSlice';
import CourseCard from '../components/CourseCard';

const CoursesPage = () => {
    const dispatch = useDispatch();
    const { courses, status, error } = useSelector((state) => state.courses);
    const [newCourse, setNewCourse] = useState({ title: '', description: '', image: '', schedule: '', instructor: '', credits: '' });
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

    const handleUpdateCourse = (course) => {
        setEditingCourse(course);
        setNewCourse({ title: course.title, description: course.description, image: course.image, schedule: course.schedule, instructor: course.instructor, credits: course.credits });
        setIsUpdating(true);
        setIsModalOpen(true);
    };

    const handleUpdateCourseSubmit = () => {
        const updatedCourse = { ...editingCourse, title: newCourse.title, description: newCourse.description, image: newCourse.image, schedule: newCourse.schedule, instructor: newCourse.instructor, credits: newCourse.credits };
        dispatch(updateCourse(updatedCourse));
        setNewCourse({ title: '', description: '', image: '', schedule: '', instructor: '', credits: '' });
        setIsUpdating(false);
        setIsModalOpen(false);  // Close modal after updating
    };

    const handleRemoveCourse = (courseId) => {
        dispatch(removeCourse(courseId));
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewCourse({ title: '', description: '', image: '', schedule: '', instructor: '', credits: '' });
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
                <div className='flex flex-wrap gap-2 p-2 border border-slate-700'>
                    {courses.map((course) =>
                        <CourseCard key={course.id} course={course} handleUpdateCourse={handleUpdateCourse} handleRemoveCourse={handleRemoveCourse} />
                    )}
                </div>
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
                        <input
                            type="text"
                            name="image"
                            value={newCourse.image}
                            onChange={handleInputChange}
                            placeholder="Course Image URL"
                            className="border p-2 w-full mb-2"
                        />
                        <input
                            type="text"
                            name="schedule"
                            value={newCourse.schedule}
                            onChange={handleInputChange}
                            placeholder="Course Schedule"
                            className="border p-2 w-full mb-2"
                        />
                        <input
                            type="text"
                            name="instructor"
                            value={newCourse.instructor}
                            onChange={handleInputChange}
                            placeholder="Course Instructor"
                            className="border p-2 w-full mb-2"
                        />
                        <input
                            type="text"
                            name="credits"
                            value={newCourse.credits}
                            onChange={handleInputChange}
                            placeholder="Course Credits"
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
                                onClick={isUpdating ? handleUpdateCourseSubmit : handleAddCourse}
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


