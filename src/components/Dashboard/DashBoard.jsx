import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import TopBar from './TopBar';
import SideBar from './SideBar';
import AccountDetails from './AccountDetails';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import DashboardStats from './DashboardStats';
import { motion } from 'framer-motion';

export default function Dashboard({ user }) {
  const [newProfileImage, setNewProfileImage] = useState(user?.profileImage?.secure_url);

  if (!user.isEmailVerified && !user.isPhoneVerified) return <Navigate to='/verify' replace />;

  const handleGetNewProfileImage = (image) => {
    setNewProfileImage(image);
  };

  return (
    <div className='min-h-screen bg-background flex'>
      <SideBar />

      {/* Main Content */}
      <main className='flex-1 md:ml-64 transition-all duration-300'>
        <TopBar user={user} newProfileImage={newProfileImage} />

        <div className='p-4 md:p-8 max-w-7xl mx-auto space-y-8'>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <DashboardStats user={user} />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            <div className='xl:col-span-1 h-full'>
              <AccountDetails user={user} />
            </div>
            <div className='xl:col-span-1 h-full'>
              <QuickActions user={user} sendNewProfileImage={handleGetNewProfileImage} />
            </div>
            <div className='xl:col-span-1 h-full'>
              <RecentActivity user={user} />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
