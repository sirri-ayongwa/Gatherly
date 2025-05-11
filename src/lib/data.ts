import ReactImg from '@/images/react-workshop.jpg';
import AiHackathonImg from '@/images/ai-hackathon.jpg';
import Web3MeetupImg from '@/images/web3-meetup.jpg';
import DesignSystemsImg from '@/images/design-systems.jpg';
import DevOpsMeetupImg from '@/images/devops-meetup.jpg';
import MobileHackathonImg from '@/images/mobile-hackathon.jpg';
import CybersecurityForumImg from '@/images/cybersecurity.jpg';
import DataScienceBootcampImg from '@/images/data-science.jpg';


export type EventType = 'meetup' | 'hackathon' | 'workshop';

export interface IEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  location: string; // This will store the meeting URL
  isVirtual: boolean;
  description: string;
  image: string;
  organizer: {
    name: string;
    id: string;
  };
  attendees: number;
  maxAttendees?: number;
}

export const featuredEvents: IEvent[] = [
  {
    id: '1',
    title: 'React Advanced Workshop',
    type: 'workshop',
    date: '2025-05-15',
    time: '10:00 AM - 4:00 PM',
    location: 'https://zoom.us/j/123456789',
    isVirtual: true,
    description: 'Deep dive into advanced React patterns and performance optimization techniques',
    image: ReactImg,
    organizer: {
      name: 'React Masters',
      id: '101',
    },
    attendees: 120,
    maxAttendees: 150,
  },
  {
    id: '2',
    title: 'AI & ML Hackathon',
    type: 'hackathon',
    date: '2025-05-22',
    time: '9:00 AM - 9:00 PM',
    location: 'https://meet.google.com/abc-defg-hij',
    isVirtual: true,
    description: '24-hour hackathon focused on building innovative AI solutions',
    image: AiHackathonImg,
    organizer: {
      name: 'AI Innovation Lab',
      id: '102',
    },
    attendees: 75,
    maxAttendees: 100,
  },
  {
    id: '3',
    title: 'Web3 Developers Meetup',
    type: 'meetup',
    date: '2025-05-10',
    time: '6:30 PM - 8:30 PM',
    location: 'https://zoom.us/j/987654321',
    isVirtual: true,
    description: 'Monthly meetup for Web3 developers to network and share ideas',
    image: Web3MeetupImg,
    organizer: {
      name: 'Blockchain Enthusiasts',
      id: '103',
    },
    attendees: 45,
  },
  {
    id: '4',
    title: 'Design Systems Workshop',
    type: 'workshop',
    date: '2025-05-18',
    time: '1:00 PM - 5:00 PM',
    location: 'https://meet.google.com/xyz-abcd-efg',
    isVirtual: true,
    description: 'Learn how to build and maintain scalable design systems',
    image: DesignSystemsImg,
    organizer: {
      name: 'DesignOps Collective',
      id: '104',
    },
    attendees: 60,
    maxAttendees: 80,
  },
  {
    id: '5',
    title: 'DevOps Best Practices',
    type: 'meetup',
    date: '2025-05-25',
    time: '5:00 PM - 7:00 PM',
    location: 'https://zoom.us/j/123123123',
    isVirtual: true,
    description: 'Sharing DevOps strategies that improve deployment efficiency',
    image: DevOpsMeetupImg,
    organizer: {
      name: 'Cloud Native Group',
      id: '105',
    },
    attendees: 50,
  },
  {
    id: '6',
    title: 'Mobile App Development Hackathon',
    type: 'hackathon',
    date: '2025-06-05',
    time: '10:00 AM - 6:00 PM',
    location: 'https://meet.google.com/pqr-stuv-wxy',
    isVirtual: true,
    description: 'Build a functional mobile app in just 48 hours',
    image: MobileHackathonImg,
    organizer: {
      name: 'App Creators Alliance',
      id: '106',
    },
    attendees: 90,
    maxAttendees: 120,
  },
];

export const upcomingEvents: IEvent[] = [
  ...featuredEvents,
  {
    id: '7',
    title: 'Cybersecurity Forum',
    type: 'meetup',
    date: '2025-06-12',
    time: '3:00 PM - 6:00 PM',
    location: 'https://zoom.us/j/456789123',
    isVirtual: true,
    description: 'Discussion on the latest cybersecurity threats and defense strategies',
    image: CybersecurityForumImg,
    organizer: {
      name: 'SecureNet Group',
      id: '107',
    },
    attendees: 85,
  },
  {
    id: '8',
    title: 'Data Science Bootcamp',
    type: 'workshop',
    date: '2025-06-15',
    time: '9:00 AM - 3:00 PM',
    location: 'https://meet.google.com/hij-klm-nop',
    isVirtual: true,
    description: 'Intensive one-day bootcamp on data analysis and visualization',
    image: DataScienceBootcampImg,
    organizer: {
      name: 'Data Wizards',
      id: '108',
    },
    attendees: 30,
    maxAttendees: 40,
  },
];

export type UserRole = 'attendee' | 'organizer';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
