import style from './About.module.css'
import { useLocale } from 'next-intl'
import ArrowScroll from '../ArrowScroll/ArrowScroll'
import LeftSection from './LeftSection/LeftSection'
import RightSection from './RightSection/RightSection'


const About = ({ t }) => {
  const locale = useLocale()

  const leftText = {
    hello: t("hello"),
    name: t("name"),
    descriptionHeader: t("description.header"),
    descriptionP1: t('description.p1'),
    descriptionP2: t('description.p2'),
    descriptionContact:t('description.contact')
  }
  return (
    <div className={style.AboutContainer}>
      <section className={style.sectionLeft}>
        <LeftSection leftText={leftText} locale={locale} />
      </section>
      <section className={style.sectionRight}>
        <RightSection />
      </section>
      <ArrowScroll />
      <svg className={style.wave} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#eefbfe" fill-opacity="1" d="M0,224L80,224C160,224,320,224,480,197.3C640,171,800,117,960,90.7C1120,64,1280,64,1360,64L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>

    </div> 
  )
}

export default About