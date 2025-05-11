
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const PrivacyPolicy = () => {
  const { user, userRole, signOut } = useAuth();

  const sections = [
    { id: "who-we-are", title: "Who We Are" },
    { id: "privacy-statement", title: "Our Privacy Statement" },
    { id: "personal-data", title: "Personal Data That We Collect" },
    { id: "data-usage", title: "How We Use Your Personal Data" },
    { id: "data-disclosure", title: "How We Disclose And Transfer Your Personal Data" },
    { id: "data-storage", title: "How We Store Your Personal Data" },
    { id: "data-access", title: "How You Can Access, Update, Correct or Delete Your Personal Data" },
    { id: "data-retention", title: "How Long We Retain Your Personal Data" },
    { id: "cookies", title: "Cookies, Pixels Tags, Local Shared Objects, Web Storage And Similar Technologies" },
    { id: "choices", title: "Your Choices" },
    { id: "exclusions", title: "Exclusions" },
    { id: "children", title: "Children - Children's Online Privacy Protection Act" },
    { id: "international", title: "International Privacy Laws" },
    { id: "changes", title: "Changes To This Privacy Policy" },
    { id: "dispute", title: "Dispute Resolution" },
    { id: "non-users", title: "NOTICE FOR PEOPLE WHO DON'T USE GATHERLY SERVICES" }
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar 
          isLoggedIn={!!user}
          userRole={userRole}
          onLogout={signOut}
        />
        <main className="flex-grow container mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="mb-8">Last Updated: January 1st, 2025</p>
            <p className="mb-8">
              To learn more about Gatherly's Legal Terms, take a look {' '}
              <Link to="/terms-of-service" className="text-gatherly-neon hover:underline">
                here
              </Link>.
            </p>

            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4">In this Policy we have:</h2>
              <ol className="list-decimal list-inside space-y-2">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <button 
                      onClick={() => scrollToSection(section.id)}
                      className="text-gatherly-neon hover:underline text-left"
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {sections.map((section) => (
  <section key={section.id} id={section.id} className="mb-12 scroll-mt-20">
    <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
    <p className="text-muted-foreground">
      {(() => {
        switch (section.id) {
          case "who-we-are":
            return "Gatherly is a digital platform where anyone can join virtual tech meetups, hackathons, and workshops from anywhere in the world.";
          case "privacy-statement":
            return "This privacy statement outlines how we collect, use, disclose, and safeguard your information when you use our platform. By accessing our services, you consent to the data practices described in this policy.";
          case "personal-data":
            return "We may collect personal data such as your name, email address, location, device identifiers, and usage information when you create an account, fill out forms, or interact with our platform.";
          case "data-usage":
            return "Your personal data is used to provide and improve our services, communicate with you, offer customer support, process transactions, and analyze usage trends to enhance user experience.";
          case "data-disclosure":
            return "We do not sell your data. However, we may share information with service providers, legal authorities when required, and business partners strictly under confidentiality agreements.";
          case "data-storage":
            return "We store your data on secure servers using industry-standard encryption protocols. Access to data is limited to authorized personnel and is subject to regular security audits.";
          case "data-access":
            return "You have the right to request access to your personal data, make corrections, or request deletion. Please contact support@gatherly.com to exercise these rights.";
          case "data-retention":
            return "We retain your data only as long as necessary to fulfill the purposes outlined in this policy unless a longer retention period is required by law.";
          case "cookies":
            return "We use cookies, pixel tags, and local storage to personalize your experience, analyze trends, and gather demographic information. You can control cookie preferences in your browser settings.";
          case "choices":
            return "You may opt out of receiving marketing emails, limit cookie tracking, or deactivate your account at any time. Note that some features may not function correctly if you disable tracking.";
          case "exclusions":
            return "This policy does not apply to third-party websites, services, or applications not operated by Gatherly, even if they are accessible through our platform.";
          case "children":
            return "Our services are not intended for children under 13. We do not knowingly collect personal data from minors. If we discover such data has been collected, we will delete it promptly.";
          case "international":
            return "If you are accessing Gatherly from outside your country, be aware that your data may be transferred and processed in jurisdictions with different data protection laws.";
          case "changes":
            return "We may update this policy periodically. Significant changes will be communicated via email or in-app notifications. Continued use of our services implies acceptance of the revised terms.";
          case "dispute":
            return "In the event of a dispute regarding data privacy, we encourage resolution through our support team. If unresolved, binding arbitration under applicable law may be pursued.";
          case "non-users":
            return "If you receive communication from us but are not a registered user, it may be due to someone providing your contact info. You may request removal by emailing support@gatherly.com.";
          default:
            return "Details for this section are not available yet.";
        }
      })()}
    </p>
  </section>
))}

            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <Button 
                size="lg"
                className="bg-gatherly-neon hover:bg-gatherly-neon/90"
                onClick={() => window.location.href = 'mailto:support@gatherly.com'}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default PrivacyPolicy;
