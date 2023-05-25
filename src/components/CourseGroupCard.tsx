import { Quadrimestre } from "../data/assignatures";
import { BiBookContent } from "react-icons/bi"
import { isCordova } from "../utils";

export default function CourseGroupCard({ name, courses }: Quadrimestre) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">{name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="shadow-md rounded-lg overflow-hidden w-full"
          >
            <div className="flex items-center justify-center px-6 py-4 bg-gray-100 border-b border-gray-200">
              <span className="inline-block mr-2 items-center">
                <BiBookContent className="flex-shrink-0 h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold">{course.year}</h3>
            </div>

            <div className="px-6 py-4">
              {course.yearCourses.map((yearCourse) => (
                <div
                  key={`${course.year}-${yearCourse.name}`}
                  className="flex-shrink-0 group block mb-4"
                >
                  {/* <div className="flex items-center"> */}
                    <a
                      href={isCordova() ? 
                        `#/${encodeURIComponent(yearCourse.acro)}/teoria`
                        :
                        `/${encodeURIComponent(yearCourse.acro)}/teoria`}

                      className="flex items-center"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={yearCourse.photo}
                        alt="Course logo"
                      />
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-800 dark:text-white hover:text-blue-600">
                          {yearCourse.name}
                        </h3>
                        <p className="text-sm font-medium text-gray-400">
                          <b><i>{yearCourse.acro}</i></b>
                        </p>
                      </div>
                    </a>
                  {/* </div> */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};