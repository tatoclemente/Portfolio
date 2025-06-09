'use client'
import React, { useEffect, useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import style from './Menu.module.css';
import Link from 'next/link';
import IntlSwitcher from '../IntlSwitcher/IntlSwitcher';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import ViewResume from '../../DownloadResume/viewResume';
import ModalPDF from '../../DownloadResume/modalPdf';

const Menu = ({ locale, menuItems: { about, projects, meeting, contact, allRight } }) => {
  const [menu, setMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedLink, setSelectedLink] = useState(about);
  const [openViewResume, setOpenViewResume] = useState(false);

  const toggleMenu = () => setMenu(prev => !prev);
  menu
    ? document.body.classList.add(style.modalOpen)
    : document.body.classList.remove(style.modalOpen);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    if (isMobile) toggleMenu();
  };

  const scrollToSection = (id, link) => (e) => {
    e.preventDefault();
    handleLinkClick(link);
    const section = document.getElementById(id);
    if (section) {
      const offset = (id === 'meeting' || id === 'contact') ? 100 : 0;
      window.scrollTo({ top: section.offsetTop - offset, behavior: 'smooth' });
    }
  };

  const handleOpenViewResume = (e) => {
    e && e.preventDefault();
    setOpenViewResume(true);
    if (isMobile) toggleMenu();
  };

  useEffect(() => {
    // mobile detection
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('resize', onResize);

    // scroll spy
    const sectionIds = [
      { id: 'about', label: about },
      { id: 'projects', label: projects },
      { id: 'meeting', label: meeting },
      { id: 'contact', label: contact }
    ];

    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3; // trigger one-third down
      let current = about;
      sectionIds.forEach(({ id, label }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = label;
        }
      });
      setSelectedLink(current);
    };

    window.addEventListener('scroll', onScroll);
    // initialize
    onScroll();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [about, projects, meeting, contact]);

  return (
    <div className={style.mainContainer}>
      <div className={style.menuContent}>
        <div className={style.navBarLinks}>
          <Link href="/" onClick={() => handleLinkClick(about)}>
            {about}
            <div className={`${style.underlined} ${selectedLink === about ? style.active : ''}`}></div>
          </Link>
          <Link href="#projects" onClick={scrollToSection('projects', projects)}>
            {projects}
            <div className={`${style.underlined} ${selectedLink === projects ? style.active : ''}`}></div>
          </Link>
          <Link href="#meeting" onClick={scrollToSection('meeting', meeting)}>
            {meeting}
            <div className={`${style.underlined} ${selectedLink === meeting ? style.active : ''}`}></div>
          </Link>
          <Link href="#contact" onClick={scrollToSection('contact', contact)}>
            {contact}
            <div className={`${style.underlined} ${selectedLink === contact ? style.active : ''}`}></div>
          </Link>
          <ViewResume btnLabel="CV" openViewResume={handleOpenViewResume} />
        </div>
        <div className={style.navBarSwitchers}>
          <IntlSwitcher locale={locale} />
          <ThemeSwitcher />
        </div>
      </div>
      <IoMenu onClick={toggleMenu} className={style.menuIcon} />
      <div onClick={toggleMenu} className={style.filterBlur} style={menu ? { transform: 'translateX(0%)' } : {}} />
      <div className={style.menuContentToggle} style={menu ? { transform: 'translateX(0%)' } : {}}>
        <div className={style.close}><IoClose onClick={toggleMenu} /></div>
        <div className={style.navBarSwitchersToggle}><IntlSwitcher locale={locale} /><ThemeSwitcher /></div>
        <div className={style.navBarLinksToggle}>
          <Link href="#about" onClick={scrollToSection('about', about)}>{about}</Link>
          <Link href="#projects" onClick={scrollToSection('projects', projects)}>{projects}</Link>
          <Link href="#meeting" onClick={scrollToSection('meeting', meeting)}>{meeting}</Link>
          <Link href="#contact" onClick={scrollToSection('contact', contact)}>{contact}</Link>
        </div>
        <ViewResume btnLabel="CV" openViewResume={handleOpenViewResume} />
        <div className={style.socialMedia}>
          <Link href="https://github.com/tatoclemente/" rel="noreferrer"><BsGithub /></Link>
          <Link href="https://linkedin.com/in/tatoclemente/" rel="noreferrer"><BsLinkedin /></Link>
        </div>
        <div className={style.footer}>
          <p>© 2025 Gustavo Clemente</p>
          <p>{allRight}</p>
        </div>
      </div>
      <ModalPDF closePdfModal={() => setOpenViewResume(false)} isOpenPdf={openViewResume} pdfLink="./cv/Resume_Gustavo_Clemente_Dev_Fullstack_ES.pdf" />
    </div>
  );
};

export default Menu;
