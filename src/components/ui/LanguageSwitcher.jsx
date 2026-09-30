import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'primereact/listbox';

const languages = [
  { lang: 'es', pathFlagImg: '/assets/flags/es-flag.svg', language: 'español' },
  { lang: 'en', pathFlagImg: '/assets/flags/en-flag.svg', language: 'inglés' },
];

const LanguageOption = (option) => (
  <div className="language-switcher__option" data-testid={`language-switcher-option-${option.lang}`}>
    <img className="language-switcher__flag" alt="" src={option.pathFlagImg} />
    <span>{option.language}</span>
  </div>
);

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    () => languages.find(l => l.lang === i18n.resolvedLanguage) || languages[0]
  );

  const changeLanguage = async (selected) => {
    if (!selected) return;
    await i18n.changeLanguage(selected.lang);
    setSelectedLanguage(selected);
    setOpen(false);
  };

  return (
    <div className="language-switcher" data-testid="language-switcher">
      <button
        type="button"
        className="language-switcher__trigger"
        data-testid="language-switcher-trigger"
        aria-label={selectedLanguage.language}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
      >
        <img className="language-switcher__flag" alt="" src={selectedLanguage.pathFlagImg} />
        <span>{selectedLanguage.lang.toUpperCase()}</span>
        <span className={`pi ${open ? 'pi-chevron-up' : 'pi-chevron-down'}`} aria-hidden="true"></span>
      </button>

      {open && (
        <div className="language-switcher__menu" data-testid="language-switcher-menu">
          <ListBox
            value={selectedLanguage}
            onChange={(e) => changeLanguage(e.value)}
            options={languages}
            optionLabel="language"
            itemTemplate={LanguageOption}
          />
        </div>
      )}
    </div>
  );
}
