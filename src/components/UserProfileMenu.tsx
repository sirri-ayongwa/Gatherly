
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog';
import UserDashboard from './UserDashboard';
import OrganizerDashboard from './OrganizerDashboard';
import { IEvent, UserRole } from '@/lib/data';

interface UserProfileMenuProps {
  userName: string;
  userRole: UserRole;
  registeredEvents: IEvent[];
  myEvents?: IEvent[];
  upcomingEvents: IEvent[];
  onLogout: () => void;
  onRegister: (eventId: string) => void;
  onDeleteEvent?: (eventId: string) => void;
  onEditEvent?: (event: IEvent) => void;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  userName,
  userRole,
  registeredEvents,
  myEvents = [],
  upcomingEvents,
  onLogout,
  onRegister,
  onDeleteEvent = () => {},
  onEditEvent = () => {}
}) => {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline" className="rounded-full">
            <User className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDashboardOpen(true)}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Dialog open={dashboardOpen} onOpenChange={setDashboardOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {userRole === 'organizer' ? 'Organizer Dashboard' : 'Your Dashboard'}
            </DialogTitle>
          </DialogHeader>
          
          {userRole === 'organizer' ? (
            <OrganizerDashboard 
              myEvents={myEvents}
              onDeleteEvent={onDeleteEvent}
              onEditEvent={onEditEvent}
            />
          ) : (
            <UserDashboard 
              registeredEvents={registeredEvents}
              upcomingEvents={upcomingEvents.filter(e => !registeredEvents.some(re => re.id === e.id))}
              onRegister={onRegister}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserProfileMenu;
