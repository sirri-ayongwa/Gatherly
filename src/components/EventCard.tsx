
import React from 'react';
import { IEvent } from '@/lib/data';
import { Calendar, Users, Video } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import EventActions from './EventActions';

interface EventCardProps {
  event: IEvent;
  onRegister: (eventId: string) => void;
  isRegistered?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister, isRegistered = false }) => {
  const formattedDate = format(new Date(event.date), 'MMM d, yyyy');
  
  const getMeetingPlatform = (link: string) => {
    if (link.includes('zoom.us')) return 'Zoom';
    if (link.includes('meet.google.com')) return 'Google Meet';
    return 'Virtual Meeting';
  };
  
  return (
    <Card className="glass-card h-full flex flex-col transition-transform hover:scale-[1.01] overflow-hidden">
      <div className="relative h-48">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover" 
        />
        <Badge 
          className={`absolute top-2 right-2 
            ${event.type === 'hackathon' ? 'bg-gatherly-neon text-white' : 
              event.type === 'workshop' ? 'bg-gatherly-orange text-white' : 
              'bg-gatherly-gray text-white'}`}
        >
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold line-clamp-2">{event.title}</h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 mb-2 text-sm">
          <Calendar className="h-4 w-4 text-gatherly-neon" />
          <span>{formattedDate} • {event.time}</span>
        </div>
        <div className="flex items-center gap-2 mb-2 text-sm">
          <Users className="h-4 w-4 text-gatherly-neon" />
          <span>{event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''} attendees</span>
        </div>
        <div className="flex items-center gap-2 mb-3 text-sm">
          <Video className="h-4 w-4 text-gatherly-neon" />
          <span>{getMeetingPlatform(event.location)}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-3">
          {event.description}
        </p>
        {isRegistered && (
          <div className="mt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-gatherly-neon border-gatherly-neon hover:bg-gatherly-neon/10"
              onClick={() => window.open(event.location, '_blank')}
            >
              Join Meeting
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <EventActions 
          eventId={event.id} 
          isRegistered={isRegistered}
          onRegister={onRegister}
        />
      </CardFooter>
    </Card>
  );
};

export default EventCard;
