// components/navigation/Navbar.js
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link href="/about" className={pathname === '/about' ? 'active' : ''}>About</Link>
        </li>
        <li>
          <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;