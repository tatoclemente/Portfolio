import {createLocalizedPathnamesNavigation, Pathnames} from 'next-intl/navigation';
 
export const locales = ['en', 'es'];
 
// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  '/': '/',

  // '/about': {
  //   en: '/about',
  //   de: '/ueber-uns'
  // }
}
 
export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({locales, pathnames});