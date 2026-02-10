import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';
import { TrendingUp, ShoppingBag, Package, DollarSign, Activity } from 'lucide-react';
import axios from '../../api/axios';

const StatCard = ({ title, value, icon: Icon, className, loading }) => (
  <Card className='overflow-hidden border-l-4 hover:shadow-md transition-all' style={{ borderLeftColor: className }}>
    <CardContent className='p-6 flex items-center justify-between'>
      <div className='space-y-1'>
        <p className='text-sm font-medium text-muted-foreground'>{title}</p>
        {loading ? <Skeleton className='h-8 w-24' /> : <h2 className='text-3xl font-bold tracking-tight'>{value}</h2>}
      </div>
      <div className={`h-12 w-12 rounded-full flex items-center justify-center opacity-20`} style={{ backgroundColor: className, color: className }}>
        <Icon className='h-6 w-6' style={{ color: className, opacity: 1 }} />
      </div>
    </CardContent>
  </Card>
);

export default function DashboardStats({ user }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoint = user.role === 'farmer' ? '/dashboard/farmer-stats' : '/dashboard/buyer-stats';
        const response = await axios.get(endpoint);
        if (response.data.success) {
          setStats(response.data.stats);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user.role]);

  if (loading && !stats) {
    return (
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-32 rounded-xl' />
        ))}
      </div>
    );
  }

  const farmerStats = [
    { title: 'Total Revenue', value: `₦${stats?.totalRevenue?.toLocaleString() || 0}`, icon: DollarSign, color: '#10b981' },
    { title: 'Total Sales', value: stats?.totalSales || 0, icon: TrendingUp, color: '#3b82f6' },
    { title: 'Active Orders', value: stats?.activeOrders || 0, icon: ShoppingBag, color: '#f59e0b' },
    { title: 'Total Products', value: stats?.totalProducts || 0, icon: Package, color: '#8b5cf6' },
  ];

  const buyerStats = [
    { title: 'Total Spent', value: `₦${stats?.totalSpent?.toLocaleString() || 0}`, icon: DollarSign, color: '#10b981' },
    { title: 'Total Orders', value: stats?.totalOrders || 0, icon: ShoppingBag, color: '#3b82f6' },
    { title: 'Pending Orders', value: stats?.pendingOrders || 0, icon: Activity, color: '#f59e0b' },
  ];

  const statsToRender = user.role === 'farmer' ? farmerStats : buyerStats;

  return (
    <div className={`grid gap-4 mb-8 ${user.role === 'farmer' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
      {statsToRender.map((stat, idx) => (
        <StatCard key={idx} {...stat} loading={loading} className={stat.color} />
      ))}
    </div>
  );
}
