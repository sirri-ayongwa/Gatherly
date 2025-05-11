
import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-12 bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gatherly-neon flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="font-montserrat text-2xl font-bold bg-gradient-to-r from-gatherly-neon to-gatherly-orange bg-clip-text text-transparent">
                Gatherly
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your platform for creating and joining virtual tech events. Connect with like-minded 
              individuals through meetups, hackathons, and workshops.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/#events" className="hover:text-gatherly-neon transition-colors">Events</a>
              </li>
              <li>
                <a href="/#featured" className="hover:text-gatherly-neon transition-colors">Featured</a>
              </li>
              <li>
                <a href="/#about" className="hover:text-gatherly-neon transition-colors">About Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="mailto:support@gatherly.com" className="hover:text-gatherly-neon transition-colors">Help Center</a>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-gatherly-neon transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-gatherly-neon transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="mailto:info@gatherly.com" className="hover:text-gatherly-neon transition-colors">info@gatherly.com</a>
              </li>
              <li>
                <a href="tel:+1(555)123-4567" className="hover:text-gatherly-neon transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex gap-4 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gatherly-neon transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gatherly-neon transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-gatherly-neon transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gatherly-neon transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t text-center text-muted-foreground text-sm">
          <p>© {currentYear} Gatherly. All rights reserved 
            <span className="mx-1">•</span>
            <a 
              href="https://sirri-portfolio-7lisv8t.gamma.site/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gatherly-neon transition-colors"
            >
              Developed by Sirri
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
