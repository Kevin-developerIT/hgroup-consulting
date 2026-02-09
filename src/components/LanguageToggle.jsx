import { useLanguage } from '../contexts/LanguageContext';
import './LanguageToggle.css';

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button className="language-toggle" onClick={toggleLanguage}>
      <span className={language === 'en' ? 'active' : ''}>EN</span>
      <span className="divider">/</span>
      <span className={language === 'es' ? 'active' : ''}>ES</span>
    </button>
  );
}

export default LanguageToggle;