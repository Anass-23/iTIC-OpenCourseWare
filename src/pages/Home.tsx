import { courses, optatives, Assignatura, Quadrimestre} from "../data/assignatures";
import { useTranslation } from 'react-i18next';
import { BiBookContent } from "react-icons/bi"
import CourseGroupCard from "../components/CourseGroupCard";
import { isCordova } from "../utils";


export default function HomePage() {
  const { t } = useTranslation();
  const years: string[] = ["Quadrimestre 1", "Quadrimestre 2", "Quadrimestre 3", "Quadrimestre 4", "Quadrimestre 5", "Quadrimestre 6", "Quadrimestre 7", "Quadrimestre 8"];
  const courseYearsGroups: string[] = ["primer", "segon", "tercer", "quart"];
  const courseGroups: Quadrimestre[] = [];

  for (let i = 0; i < courseYearsGroups.length; i++) {
    const group: Quadrimestre = {
      name: t(`home.cursos.${courseYearsGroups[i]}`),
      courses: [],
    };

    for (let j = i * 2; j < i * 2 + 2; j++) {
      if (j >= years.length) break;
      const year = t('home.cursos.quad') + ' ' + years[j].split(' ')[1];
      const yearCourses: Assignatura[] = courses.filter((course) => course.year === years[j]);
      group.courses.push({ year, yearCourses });
    }

    courseGroups.push(group);
  }
        
  return (
    <main>
      
      {/* <section className="container mx-auto px-4 py-10"> */}
      <section className="container mx-auto px-4 py-20 sm:py-20 xs:py-8">

        {/* <div className="mx-auto max-w-7xl px-6 lg:px-8"> */}
          <div className="mx-auto max-w-2xl lg:text-center pb-8">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              iTIC OpenCourseWare
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('home.title')}
            </p>
          </div>
          
        {courseGroups.map((group) => (
            <CourseGroupCard key={group.name} name={group.name} courses={group.courses}/>
        ))}


        {/* <div 
          key="optatives" 
          // className="mb-8"
          className="shadow-md rounded-lg overflow-hidden w-full"
        >
            <h2 className="text-2xl font-bold mb-4">{t('home.cursos.optativa')}</h2>

            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-lg">
            <h3 className="text-lg font-bold">{t('home.cursos.optatives')}</h3>
            </div>
            {optatives.map((optativa) => (
            <div
                key={optativa.name}
                className="bg-white shadow-md rounded-lg overflow-hidden w-full"
            >
                <div className="px-6 py-4">
                <div key={optativa.name} className="flex-shrink-0 group block mb-4">
                    <div className="flex items-center">
                    <a href={`/${encodeURIComponent(optativa.name)}`}>
                        <img
                        className="w-10 h-10 rounded-full"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Integral_example.svg/300px-Integral_example.svg.png"
                        alt=""
                        />
                    </a>
                    <div className="ml-3">
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                        {optativa.name}
                        </h3>
                        <p className="text-sm font-medium text-gray-400">
                        professor@upc.edu
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div> */}

        <h2 className="text-2xl font-bold mb-4 text-blue-600">{t('home.cursos.optatives')}</h2>


        <div className="shadow-md rounded-lg overflow-hidden w-full">
          <div className="flex items-center justify-center px-6 py-4 bg-gray-100 border-b border-gray-200">
            <span className="inline-block mr-2 items-center">
              <BiBookContent className="flex-shrink-0 h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold">{t('home.cursos.optatives')}</h3>
          </div>

          {optatives.map((optativa) => (
            <div
              key={optativa.name}
              className="flex-shrink-0 group block mt-4 mb-4 bg-white overflow-hidden"
            >
              <div className="px-6 py-1">
                <div className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <a 
                      href={isCordova() ? 
                        `#/${encodeURIComponent(optativa.acro)}/teoria`
                        :
                        `/${encodeURIComponent(optativa.acro)}/teoria`
                      }
                      className="flex items-center"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Integral_example.svg/300px-Integral_example.svg.png"
                        alt=""
                      />
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-800 dark:text-white hover:text-blue-600">
                          {optativa.name}
                        </h3>
                        <p className="text-sm font-medium text-gray-400">
                          <b><i>{optativa.acro}</i></b>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}