import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const TopBar = ({ user, newProfileImage }) => {
  return (
    <header className='bg-card border-b border-border/50 sticky top-0 z-30 px-6 py-3 flex items-center justify-between shadow-sm'>
      <h2 className='text-xl font-semibold capitalize text-foreground'>Welcome Back, {user?.name || 'User'}!</h2>

      <div className='flex items-center gap-4'>
        <Avatar className='h-10 w-10 border border-border'>
          <AvatarImage src={newProfileImage} alt={user?.name} />
          <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default TopBar;
