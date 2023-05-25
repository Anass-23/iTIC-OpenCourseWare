import { FiLink2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface ToolLink {
  label: string;
  href: string;
}

interface Tool {
  title: string;
  subtitle: string;
  description: string;
  imageHref: string;
  links: ToolLink[];
}

const tools: Tool[] = [
  {
    title: 'GNU/Linux', 
    subtitle: 'Sistema operatiu', 
    description: 'En concret, en les distribucions Debian o Ubuntu.',
    imageHref: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Gnulinux.svg/800px-Gnulinux.svg.png',
    links: [
      {label: 'Ubuntu', href: 'https://www.ubuntu.com/'},
      {label: 'Debian', href: 'https://www.debian.org/'}
    ]
  },
  {
    title: 'GNU Emacs', 
    subtitle: 'Editor de text', 
    description: 'Podeu trobar com treure\'n molt profit en diversos manuals i tutorials',
    imageHref: 'https://www.gnu.org/software/emacs/images/emacs.png',
    links: [
      {label: 'OfficalWeb', href: 'https://www.gnu.org/software/emacs/'},
      {label: 'EmacsTutorial', href: 'https://www.realpython.com/emacs-the-best-python-editor/'},
    ]
  },
  {
    title: 'LaTeX', 
    subtitle: 'Sistema d\'edició de documents', 
    description: 'Descripció',
    imageHref: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaTeX_logo.svg/2560px-LaTeX_logo.svg.png',
    links: [
      {label: 'LatexProject', href: 'https://www.latex-project.org/'},
      {label: 'LatexAuctex', href: 'https://www.gnu.org/software/auctex/'},
      {label: 'TFGtemplate', href: 'http://ocwitic.epsem.upc.edu/assignatures/tfg/format-de-la-memoria/format-de-la-memoria'}
    ]
  },
  {
    title: 'Subversion & OpenProject', 
    subtitle: 'Control de versions i gestió de projectes', 
    description: 'Per al treball acadèmic i per a les pràctiques curriculars, l\'escola ofereix la plataforma Escriny.',
    imageHref: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Apache_Subversion_logo.svg/1080px-Apache_Subversion_logo.svg.png',
    links: [
      {label: 'Subversion', href: 'https://subversion.apache.org/'},
      {label: 'OpenProject', href: 'https://www.openproject.org/'},
      {label: 'Escriny', href: 'https://escriny.epsem.upc.edu%2F'}
    ]
  },
]


export default function Tools() {
  const { t } = useTranslation();
  return (
    // <div className="bg-white py-24 sm:py-32">
    <div className="bg-white py-20 sm:py-20 xs:py-8">
      
    
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            {t('tools.title')}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('tools.subtitle')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('tools.info')}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:gap-y-16">
            
          {tools.map((tool, index) => (
          
            <div key={index} className="flex flex-col bg-white border rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] shadow-2xl">

              <div className="flex items-center">
                <img className="w-10 h-auto mr-2" src={tool.imageHref} alt={`${tool.title} Logo`}/>
                
                <div className="ml-2">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {tool.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
                    {t(`tools.items.${tool.title}.subtitle`)}
                  </p>
                </div>
              </div>


              <p className="mt-2 text-gray-800 dark:text-gray-400 text-justify p-4">
                {t(`tools.items.${tool.title}.description`)}
              </p>
              {tool.links.map((link, index) => (
                <a
                  key={index}
                  className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-blue-500 hover:text-blue-700 rounded-lg border border-transparent px-5 py-2 dark:text-white hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiLink2 />
                  {t(`tools.links.${link.label}`)}
                </a>
              ))}

            </div>
          ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
  