const CourseCard = (course) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold">{course.course.title}</h2>
      <p className="text-gray-700 text-sm">{course.course.instructor}</p>
      <p className="text-gray-700 text-sm">{course.course.credits} credits</p>
      <p className="text-gray-700 text-sm">{course.course.schedule}</p>
      <img src={course.course.image} className="w-full h-48 object-cover mt-4"/>
    </div>
  )
}

export default CourseCard
