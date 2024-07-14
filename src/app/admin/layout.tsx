import { Nav } from '@/components/Nav';
import { NavLink } from '@/components/NavLink';

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href='/admin'>Dashboard</NavLink>
        <NavLink href='/admin/products'>Products</NavLink>
        <NavLink href='/admin/users'>Users</NavLink>
        <NavLink href='/admin/orders'>Sales</NavLink>
      </Nav>
      <section className='container my-6'>{children}</section>
    </>
  );
}
