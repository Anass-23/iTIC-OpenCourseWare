import { useTranslation } from 'react-i18next';
import { isCordova } from '../utils';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <section className="bg-white dark:bg-gray-900 flex justify-center items-center min-h-screen">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-blue-600 md:text-4xl dark:text-white">Ooops!</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{t('404.msg')}</p>
            <a href={isCordova() ? '#/' : '/'} className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"> 
                {t('404.msgButton')}
            </a>
            </div>   
        </div>
        </section>
    );
}