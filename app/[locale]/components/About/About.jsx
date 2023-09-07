import style from './About.module.css'
import { useLocale } from 'next-intl'
import ArrowScroll from '../ArrowScroll/ArrowScroll'
import LeftSection from './LeftSection/LeftSection'
import RightSection from './RightSection/RightSection'


const About = ({ t }) => {
  const locale = useLocale()
  return (
    <div className={style.AboutContainer}>
      <section className={style.sectionLeft}>
        <LeftSection t={t} locale={locale} />
      </section>
      <section className={style.sectionRight}>
        <RightSection />
      </section>
      <ArrowScroll />
    </div>
  )
}

export default About