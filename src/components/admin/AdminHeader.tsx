import { useState } from 'react';
import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const AdminHeader = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New car listing submitted', time: '5 min ago', unread: true },
    { id: 2, title: 'Service request from John Doe', time: '15 min ago', unread: true },
    { id: 3, title: 'Brand partnership updated', time: '1 hour ago', unread: false },
    { id: 4, title: 'Monthly report generated', time: '2 hours ago', unread: false },
    { id: 5, title: 'New customer registration', time: '3 hours ago', unread: true }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search..." 
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications Popup */}
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <p className="text-sm text-slate-600">You have {unreadCount} unread notifications</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${
                      notification.unread ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm ${notification.unread ? 'font-medium' : ''}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t">
                <Button variant="ghost" className="w-full text-sm">
                  Mark all as read
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Profile Popup */}
          <Popover open={userMenuOpen} onOpenChange={setUserMenuOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-slate-600" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-medium">Admin User</span>
                  <div className="text-xs text-slate-500">Administrator</div>
                </div>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="end">
              <div className="space-y-1">
                <div className="px-3 py-2 border-b">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-slate-500">admin@autocare.com</p>
                </div>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notification Settings
                </Button>
                <hr className="my-1" />
                <Button variant="ghost" className="w-full justify-start text-sm text-red-600 hover:text-red-700">
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;