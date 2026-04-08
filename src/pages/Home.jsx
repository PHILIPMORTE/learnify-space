import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import CourseCard from '../components/CourseCard'


function Home({ session }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  async function fetchCourses() {
    try {
      const { data, error } = await supabase.from('courses').select('*')
      if (error) throw error
      if (data) setCourses(data)
    } catch (error) {
      console.error("Error fetching courses:", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="hero">
        <h2>{session ? 'Welcome back to Learnify Space!' : 'Master Your Future'}</h2>
        <p>Learn from world-class instructors and expand your technical skill set with our premium coding courses.</p>
      </section>

      <section className="course-section">
        <h2>Explore Available Courses</h2>
        
        {loading ? (
          <p style={{textAlign: 'center', fontSize: '1.2rem'}}>Loading courses...</p>
        ) : (
          <div className="course-grid">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course.id} course={course} session={session} />
              ))
            ) : (
              <p>No courses found. Check your database!</p>
            )}
          </div>
        )}
      </section>
    </>
  )
}

export default Home