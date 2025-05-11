
import React, { useState } from 'react';
import { IEvent, EventType } from '@/lib/data';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Calendar, Users, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { format } from 'date-fns';
import EventActions from './EventActions';

interface EventsListProps {
  events: IEvent[];
  title: string;
  onRegister: (eventId: string) => void;
  registeredEventIds?: string[];
}

const EventsList: React.FC<EventsListProps> = ({ 
  events, 
  title, 
  onRegister,
  registeredEventIds = []
}) => {
  const [filter, setFilter] = useState<EventType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 3;

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.type === filter);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const paginatedEvents = filteredEvents.slice(
    currentPage * eventsPerPage,
    (currentPage + 1) * eventsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <ToggleGroup type="single" value={filter} onValueChange={(value) => value && setFilter(value as EventType | 'all')}>
            <ToggleGroupItem value="all" aria-label="Filter by all events" className="data-[state=on]:bg-gatherly-neon data-[state=on]:text-white">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="meetup" aria-label="Filter by meetups" className="data-[state=on]:bg-gatherly-neon data-[state=on]:text-white">
              Meetups
            </ToggleGroupItem>
            <ToggleGroupItem value="hackathon" aria-label="Filter by hackathons" className="data-[state=on]:bg-gatherly-neon data-[state=on]:text-white">
              Hackathons
            </ToggleGroupItem>
            <ToggleGroupItem value="workshop" aria-label="Filter by workshops" className="data-[state=on]:bg-gatherly-neon data-[state=on]:text-white">
              Workshops
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        {paginatedEvents.length === 0 ? (
          <div className="text-center py-10">
            <p>No events found for the selected filter.</p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {paginatedEvents.map(event => {
                const isRegistered = registeredEventIds.includes(event.id);
                return (
                  <div key={event.id} className="group relative overflow-hidden border-l-4 border-gatherly-neon bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      <div className="md:w-48 h-48 relative overflow-hidden rounded-lg">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" 
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            event.type === 'hackathon' ? 'bg-gatherly-neon text-white' : 
                            event.type === 'workshop' ? 'bg-gatherly-orange text-white' : 
                            'bg-gatherly-gray text-white'
                          }`}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <h3 className="text-xl font-bold group-hover:text-gatherly-neon transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gatherly-neon" />
                            <span>{format(new Date(event.date), 'MMM d, yyyy')} • {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gatherly-neon" />
                            <span>{event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''} attendees</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">Location:</span>
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <EventActions 
                          eventId={event.id} 
                          isRegistered={isRegistered}
                          onRegister={onRegister}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default EventsList;
