import { useTranslation } from "react-i18next";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 flex-shrink-0">
      <hr
        className="text-gray-500"
        style={{ width: "80%", margin: "0 auto" }}
      />
      <div className="flex justify-center my-3">
        <a
          href="https://www.facebook.com/upcmanresa/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6"
        >
          <FaFacebook className="w-5 h-5 mx-2 text-gray-400" />
        </a>
        <a
          href="https://twitter.com/upcmanresa/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6"
        >
          <FaTwitter className="w-5 h-5 mx-2 text-gray-400" />
        </a>
        <a
          href="https://www.instagram.com/upcmanresa/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6"
        >
          <FaInstagram className="w-5 h-5 mx-2 text-gray-400" />
        </a>
      </div>

      <p className="text-center text-gray-500 text-xs mb-2">
        &copy; {currentYear} UPC. {t('footer.copy')}. 
        {" "}
        <a 
          href="https://www.upc.edu/es/aviso-legal/condiciones-de-uso-y-privacidad" 
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('footer.privacy')}.
        </a>
      </p>

      <p className="text-center text-gray-500 text-xs">
      </p>
    </footer>
  );
}