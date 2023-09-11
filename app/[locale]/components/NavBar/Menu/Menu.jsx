'use client'
import React, { useState } from 'react'
import { GoKebabHorizontal } from 'react-icons/go'
import style from './Menu.module.css'
import Link from 'next/link'
import IntlSwitcher from '../IntlSwitcher/IntlSwitcher'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'

const Menu = (props) => {
  const [menu, setMenu] = useState(false)
  const toggleMenu = () => {
    setMenu(!menu)
  }

  const { about, proyects, contact, allRight } = props.menuItems;

  return (
    <div className={style.mainContainer}>
      <div className={style.menuContent}>
        <div className={style.navBarLinks}>
          <Link href="#">{about}</Link>
          <Link href="#proyects">{proyects}</Link>
          <Link href="#">{contact}</Link>
        </div>
        <div className={style.navBarSwetchers}>
          <IntlSwitcher locale={props.locale} />
          <ThemeSwitcher />
        </div>
      </div>
      <GoKebabHorizontal onClick={toggleMenu} className={style.menuIcon} />
        <div onClick={toggleMenu} style={menu === true ? {transform: 'translateX(0%)'}:null} className={style.filterBlur}></div>
        <div style={menu === true ? {transform: 'translateX(0%'}:null} className={style.menuContentToggle}>
          <div className={style.close} >
            <IoClose onClick={toggleMenu} />
          </div>
          <div className={style.navBarSwetchersToggle}>
            <IntlSwitcher locale={props.locale} />
            <ThemeSwitcher />
          </div>
          <div className={style.navBarLinksToggle}>
            <Link href="#">{about}</Link>
            <Link href="#proyects">{proyects}</Link>
            <Link href="#">{contact}</Link>
          </div>
          <div className={style.socialMedia}>
            <Link href="https://www.github.com/tatoclemente/" rel="noreferrer" className={style.github}>
              <BsGithub className={style.github} />
            </Link>
            <Link href="https://www.linkedin.com/in/tatoclemente/" rel="noreferrer">
              <BsLinkedin className={style.linkedin} />
            </Link>
          </div>
          <div className={style.footer}>
            <p>© 2023 Gustavo Clemente</p>
            <p>{allRight}</p>
          </div>
        </div>
    </div>
  )
}

export default Menu