
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IEvent } from '@/lib/data';
import EventActions from './EventActions';
import { Calendar, Users, MapPin, ExternalLink, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { format } from 'date-fns';

interface UserDashboardProps {
  registeredEvents: IEvent[];
  upcomingEvents: IEvent[];
  onRegister: (eventId: string) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ 
  registeredEvents, 
  upcomingEvents,
  onRegister
}) => {
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [attendeesDialogOpen, setAttendeesDialogOpen] = useState(false);

  const handleViewDetails = (event: IEvent) => {
    setSelectedEvent(event);
    setEventDetailsOpen(true);
  };

  const handleViewAttendees = (event: IEvent) => {
    setSelectedEvent(event);
    setAttendeesDialogOpen(true);
  };

  // Mock attendee data
  const mockAttendees = [
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Sarah Johnson' },
    { id: '3', name: 'Michael Brown' },
    { id: '4', name: 'Emily Davis' },
    { id: '5', name: 'David Wilson' }
  ];

  return (
    <div className="space-y-8">
      <Tabs defaultValue="registered" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="registered">Registered Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="registered" className="mt-6">
          {registeredEvents.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">You haven't registered for any events yet.</p>
              <Button 
                onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline" 
                className="mt-4"
              >
                Browse Events
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registeredEvents.map(event => (
                <Card key={event.id} className="h-full flex flex-col">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-grow space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gatherly-neon" />
                      <span>{format(new Date(event.date), 'MMM d, yyyy')} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gatherly-neon" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gatherly-neon" />
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm" 
                        onClick={() => handleViewAttendees(event)}
                      >
                        {event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''} attendees
                      </Button>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewDetails(event)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View Details
                    </Button>
                    <EventActions 
                      eventId={event.id} 
                      isRegistered={true}
                      onRegister={onRegister}
                    />
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map(event => {
              const isRegistered = registeredEvents.some(e => e.id === event.id);
              return (
                <Card key={event.id} className="h-full flex flex-col">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-grow space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gatherly-neon" />
                      <span>{format(new Date(event.date), 'MMM d, yyyy')} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gatherly-neon" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gatherly-neon" />
                      <span>{event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''} attendees</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDetails(event)}
                    >
                      View Details
                    </Button>
                    <EventActions 
                      eventId={event.id} 
                      isRegistered={isRegistered}
                      onRegister={onRegister}
                    />
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Event Details Dialog */}
      <Dialog open={eventDetailsOpen} onOpenChange={setEventDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div>
              <img 
                src={selectedEvent?.image} 
                alt={selectedEvent?.title} 
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gatherly-neon" />
                  <span>{selectedEvent ? format(new Date(selectedEvent.date), 'MMMM d, yyyy') : ''}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gatherly-neon" />
                  <span>{selectedEvent?.time}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gatherly-neon" />
                  <span>{selectedEvent?.location}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gatherly-neon" />
                  <Button 
                    variant="link" 
                    className="p-0 h-auto" 
                    onClick={() => {
                      setEventDetailsOpen(false);
                      setAttendeesDialogOpen(true);
                    }}
                  >
                    {selectedEvent?.attendees}{selectedEvent?.maxAttendees ? `/${selectedEvent.maxAttendees}` : ''} attendees
                  </Button>
                </div>
                
                {selectedEvent?.isVirtual && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-gatherly-neon" />
                    <a 
                      href="https://zoom.us/j/123456789" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gatherly-neon hover:underline"
                    >
                      Join Zoom Meeting
                    </a>
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-semibold mb-1">Organizer</h4>
                <p>{selectedEvent?.organizer.name}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Description</h4>
            <p className="text-muted-foreground">{selectedEvent?.description}</p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEventDetailsOpen(false)}>Close</Button>
            <EventActions 
              eventId={selectedEvent?.id || ''} 
              isRegistered={registeredEvents.some(e => e.id === selectedEvent?.id)}
              onRegister={onRegister}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Attendees Dialog */}
      <Dialog open={attendeesDialogOpen} onOpenChange={setAttendeesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Event Attendees</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <ul className="space-y-2">
              {mockAttendees.map(attendee => (
                <li key={attendee.id} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <div className="w-8 h-8 rounded-full bg-gatherly-neon/20 flex items-center justify-center text-gatherly-neon">
                    {attendee.name.charAt(0)}
                  </div>
                  <span>{attendee.name}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAttendeesDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
