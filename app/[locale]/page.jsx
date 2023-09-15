// 
import About from './components/About/About'
import CalendlyForm from './components/Calendly/Calendly'
import { ContactUs } from './components/Form/ContactUs'
import Proyects from './components/Proyects/Proyects'
import style from './page.module.css'
import { elFestin, piFood, rickAndMorty } from '@/app/assets/iamgeUrls'

import {useTranslations} from 'next-intl'

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
    namePlaceholder: tC("namePlaceholder"),
    email: tC("email"),
    emailPlaceHolder: tC("emailPlaceHolder"),
    message: tC("message"),
    messagePlaceHolder: tC("messagePlaceHolder"),
    buttonText: tC("buttonText"),
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
  return (
    <div className={style.homeContainer}>
      <About t={t}/>
      <Proyects title={tP('title')} buttonLink={tP('button')} proyectsList={proyectsList}/>
      <CalendlyForm titleMeeting={contactIntl.meeting} />
      <ContactUs contactIntl={contactIntl}/>
    </div>
  )
}
