import React from 'react'
import style from './NavBar.module.css'
import { useTranslations } from 'next-intl'
import Menu from './Menu/Menu'

const NavBar = ({locale}) => {
    const t = useTranslations('NavBar')
    const menuItems = {
      about: t('About'),
      proyects: t('Proyects'),
      contact: t('Contact'),
      allRight: t('AllRight')
    }
  return (
    <div className={style.navBarContainer}>
        <div className={style.navBarLogo}>
            {/* <img src="/logo.png" alt="logo" /> */}
            <h1>GC</h1>
        </div>
        <Menu menuItems={menuItems} locale={locale} />
    </div>
  )
}

export default NavBar