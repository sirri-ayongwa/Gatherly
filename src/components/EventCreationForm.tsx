
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { EventType, IEvent } from '@/lib/data';
import { toast } from '@/components/ui/sonner';
import { v4 as uuidv4 } from 'uuid';

interface EventCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  eventToEdit?: IEvent | null;
}

const validateMeetingLink = (link: string): boolean => {
  if (!link) return false; // Empty links are not valid for virtual events
  
  // Validation for Zoom and Google Meet links
  const zoomPattern = /^https?:\/\/(?:[a-z0-9-]+\.)?zoom\.us\//i;
  const meetPattern = /^https?:\/\/meet\.google\.com\//i;
  
  return zoomPattern.test(link) || meetPattern.test(link);
};

const EventCreationForm: React.FC<EventCreationFormProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  eventToEdit
}) => {
  const isEditMode = !!eventToEdit;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [eventType, setEventType] = useState<EventType>(eventToEdit?.type || 'meetup');
  const [meetingPlatform, setMeetingPlatform] = useState(
    eventToEdit?.location?.toLowerCase().includes('zoom') ? 'zoom' : 'meet'
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(eventToEdit?.image || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    title: eventToEdit?.title || '',
    date: eventToEdit?.date || '',
    time: eventToEdit?.time?.split(' ')[0] || '',
    timeAmPm: eventToEdit?.time?.includes('PM') ? 'PM' : 'AM',
    meetingLink: eventToEdit?.location || '',
    description: eventToEdit?.description || '',
    maxAttendees: eventToEdit?.maxAttendees?.toString() || '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [id.replace('event-', '')]: value
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };
  
  const validateForm = (): boolean => {
    // Check required fields
    if (!formValues.title.trim()) {
      toast.error('Event title is required');
      return false;
    }
    
    if (!formValues.date) {
      toast.error('Event date is required');
      return false;
    }
    
    if (!formValues.time) {
      toast.error('Event time is required');
      return false;
    }
    
    if (!formValues.meetingLink.trim()) {
      toast.error('Meeting link is required');
      return false;
    }
    
    if (!validateMeetingLink(formValues.meetingLink)) {
      toast.error('Please provide a valid Zoom or Google Meet link');
      return false;
    }
    
    if (!formValues.description.trim()) {
      toast.error('Event description is required');
      return false;
    }
    
    if (!isEditMode && !imagePreview) {
      toast.error('Event image is required');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Format time with AM/PM
    const formattedTime = `${formValues.time} ${formValues.timeAmPm}`;
    
    // In a real app, you'd upload the image to a server and get a URL back
    // For now, we'll use the preview URL for demonstration purposes
    
    // Mock successful submission
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
      onClose();
      
      toast.success(
        isEditMode ? 'Event updated successfully!' : 'Event created successfully!',
        {
          description: isEditMode 
            ? 'Your event has been updated.'
            : 'Your event has been created and is now visible to attendees.',
        }
      );
    }, 1500);
  };
  
  const renderMeetingPlatformHelperText = () => {
    if (meetingPlatform === 'zoom') {
      return "Example: https://zoom.us/j/123456789";
    } else {
      return "Example: https://meet.google.com/abc-defg-hij";
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] glass-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isEditMode ? 'Edit Event' : 'Create a New Event'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="event-title">Event Title</Label>
            <Input 
              id="event-title" 
              placeholder="e.g., React Advanced Workshop" 
              value={formValues.title}
              onChange={handleInputChange}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Event Type</Label>
            <RadioGroup 
              value={eventType} 
              onValueChange={(v) => setEventType(v as EventType)}
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="meetup" id="meetup" />
                  <Label htmlFor="meetup">Meetup</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hackathon" id="hackathon" />
                  <Label htmlFor="hackathon">Hackathon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="workshop" id="workshop" />
                  <Label htmlFor="workshop">Workshop</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event-date">Date</Label>
              <Input 
                id="event-date" 
                type="date" 
                value={formValues.date}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-time">Time</Label>
              <div className="flex gap-2">
                <Input 
                  id="event-time" 
                  type="time" 
                  value={formValues.time}
                  onChange={handleInputChange}
                  className="flex-1"
                  required 
                />
                <div className="flex">
                  <Button
                    type="button"
                    variant={formValues.timeAmPm === 'AM' ? 'default' : 'outline'}
                    className={`rounded-r-none ${formValues.timeAmPm === 'AM' ? 'bg-gatherly-neon hover:bg-gatherly-neon/90' : ''}`}
                    onClick={() => setFormValues(prev => ({ ...prev, timeAmPm: 'AM' }))}
                  >
                    AM
                  </Button>
                  <Button
                    type="button"
                    variant={formValues.timeAmPm === 'PM' ? 'default' : 'outline'}
                    className={`rounded-l-none ${formValues.timeAmPm === 'PM' ? 'bg-gatherly-neon hover:bg-gatherly-neon/90' : ''}`}
                    onClick={() => setFormValues(prev => ({ ...prev, timeAmPm: 'PM' }))}
                  >
                    PM
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Meeting Platform</Label>
            <RadioGroup 
              value={meetingPlatform} 
              onValueChange={setMeetingPlatform}
              className="flex flex-row gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="zoom" id="zoom" />
                <Label htmlFor="zoom">Zoom</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="meet" id="meet" />
                <Label htmlFor="meet">Google Meet</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="event-meetingLink">Meeting Link</Label>
            <Input 
              id="event-meetingLink" 
              placeholder={renderMeetingPlatformHelperText()}
              value={formValues.meetingLink}
              onChange={handleInputChange}
              required 
            />
            <p className="text-xs text-muted-foreground">
              Please provide a valid {meetingPlatform === 'zoom' ? 'Zoom' : 'Google Meet'} link
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="event-description">Description</Label>
            <Textarea 
              id="event-description" 
              placeholder="Describe your event in detail..." 
              value={formValues.description}
              onChange={handleInputChange}
              required 
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="event-image">Cover Image</Label>
            <div className="flex flex-col items-center gap-4">
              {imagePreview && (
                <div className="w-full h-40 overflow-hidden rounded-md">
                  <img 
                    src={imagePreview} 
                    alt="Event cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="w-full">
                <Input 
                  ref={fileInputRef}
                  id="event-image" 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? 'Change Image' : 'Upload Image'}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="event-maxAttendees">Maximum Attendees (Optional)</Label>
            <Input 
              id="event-maxAttendees" 
              type="number" 
              placeholder="e.g., 100" 
              min="1"
              value={formValues.maxAttendees}
              onChange={handleInputChange}
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gatherly-neon hover:bg-gatherly-neon/90"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? `${isEditMode ? 'Updating' : 'Creating'} Event...` 
                : `${isEditMode ? 'Update' : 'Create'} Event`
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventCreationForm;
