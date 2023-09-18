// 
import About from './components/About/About'
import CalendlyForm from './components/Calendly/Calendly'
import Footer from './components/Footer/Footer'
import { ContactUs } from './components/Form/ContactUs'
import Proyects from './components/Proyects/Proyects'
import style from './page.module.css'
import { elFestin, piFood, rickAndMorty } from '@/app/assets/iamgeUrls'

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

  const proyectsList = [
    {
      title: 'El Festin',
      images: elFestin,
      description: tP('elFestin.description'),
      link: 'https://pf-front-end-grupo3.vercel.app/',
    },
    {
      title: 'Henry Food',
      images: piFood,
      description: tP('henryFood.description'),
      link: 'https://henrysfood.netlify.app/',
    },
    {
      title: 'Rick And Morty',
      images: rickAndMorty,
      description: tP('rickAndMorty.description'),
      link: 'https://rickandmorty-five-ruby.vercel.app/',
    },
  ]
  const proyectTexts = {
    title: tP('title'),
    button: tP('button'),
    alertTitle: tP('alertTitle'),
    alertText: tP('alertText'),
    confirmButtonText: tP('confirmButtonText'),
    denyButtonText: tP('denyButtonText'),
  }
  return (
    <div className={style.homeContainer}>
      <About t={t} />
      <Proyects proyectTexts={proyectTexts} proyectsList={proyectsList} />
      <CalendlyForm titleMeeting={contactIntl.meeting} />
      <ContactUs contactIntl={contactIntl} />
      <Footer />
    </div>
  )
}
