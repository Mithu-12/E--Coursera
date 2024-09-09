import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment } from "@/model/enrollment-model";


export async function getEnrollmentsForCourse(courseId) {
    const enrollment = await Enrollment.find({course: courseId}).lean()
    return replaceMongoIdInArray(enrollment)
}