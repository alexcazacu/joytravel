export const phoneNumber = '0747096542';
export const phoneNumberFormatted = '0747 096 542';

export type NavLink = {
  href: string;
  label: string;
  emphasized?: boolean;
};

export const links: NavLink[] = [
  { href: '/despre-noi', label: 'Despre Noi' },
  // { href: '/destinatii', label: 'Destinații' },
  { href: '/consultanta', label: 'Consultanță' },
  // { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact', emphasized: true },
];
