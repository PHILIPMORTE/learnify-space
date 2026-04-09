import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import CourseCard from '../components/CourseCard'

function MyCourses({ session }) {
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) fetchMyCourses()
  }, [session])

  async function fetchMyCourses() {
    try {
      // This query joins the enrollments table with the courses table
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          course_id,
          courses (*)
        `)
        .eq('user_id', session.user.id)

      if (error) throw error
      
      // We pull the nested 'courses' object out into a flat array
      if (data) {
        setEnrolledCourses(data.map(item => item.courses))
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="course-section">
      <h2 style={{textAlign: 'center', marginTop: '2rem'}}>My Learning Dashboard</h2>
      
      {loading ? (
        <p style={{textAlign: 'center'}}>Loading your courses...</p>
      ) : enrolledCourses.length > 0 ? (
        <div className="course-grid">
          {enrolledCourses.map((course) => (
            <CourseCard key={course.id} course={course} session={session} />
          ))}
        </div>
      ) : (
        <div style={{textAlign: 'center', padding: '3rem'}}>
          <p>You haven't enrolled in any courses yet!</p>
          <a href="/" className="start-btn" style={{textDecoration: 'none', display: 'inline-block', marginTop: '1rem'}}>
            Browse Courses
          </a>
        </div>
      )}
    </div>
  )
}

export default MyCourses