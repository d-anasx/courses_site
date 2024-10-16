const CourseCard = ({ course, handleUpdateCourse, handleRemoveCourse }) => {
    return (
        <div className="flex flex-col min-w-60 h-80 bg-white rounded shadow-md p-4 mb-2">
            <div>
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <img src={course.image} className="w-full h-48 object-cover" alt="" />
                <p>{course.description}</p>
                <p>{course.instructor}</p>
                <p>{course.schedule}</p>
                <p>{course.credits}</p>
            </div>
            <div className='flex gap-2'>
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
        </div>
    )
}

export default CourseCard

