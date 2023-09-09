// 
import About from './components/About/About'
import Proyects from './components/Proyects/Proyects'
import style from './page.module.css'
import { elFestin, piFood, rickAndMorty } from '@/app/assets/iamgeUrls'

import {useTranslations} from 'next-intl'

export default function Home() {
  const t = useTranslations('Index')
  const tP = useTranslations('Proyects')
  console.log(tP('elFestin.description'));
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
      link: 'https://github.com/tatoclemente/Proyecto-Integrador',
    },
  ]
  return (
    <div className={style.homeContainer}>
      <About t={t}/>
      <Proyects title={tP('title')} buttonLink={tP('button')} proyectsList={proyectsList}/>
    </div>
  )
}
