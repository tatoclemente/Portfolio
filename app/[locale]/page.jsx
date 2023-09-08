// 
import About from './components/About/About'
import Proyects from './components/Proyects/Proyects'
import style from './page.module.css'

import {useTranslations} from 'next-intl'

export default function Home() {
  const t = useTranslations('Index')
  return (
    <div className={style.homeContainer}>
      <About t={t}/>
      <Proyects />
    </div>
  )
}
