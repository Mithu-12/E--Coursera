import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module-model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";
import { getEnrollmentsForCourse } from "./enrollment";
import { getTestimonialForCourse } from "./testimonial";

export async function getCourses() {
  const courses = await Course.find()
    .populate({ path: "category", model: Category })
    .populate({ path: "instructor", model: User })
    .populate({ path: "testimonials", model: Testimonial })
    .populate({ path: "modules", model: Module })
    .lean(); // Use .lean() to get plain JavaScript objects

  return replaceMongoIdInArray(courses);
}

export async function getCourseDetails(id) {
  const getDetails = await Course.findById(id)
    .populate({ path: "category", model: Category })
    .populate({ path: "instructor", model: User })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: User,
      },
    })
    .populate({ path: "modules", model: Module })
    .lean();

  return replaceMongoIdInObject(getDetails);
}

export async function getCourseDetailsInstructorById(instructorId) {
  const courses = await Course.find({ instructor: instructorId }).lean();

  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course._id.toString());
      return enrollment;
    })
  );
  const totalEnrollments = enrollments.reduce((acc, obj) => {
    return acc + obj.length;
  });

  const testimonials = await Promise.all(
    courses.map(async (course) => {
      const testimonial = await getTestimonialForCourse(course._id.toString());
      return testimonial;
    })
  );
  const totalTestimonials = testimonials.flat()

  const avgRating = (totalTestimonials.reduce(function(acc, obj){
    return acc + obj.rating
  }, 0)) / totalTestimonials.length
  console.log('tes',avgRating);
  return {
    courses: courses.length,
    enrollments: totalEnrollments,
    review: totalTestimonials.length,
    rating: avgRating.toPrecision(2)

  };
}
