'use client'
import React, { useEffect, useState } from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import style from './Menu.module.css';
import Link from 'next/link';
import IntlSwitcher from '../IntlSwitcher/IntlSwitcher';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import DownloadResume from '../../DownloadResume/DonloadResume';

const Menu = (props) => {
  const [menu, setMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedLink, setSelectedLink] = useState('/');

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    if (isMobile) {
      toggleMenu();
    }
  };

  useEffect(() => {
    handleLinkClick('About')
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const { about, proyects, meeting, contact, allRight } = props.menuItems;

  const handleSectionClick = (sectionId, link) => (e) => {
    e.preventDefault();
    handleLinkClick(link);
    isMobile && toggleMenu();
    const section = document.querySelector(`#${sectionId}`);
    window.scrollTo({
      top: section.offsetTop - 100,
      behavior: 'smooth',
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    isMobile && toggleMenu()
    const meetingSection = document.querySelector('#meeting');
    window.scrollTo({
      top: meetingSection.offsetTop - 100, // Ajusta este valor para el desplazamiento deseado
      behavior: 'smooth', // Para habilitar la animación de desplazamiento
    });
  };

  const handleClickContact = (e) => {
    e.preventDefault();
    isMobile && toggleMenu()
    const contactSection = document.querySelector('#contact');
    window.scrollTo({
      top: contactSection.offsetTop - 100, // Ajusta este valor para el desplazamiento deseado
      behavior: 'smooth', // Para habilitar la animación de desplazamiento
    });
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.menuContent}>
        <div className={style.navBarLinks}>
          <Link href="/" onClick={() => handleLinkClick(about)}>
            {about}
            <div className={selectedLink === about ? style.active : ''}></div>
          </Link>
          <Link href="#proyects" onClick={() => handleLinkClick(proyects)}>
            {proyects}
            <div className={selectedLink === proyects ? style.active : ''}></div>
          </Link>
          <Link href="#meeting" onClick={handleSectionClick('meeting', meeting)}>
            {meeting}
            <div className={selectedLink === meeting ? style.active : ''}></div>
          </Link>
          <Link href="#contact" onClick={handleSectionClick('contact', contact)}>
            {contact}
            <div className={selectedLink === contact ? style.active : ''}></div>
          </Link>
          <DownloadResume downloadResume={props.downloadResume} width="10rem" />
        </div>
        <div className={style.navBarSwetchers}>
          <IntlSwitcher locale={props.locale} />
          <ThemeSwitcher />
        </div>
      </div>
      <GoKebabHorizontal onClick={toggleMenu} className={style.menuIcon} />
      <div onClick={toggleMenu} style={menu === true ? { transform: 'translateX(0%)' } : null} className={style.filterBlur}></div>
      <div style={menu === true ? { transform: 'translateX(0%' } : null} className={style.menuContentToggle}>
        <div className={style.close}>
          <IoClose onClick={toggleMenu} />
        </div>
        <div className={style.navBarSwetchersToggle}>
          <IntlSwitcher locale={props.locale} />
          <ThemeSwitcher />
        </div>
        <div className={style.navBarLinksToggle}>
          <Link href="#" onClick={toggleMenu}>
            {about}
          </Link>
          <Link href="#proyects" onClick={toggleMenu}>
            {proyects}
          </Link>
          <Link href="#meeting" onClick={handleClick}>
            {meeting}
          </Link>
          <Link href="#contact" onClick={handleClickContact}>
            {contact}
          </Link>
        </div>
        <DownloadResume downloadResume={props.downloadResume} width="43rem" />
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
  );
};

export default Menu;
