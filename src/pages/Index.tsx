
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import EventsList from '@/components/EventsList';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { toast } from '@/components/ui/sonner';
import AuthModal from '@/components/AuthModal';
import { ThemeProvider } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import Web3MeetUp from '@/images/web3-meetup.jpg';
import { IEvent, featuredEvents as defaultFeaturedEvents, upcomingEvents as defaultUpcomingEvents } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [registeringForEventId, setRegisteringForEventId] = useState<string | null>(null);
  const [featuredEvents, setFeaturedEvents] = useState<IEvent[]>(defaultFeaturedEvents);
  const [upcomingEvents, setUpcomingEvents] = useState<IEvent[]>(defaultUpcomingEvents);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  
  const { user, userRole, signOut, isLoading } = useAuth();
  const { toast: uiToast } = useToast();
  
  // Events registered by the user
  const registeredEvents = upcomingEvents.filter(event => registeredEventIds.includes(event.id));
  
  // Events created by the organizer
  const myEvents = userRole === 'organizer' 
    ? upcomingEvents.filter(event => event.organizer.id === '101') // Mock ID for demo
    : [];
  
  const handleEventRegister = (eventId: string) => {
    if (!user) {
      setRegisteringForEventId(eventId);
      setAuthModalOpen(true);
      return;
    }
    
    const isAlreadyRegistered = registeredEventIds.includes(eventId);
    if (isAlreadyRegistered) {
      toast.info("You've already registered for this event");
      return;
    }
    
    const event = [...featuredEvents, ...upcomingEvents].find(e => e.id === eventId);
    if (event) {
      // Update registration count
      const updatedEvents = upcomingEvents.map(e => {
        if (e.id === eventId) {
          return { ...e, attendees: e.attendees + 1 };
        }
        return e;
      });
      
      setUpcomingEvents(updatedEvents);
      setRegisteredEventIds(prev => [...prev, eventId]);
      
      uiToast({
        title: 'Registration successful!',
        description: `You've registered for "${event.title}"`,
      });
    }
  };
  
  const handleCreateEvent = (newEvent: IEvent) => {
    // Add the new event to the events list
    setUpcomingEvents(prev => [newEvent, ...prev]);
    
    // If it's a featured event, add it to featured events as well
    if (Math.random() > 0.5) {
      setFeaturedEvents(prev => [newEvent, ...prev.slice(0, 5)]);
    }
  };
  
  const handleEditEvent = (updatedEvent: IEvent) => {
    // Update the event in both upcoming and featured events lists
    setUpcomingEvents(prev => 
      prev.map(e => e.id === updatedEvent.id ? updatedEvent : e)
    );
    
    setFeaturedEvents(prev => 
      prev.map(e => e.id === updatedEvent.id ? updatedEvent : e)
    );
  };
  
  const handleDeleteEvent = (eventId: string) => {
    // Remove the event from both upcoming and featured events lists
    setUpcomingEvents(prev => prev.filter(e => e.id !== eventId));
    setFeaturedEvents(prev => prev.filter(e => e.id !== eventId));
  };
  
  const handleLoginSuccess = () => {
    if (registeringForEventId) {
      const event = [...featuredEvents, ...upcomingEvents].find(e => e.id === registeringForEventId);
      if (event) {
        // Update registration count
        const updatedEvents = upcomingEvents.map(e => {
          if (e.id === registeringForEventId) {
            return { ...e, attendees: e.attendees + 1 };
          }
          return e;
        });
        
        setUpcomingEvents(updatedEvents);
        setRegisteredEventIds(prev => [...prev, registeringForEventId]);
        
        uiToast({
          title: 'Registration successful!',
          description: `You've registered for "${event.title}"`,
        });
      }
      setRegisteringForEventId(null);
    }
  };
  
  const handleCreateEventSuccess = () => {
    // Create a new event with mock data
    const newEvent: IEvent = {
      id: uuidv4(),
      title: 'New Tech Meetup',
      type: 'meetup',
      date: '2025-06-30',
      time: '6:00 PM - 8:00 PM',
      location: userRole === 'organizer' ? 'Tech Hub, San Francisco' : 'Virtual',
      isVirtual: userRole !== 'organizer',
      description: 'Join us for an exciting evening of networking and tech discussions.',
      image: Web3MeetUp,
      organizer: {
        name: 'Tech Enthusiasts',
        id: '101', // Mock ID for demo
      },
      attendees: 0,
      maxAttendees: 50,
    };
    
    handleCreateEvent(newEvent);
  };
  
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar
          isLoggedIn={!!user}
          userRole={userRole}
          onLogout={signOut}
          registeredEvents={registeredEvents}
          myEvents={myEvents}
          upcomingEvents={upcomingEvents}
          onRegister={handleEventRegister}
          onDeleteEvent={handleDeleteEvent}
          onEditEvent={handleEditEvent}
          onCreateEvent={handleCreateEventSuccess}
        />
        
        <main className="flex-grow">
          {/* Hero section */}
          <section className="py-20 px-4 bg-gradient-to-b from-gatherly-purple to-background">
            <div className="container mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gatherly-neon to-gatherly-orange bg-clip-text text-transparent">
                Connect. Learn. Create.
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-foreground/80">
                Join virtual tech meetups, hackathons, and workshops from anywhere in the world.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {user ? (
                  <Button 
                    size="lg" 
                    className="bg-gatherly-neon hover:bg-gatherly-neon/90 animate-pulse-neon"
                    onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Browse Events
                  </Button>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      className="bg-gatherly-neon hover:bg-gatherly-neon/90 animate-pulse-neon"
                      onClick={() => setAuthModalOpen(true)}
                    >
                      Get Started
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Explore Events
                    </Button>
                  </>
                )}
              </div>
              <div className="mt-16 max-w-4xl mx-auto glass-card p-6 border-gatherly-neon/20 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4">
                    <div className="text-3xl font-bold mb-2 text-gatherly-neon">50+</div>
                    <p className="text-muted-foreground">Events Every Month</p>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold mb-2 text-gatherly-neon">10K+</div>
                    <p className="text-muted-foreground">Active Attendees</p>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold mb-2 text-gatherly-neon">100+</div>
                    <p className="text-muted-foreground">Tech Communities</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Featured events section */}
          <section id="featured" className="py-16">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Featured Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredEvents.slice(0, 3).map(event => (
                  <div key={event.id} className="glass-card overflow-hidden rounded-xl transition-transform hover:scale-[1.01]">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-gatherly-neon/20 text-gatherly-neon">
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                      <div className="flex justify-between items-center text-sm mb-4">
                        <span>{event.date.split('-').slice(1).join('/')} • {event.time.split(' ')[0]}</span>
                        <span>{event.isVirtual ? 'Virtual' : 'In Person'}</span>
                      </div>
                      <Button 
                        onClick={() => handleEventRegister(event.id)}
                        className={registeredEventIds.includes(event.id) ? 
                          "w-full bg-gatherly-orange hover:bg-gatherly-orange/90" : 
                          "w-full bg-gatherly-neon hover:bg-gatherly-neon/90"}
                      >
                        {registeredEventIds.includes(event.id) ? "Registered" : "Register Now"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Button 
                  variant="outline"
                  onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View All Events
                </Button>
              </div>
            </div>
          </section>
          
          {/* About section */}
          <section id="about" className="py-16 bg-gradient-to-b from-background to-gatherly-purple/10">
            <div className="container mx-auto">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Why Choose Gatherly</h2>
                <p className="text-lg text-muted-foreground mb-12">
                  Connecting tech enthusiasts through seamless virtual and in-person events.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-gatherly-neon/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gatherly-neon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community Focused</h3>
                  <p className="text-muted-foreground">
                    Join a vibrant community of tech enthusiasts, developers, and innovators.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-gatherly-neon/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gatherly-neon"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Skill Development</h3>
                  <p className="text-muted-foreground">
                    Enhance your skills with workshops, hackathons, and collaborative projects.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-gatherly-neon/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gatherly-neon"><path d="M5.5 20H8M12 20H8M12 20H14.5M12 20V16M8 20V16M16 4L8 4M16 4L12 12M16 4H18.5M8 4H5.5M8 4L12 12"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Networking</h3>
                  <p className="text-muted-foreground">
                    Connect with industry professionals and expand your professional network.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* All events section */}
          <section id="events" className="py-16">
            <EventsList 
              events={upcomingEvents} 
              title="Upcoming Events" 
              onRegister={handleEventRegister}
              registeredEventIds={registeredEventIds}
            />
          </section>
          
          {/* CTA section */}
          <section className="py-20 bg-gatherly-purple">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Ready to join the tech community?</h2>
              <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
                Whether you're looking to attend events or host your own, Gatherly makes it easy to connect with tech enthusiasts.
              </p>
              <Button 
                size="lg" 
                onClick={() => user ? (userRole === 'organizer' ? document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }) : console.log('Create event')) : setAuthModalOpen(true)}
                className="bg-gatherly-neon hover:bg-gatherly-neon/90 text-white animate-pulse-neon"
              >
                {user 
                  ? (userRole === 'organizer' ? 'Create Your Event' : 'Browse Events') 
                  : 'Sign Up Now'}
              </Button>
            </div>
          </section>
        </main>
        
        <Footer />
        <Toaster />
        
        <AuthModal 
          isOpen={authModalOpen}
          onClose={() => {
            setAuthModalOpen(false);
            setRegisteringForEventId(null);
          }}
          onSuccess={handleLoginSuccess}
        />
      </div>
    </ThemeProvider>
  );
};

export default Index;
