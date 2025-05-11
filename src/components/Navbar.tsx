
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { Menu, LogIn, LogOut, User, Calendar } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserRole, IEvent } from '@/lib/data';
import AuthModal from './AuthModal';
import EventCreationForm from './EventCreationForm';
import { useAuth } from '@/context/AuthContext';
import UserProfileMenu from './UserProfileMenu';

interface NavbarProps {
  isLoggedIn: boolean;
  userRole: UserRole | null;
  onLogout: () => void;
  registeredEvents?: IEvent[];
  myEvents?: IEvent[];
  upcomingEvents?: IEvent[];
  onRegister?: (eventId: string) => void;
  onDeleteEvent?: (eventId: string) => void;
  onEditEvent?: (event: IEvent) => void;
  onCreateEvent?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  userRole,
  onLogout,
  registeredEvents = [],
  myEvents = [],
  upcomingEvents = [],
  onRegister = () => {},
  onDeleteEvent = () => {},
  onEditEvent = () => {},
  onCreateEvent = () => {}
}) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const { isLoading } = useAuth();

  const handleCreateEventSuccess = () => {
    onCreateEvent();
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gatherly-neon flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="font-montserrat text-2xl font-bold bg-gradient-to-r from-gatherly-neon to-gatherly-orange bg-clip-text text-transparent">
                Gatherly
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/#events" className="font-medium hover:text-gatherly-neon transition-colors">
              Events
            </a>
            <a href="/#featured" className="font-medium hover:text-gatherly-neon transition-colors">
              Featured
            </a>
            <a href="/#about" className="font-medium hover:text-gatherly-neon transition-colors">
              About
            </a>
          </nav>

          {/* Right side menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {!isLoading && (
              isLoggedIn ? (
                <>
                  {userRole === 'organizer' && (
                    <Button 
                      onClick={() => setCreateEventOpen(true)} 
                      className="hidden md:flex bg-gatherly-orange hover:bg-gatherly-orange/90"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Create Event
                    </Button>
                  )}
                  <div className="hidden md:block">
                    <UserProfileMenu
                      userName=""
                      userRole={userRole || 'attendee'}
                      registeredEvents={registeredEvents}
                      myEvents={userRole === 'organizer' ? myEvents : []}
                      upcomingEvents={upcomingEvents}
                      onLogout={onLogout}
                      onRegister={onRegister}
                      onDeleteEvent={onDeleteEvent}
                      onEditEvent={onEditEvent}
                    />
                  </div>
                  <Button onClick={onLogout} variant="ghost" className="hidden md:flex">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setAuthModalOpen(true)} 
                  className="hidden md:flex bg-gatherly-neon hover:bg-gatherly-neon/90"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login / Sign Up
                </Button>
              )
            )}

            {/* Mobile menu trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card">
                <nav className="flex flex-col gap-4 mt-10">
                  <a href="/#events" className="flex items-center py-2 hover:text-gatherly-neon transition-colors">
                    Events
                  </a>
                  <a href="/#featured" className="flex items-center py-2 hover:text-gatherly-neon transition-colors">
                    Featured
                  </a>
                  <a href="/#about" className="flex items-center py-2 hover:text-gatherly-neon transition-colors">
                    About
                  </a>
                  
                  {!isLoading && (
                    isLoggedIn ? (
                      <>
                        {userRole === 'organizer' && (
                          <Button 
                            onClick={() => setCreateEventOpen(true)} 
                            className="bg-gatherly-orange hover:bg-gatherly-orange/90"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Create Event
                          </Button>
                        )}
                        <Button 
                          variant="outline"
                          onClick={() => document.getElementById('mobile-dashboard')?.click()}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                        <div className="hidden">
                          <UserProfileMenu
                            userName=""
                            userRole={userRole || 'attendee'}
                            registeredEvents={registeredEvents}
                            myEvents={userRole === 'organizer' ? myEvents : []}
                            upcomingEvents={upcomingEvents}
                            onLogout={onLogout}
                            onRegister={onRegister}
                            onDeleteEvent={onDeleteEvent}
                            onEditEvent={onEditEvent}
                          />
                          <button id="mobile-dashboard"></button>
                        </div>
                        <Button onClick={onLogout} variant="outline" className="mt-2">
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={() => setAuthModalOpen(true)} 
                        className="bg-gatherly-neon hover:bg-gatherly-neon/90 mt-2"
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Login / Sign Up
                      </Button>
                    )
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onSuccess={() => {}}
      />
      
      <EventCreationForm
        isOpen={createEventOpen}
        onClose={() => setCreateEventOpen(false)}
        onSuccess={handleCreateEventSuccess}
      />
    </header>
  );
};

export default Navbar;
