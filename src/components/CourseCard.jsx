import { supabase } from '../supabaseClient'

function CourseCard({ course, session }) {
  
  async function handleEnroll() {
    // 1. Check if user is logged in
    if (!session) {
      alert("Please log in first to enroll in courses!")
      return
    }

    try {
      // 2. Add an entry to the 'enrollments' table
      const { error } = await supabase
        .from('enrollments')
        .insert([
          { 
            user_id: session.user.id, 
            course_id: course.id 
          }
        ])

      if (error) {
        // Error code 23505 means the user is already enrolled (Unique constraint)
        if (error.code === '23505') {
          alert("You're already enrolled! Redirecting to the course...")
        } else {
          throw error
        }
      } else {
        alert("Success! You are now enrolled.")
      }

      // 3. After enrolling, open the course website
      if (course.course_link) {
        window.open(course.course_link, '_blank')
      } else {
        alert("Enrollment saved, but no course link found in database.")
      }

    } catch (error) {
      console.error("Error enrolling:", error.message)
      alert("Fail to enroll: " + error.message)
    }
  }

  return (
    <div className="course-card">
      <img src={course.image_url} alt={course.title} className="course-image" />
      <div className="course-content">
        <h3>{course.title}</h3>
        <p className="instructor">By {course.instructor}</p>
        <p className="description">{course.description}</p>
        
        <button className="start-btn" onClick={handleEnroll}>
          Enroll & Start Learning
        </button>
      </div>
    </div>
  )
}

export default CourseCard