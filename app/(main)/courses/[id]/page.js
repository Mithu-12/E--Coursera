import { getCourseDetails } from "@/queries/courses";
import CourseDetails from "./_components/CourseDetails";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import RelatedCourse from "./_components/RelatedCourse";
import Testimonials from "./_components/Testimonials";
import { replaceMongoIdInArray } from "@/lib/convertData";

const SingleCoursePage = async({params: {id}}) => {
  const course = await getCourseDetails(id)
  // console.log('first', course)
  return (
    <>
      <CourseDetailsIntro subtitle={course?.subtitle} title={course?.title} thumbnail={course?.thumbnail}/>

      <CourseDetails course={course}/>

      {/* Testimonials */}
      {course?.testimonials && <Testimonials testimonials={replaceMongoIdInArray(course?.testimonials)}/>}
      {/* Releated Course */}
      <RelatedCourse />
      
      
    </>
  );
};
export default SingleCoursePage;
