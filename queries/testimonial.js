import { replaceMongoIdInArray } from "@/lib/convertData";
import { Testimonial } from "@/model/testimonial-model";

export async function getTestimonialForCourse(courseId) {
  const getTestimonial = await Testimonial.find({ courseId: courseId }).lean();
  return replaceMongoIdInArray(getTestimonial);
}
