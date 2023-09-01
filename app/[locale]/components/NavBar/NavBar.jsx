import React from 'react'
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher'
import IntlSwitcher from './IntlSwitcher/IntlSwitcher'
import style from './NavBar.module.css'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const NavBar = () => {
    const t = useTranslations('NavBar')
  return (
    <div className={style.navBarContainer}>
        <div className={style.navBarLogo}>
            {/* <img src="/logo.png" alt="logo" /> */}
            <h1>GC</h1>
        </div>
        <div className={style.navBarLinks}>
            <Link href="#">{t('About')}</Link>
            <Link href="#">{t('Proyects')}</Link>
            <Link href="#">{t('Contact')}</Link>
        </div>
        <div className={style.navBarSwetchers}>
        <IntlSwitcher />
        <ThemeSwitcher />
        </div>
    </div>
  )
}

export default NavBar