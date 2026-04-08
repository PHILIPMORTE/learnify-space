function CourseCard({ course }) {
  
  function handleEnroll() {
    window.open('https://www.freecodecamp.org/', '_blank')
  }

  return (
    <div className="course-card">
      <img src={course.image_url} alt={course.title} className="course-image" />
      <div className="course-content">
        <h3>{course.title}</h3>
        <p className="instructor">By {course.instructor}</p>
        <p className="description">{course.description}</p>
        
        <button className="start-btn" onClick={handleEnroll}>
          Go to Course Website
        </button>
      </div>
    </div>
  )
}

export default CourseCard