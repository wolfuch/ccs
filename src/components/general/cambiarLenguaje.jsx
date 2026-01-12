import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ListBox } from 'primereact/listbox';
import { Avatar } from "primereact/avatar";

const languages = [
  { lang: "es", pathFlagImg: "assets/flags/es-flag.svg", alt: "es flag", language: "español" },
  { lang: "en", pathFlagImg: "assets/flags/en-flag.svg", alt: "en flag", language: "inglés" },
];

const LanguageTemplate = (option) => {
    return (
        <div>
            <img alt={option.language} src={option.pathFlagImg} style={{ width: '1rem', marginTop: '0.5rem' }}/>
            <div>{option.language}</div>
        </div>
    );
};

const LanguageList = ({ closeComboChangeLang, selectedLanguage, setSelectedLanguage }) => {
  const { i18n } = useTranslation();
  const [, setChangingLang] = useState(false);

  const ChangeLanguage = async (selected) => {
    setChangingLang(true);
    await i18n.changeLanguage(selected.lang);
    setSelectedLanguage(selected);
    closeComboChangeLang(false);
    setChangingLang(false);
    //window.location.reload();
  }

  return (
    <div id="container-languages" className="mt-5" style={{zIndex: "10", position: "absolute", right: "10px"}}> 
    {/* style={{zIndex: 20, width: "10rem", position: "absolute", top: "3rem" }}>   */}
        <ListBox value={selectedLanguage} 
                 onChange={async (e) => await ChangeLanguage(e.value)} 
                 options={languages} 
                 optionLabel="language" 
                 itemTemplate={LanguageTemplate} 
          
        />
    </div>
  )

};

const CambiarLenguaje = () => {;
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const defaultLanguage = languages.find(lang => lang.lang === i18n.resolvedLanguage) || languages[0];
  const [selectedLanguage, setSelectedLanguage] = useState({lang: i18n.resolvedLanguage, pathFlagImg: `/assets/flags/${i18n.resolvedLanguage}-flag.svg`, alt: `${i18n.resolvedLanguage} flag`, language: `${defaultLanguage.language}`}); 

  return (
    <div>
      <Avatar 
        onClick={() => setOpen((prev) => !prev)} 
        image={selectedLanguage.pathFlagImg} 
        shape="circle"   // forma circular
        size="normal"    // tamaño          
        />
   
      {open && 
        <LanguageList 
          closeComboChangeLang={setOpen} 
          selectedLanguage={selectedLanguage} 
          setSelectedLanguage={setSelectedLanguage} 
        />}
    </div>
  );
};

export default CambiarLenguaje;
