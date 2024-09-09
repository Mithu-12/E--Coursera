import { CourseProgress } from "@/components/course-progress";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { BookOpen } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


// for mobile sidebar

import SearchCourse from "./_components/SearchCourse";
import SortCourse from "./_components/SortCourse";
import FilterCourseMobile from "./_components/FilterCourseMobile";
import ActiveFilters from "./_components/ActiveFilters";
import FilterCourse from "./_components/FilterCourse";
import CourseCard from "./_components/CourseCard";
import { getCourses } from "@/queries/courses";

const PRICE_OPTIONS = [
  { label: "Free", value: "free" },
  { label: "Paid", value: "paid" },
];

const SIZE_FILTERS = {
  id: "size",
  name: "Size",
  options: [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
  ],
};

const CATEGORY_OPTIONS = [
  {
    id: 1,
    label: "Design",
    value: "design",
  },

  {
    id: 3,
    label: "Development",
    value: "development",
  },
  {
    id: 4,
    label: "Marketing",
    value: "marketing",
  },
  {
    id: 5,
    label: "IT & Software",
    value: "it-software",
  },
  {
    id: 6,
    label: "Personal Development",
    value: "personal-development",
  },
  {
    id: 7,
    label: "Business",
    value: "business",
  },
  {
    id: 8,
    label: "Photography",
    value: "photography",
  },
  {
    id: 9,
    label: "Music",
    value: "music",
  },
];
// const courses = [
//   {
//     id: 1,
//     title: "Design",
//     thumbnail: "/assets/images/categories/design.jpg",
//   },

//   {
//     id: 3,
//     title: "Development",
//     thumbnail: "/assets/images/categories/development.jpg",
//   },
//   {
//     id: 4,
//     title: "Marketing",
//     thumbnail: "/assets/images/categories/marketing.jpg",
//   },
//   {
//     id: 5,
//     title: "IT & Software",
//     thumbnail: "/assets/images/categories/it_software.jpg",
//   },
//   {
//     id: 6,
//     title: "Personal Development",
//     thumbnail: "/assets/images/categories/personal_development.jpg",
//   },
//   {
//     id: 7,
//     title: "Business",
//     thumbnail: "/assets/images/categories/business.jpg",
//   },
//   {
//     id: 8,
//     title: "Photography",
//     thumbnail: "/assets/images/categories/photography.jpg",
//   },
//   {
//     id: 9,
//     title: "Music",
//     thumbnail: "/assets/images/categories/music.jpg",
//   },
// ];
const CoursesPage = async() => {
 const courses = await getCourses()
  return (
    <section
      id="courses"
      className="container space-y-6   dark:bg-transparent py-6"
    >
      {/* <h2 className="text-xl md:text-2xl font-medium">All Courses</h2> */}
      {/* header */}
      <div className="flex items-baseline justify-between  border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
        <SearchCourse/>

        <div className="flex items-center justify-end gap-2 max-lg:w-full">
         <SortCourse/>

          {/* Filter Menus For Mobile */}

          <FilterCourseMobile/>
        </div>
      </div>
      {/* header ends */}
      {/* active filters */}
      <ActiveFilters filter={{
        categories: ["development"],
        price: ['free'],
        sort: ''
      }}/>
      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          {/* these component can be re use for mobile also */}
          <FilterCourse/>
          {/* Course grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {courses.map((course) => {
              return (
                <CourseCard key={course.id} course={course}/>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};
export default CoursesPage;