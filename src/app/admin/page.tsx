import DashboardCard from '@/components/DashbaordCard';
import { prisma } from '@/lib/prisma';

import { formatCurrency, formatNumber } from '@/lib/formatters';

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}

async function getSalesData() {
  const data = await prisma.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    prisma.product.count({ where: { isAvailableForPurchase: true } }),
    prisma.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return { activeCount, inactiveCount };
}

export default async function AdminDashboard() {
  const [
    { numberOfSales, amount },
    { averageValuePerUser, userCount },
    { activeCount, inactiveCount },
  ] = await Promise.all([getSalesData(), getUserData(), getProductData()]);
  return (
    <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashboardCard
        title='Sales'
        desc={`${formatNumber(numberOfSales)} orders`}
        content={`Total Sales: ${formatCurrency(amount)}`}
      />
      <DashboardCard
        title='Customers'
        desc={`${formatCurrency(averageValuePerUser)} Average Value`}
        content={`Total Sales: ${formatNumber(userCount)}`}
      />
      <DashboardCard
        title='Active Products'
        desc={`${inactiveCount} Inactive`}
        content={formatNumber(activeCount)}
      />
    </main>
  );
}
