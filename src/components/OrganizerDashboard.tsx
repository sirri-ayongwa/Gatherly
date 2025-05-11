import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IEvent } from '@/lib/data';
import { Calendar, Users, MapPin, Edit, Trash2, Share2, Eye, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { toast } from '@/components/ui/sonner';
import EventCreationForm from './EventCreationForm';
import EventActions from './EventActions';

interface OrganizerDashboardProps {
  myEvents: IEvent[];
  onDeleteEvent: (eventId: string) => void;
  onEditEvent: (event: IEvent) => void;
}

const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ 
  myEvents, 
  onDeleteEvent,
  onEditEvent
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<IEvent | null>(null);
  const [attendeesDialogOpen, setAttendeesDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  
  const handleDeleteClick = (eventId: string) => {
    setEventToDelete(eventId);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (eventToDelete) {
      onDeleteEvent(eventToDelete);
      toast.success('Event deleted successfully');
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };
  
  const handleEditClick = (event: IEvent) => {
    setCurrentEvent(event);
    setEditDialogOpen(true);
  };

  const handleEditSuccess = () => {
    toast.success('Event updated successfully');
    if (currentEvent) {
      onEditEvent(currentEvent);
    }
  };
  
  const handleViewAttendees = (event: IEvent) => {
    setSelectedEvent(event);
    setAttendeesDialogOpen(true);
  };

  const handleViewDetails = (event: IEvent) => {
    setSelectedEvent(event);
    setDetailsDialogOpen(true);
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
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">My Events</h3>
        <Button 
          onClick={() => {
            setCurrentEvent(null);
            setEditDialogOpen(true);
          }}
          className="bg-gatherly-neon hover:bg-gatherly-neon/90"
        >
          Create New Event
        </Button>
      </div>
      
      {myEvents.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">You haven't created any events yet.</p>
          <Button 
            onClick={() => {
              setCurrentEvent(null);
              setEditDialogOpen(true);
            }}
            className="mt-4 bg-gatherly-neon hover:bg-gatherly-neon/90"
          >
            Create Your First Event
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myEvents.map(event => (
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
              
              <CardFooter className="flex flex-col gap-3">
                <div className="flex w-full gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewDetails(event)}
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditClick(event)}
                  >
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                </div>
                <div className="flex w-full gap-2">
                  <EventActions 
                    eventId={event.id} 
                    isRegistered={true}  // Organizers are already "registered" for their events
                    onRegister={() => {}}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteClick(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Event Dialog */}
      <EventCreationForm 
        isOpen={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)} 
        onSuccess={handleEditSuccess}
        eventToEdit={currentEvent}
      />
      
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
      
      {/* Event Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
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
                      setDetailsDialogOpen(false);
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
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Description</h4>
            <p className="text-muted-foreground">{selectedEvent?.description}</p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>Close</Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (selectedEvent) {
                    handleEditClick(selectedEvent);
                    setDetailsDialogOpen(false);
                  }
                }}
              >
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  if (selectedEvent) {
                    handleDeleteClick(selectedEvent.id);
                    setDetailsDialogOpen(false);
                  }
                }}
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizerDashboard;
