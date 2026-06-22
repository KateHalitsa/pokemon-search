import {createNavigation} from 'next-intl/navigation';

export const locales = ['en', 'ru'];

export const {
  Link,
  redirect,
  usePathname,
  useRouter
} = createNavigation({
  locales
});