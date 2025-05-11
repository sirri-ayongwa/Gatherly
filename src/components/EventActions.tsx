
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Facebook, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface EventActionsProps {
  eventId: string;
  isRegistered: boolean;
  onRegister: (eventId: string) => void;
}

const EventActions: React.FC<EventActionsProps> = ({ 
  eventId, 
  isRegistered, 
  onRegister 
}) => {
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
  
  const handleRegisterClick = () => {
    if (isRegistered) {
      toast.info("You've already registered for this event");
    } else {
      onRegister(eventId);
    }
  };
  
  const handleCopyLink = () => {
    const link = `${window.location.origin}/events/${eventId}`;
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };
  
  const handleSharePlatform = (platform: string) => {
    const link = encodeURIComponent(`${window.location.origin}/events/${eventId}`);
    const text = encodeURIComponent('Check out this event on Gatherly!');
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${link}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`;
        break;
      case 'mail':
        shareUrl = `mailto:?subject=${text}&body=${link}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${text} ${link}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
  };
  
  return (
    <>
      <div className="flex gap-2">
        <Button 
          onClick={handleRegisterClick} 
          className={isRegistered ? 
            "bg-gatherly-orange hover:bg-gatherly-orange/90 text-white" : 
            "bg-gatherly-neon hover:bg-gatherly-neon/90 text-white"}
          aria-label={isRegistered ? "Already registered" : "Register now"}
        >
          {isRegistered ? "Registered" : "Register Now"}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setShareDialogOpen(true)}
          aria-label="Share event"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
      
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Event</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-2 mb-6">
              <Input 
                readOnly 
                value={`${window.location.origin}/events/${eventId}`} 
                className="flex-1"
              />
              <Button variant="outline" size="icon" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleSharePlatform('facebook')}
                className="rounded-full"
              >
                <Facebook className="h-5 w-5 text-blue-600" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleSharePlatform('twitter')}
                className="rounded-full"
              >
                <Twitter className="h-5 w-5 text-sky-500" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleSharePlatform('linkedin')}
                className="rounded-full"
              >
                <Linkedin className="h-5 w-5 text-blue-700" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleSharePlatform('mail')}
                className="rounded-full"
              >
                <Mail className="h-5 w-5 text-gray-600" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleSharePlatform('instagram')}
                className="rounded-full"
              >
                <Instagram className="h-5 w-5 text-pink-600" />
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventActions;
