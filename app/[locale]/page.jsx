// 
import About from './components/About/About'
import style from './page.module.css'

import {useTranslations} from 'next-intl'

export default function Home() {
  const t = useTranslations('Index')
  return (
    <div className={style.homeContainer}>
      <About t={t}/>
    </div>
  )
}
