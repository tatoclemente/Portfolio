import React from 'react'
import style from './NavBar.module.css'
import { useTranslations } from 'next-intl'
import Menu from './Menu/Menu'
import Link from 'next/link'

const NavBar = ({ locale }) => {
  const t = useTranslations('NavBar')
  const menuItems = {
    about: t('About'),
    proyects: t('Proyects'),
    contact: t('Contact'),
    meeting: t('Meeting'),
    allRight: t('AllRight')
  }
  const downloadResume = t('DownloadResume')
  return (
    <div className={style.navBarContainer}>
      <div className={style.navBarLogo}>
        <Link href='#'><h1>GC</h1></Link>
      </div>
      <Menu menuItems={menuItems} locale={locale} downloadResume={downloadResume} />
    </div>
  )
}

export default NavBar