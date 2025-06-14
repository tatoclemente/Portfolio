// 
import About from './components/About/About'
import CalendlyForm from './components/Calendly/Calendly'
import Footer from './components/Footer/Footer'
import { ContactUs } from './components/Form/ContactUs'
import Projects from './components/Projects/Projects'
import style from './page.module.css'
import { elFestin, piFood, rickAndMorty, tesloShop } from '@/app/assets/iamgeUrls'

import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('Index')
  const tP = useTranslations('Proyects')
  const tC = useTranslations('Contact')

  const contactIntl = {
    meeting: tC("meeting"),
    contact: tC("contact"),
    subtitle: tC("subtitle"),
    helpMessage: tC("helpMessage"),
    name: tC("name"),
    nameError: tC("nameError"),
    nameErrorFormat: tC("nameErrorFormat"),
    namePlaceholder: tC("namePlaceholder"),
    email: tC("email"),
    emailError: tC("emailError"),
    emailErrorFormat: tC("emailErrorFormat"),
    emailPlaceHolder: tC("emailPlaceHolder"),
    message: tC("message"),
    messageError: tC("messageError"),
    messageErrorFormat: tC("messageErrorFormat"),
    messagePlaceHolder: tC("messagePlaceHolder"),
    buttonText: tC("buttonText"),
    alertTitleSuccess: tC("alertTitleSuccess"),
    alertTextSuccess: tC("alertTextSuccess"),
    alertTitle: tC("alertTitle"),
    alertText: tC("alertText"),
    loadingText: tC("loadingText"),
  }

  const projectsList = [
    {
      title: 'TesloShop',
      images: tesloShop,
      description: tP('tesloShop.description'),
      link: 'https://tesloshop-gc.vercel.app/',
      githubLink: 'https://github.com/tatoclemente/Teslo-Shop',
    },
    {
      title: 'El Festin',
      images: elFestin,
      description: tP('elFestin.description'),
      link: 'https://pf-front-end-grupo3.vercel.app/',
      githubLink: 'https://github.com/tatoclemente/PF-Front-End-Grupo3',
    },
    {
      title: 'Henry Food',
      images: piFood,
      description: tP('henryFood.description'),
      link: 'https://henrysfood.netlify.app/',
      githubLink: 'https://github.com/tatoclemente/PI-HENRY-FOOD',
    },
    // {
    //   title: 'Rick And Morty',
    //   images: rickAndMorty,
    //   description: tP('rickAndMorty.description'),
    //   link: 'https://rickandmorty-five-ruby.vercel.app/',
    // },
  ]
  const projectTexts = {
    title: tP('title'),
    button: tP('button'),
    gitHubButton: tP('gitHubButton'),
    alertTitle: tP('alertTitle'),
    alertText: tP('alertText'),
    confirmButtonText: tP('confirmButtonText'),
    denyButtonText: tP('denyButtonText'),
  }

  const leftText = {
    hello: t("hello"),
    name: t("name"),
    descriptionHeader: t("description.header"),
    descriptionP1: t('description.p1'),
    descriptionP2: t('description.p2'),
    contactButton:t('description.contact'),
    modalContact1: t('description.modalContact1'),
    modalContact2: t('description.modalContact2'),
    modalContact3: t('description.modalContact3'),
  }

  return (
    <div className={style.homeContainer}>
      <About leftText={leftText} contactIntl={contactIntl} />
      <Projects projectTexts={projectTexts} projectsList={projectsList} />
      <CalendlyForm titleMeeting={contactIntl.meeting} />
      <div className={style.contact}>
        <ContactUs contactIntl={contactIntl} />
      </div>
      <Footer />
    </div>
  )
}
