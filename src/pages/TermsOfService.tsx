
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

const TermsOfService = () => {
  const { user, userRole, signOut } = useAuth();

  const sections = [
    { id: "accepting", title: "Accepting These Terms" },
    { id: "services", title: "Gatherly's Services and Role" },
    { id: "privacy", title: "Privacy and Consumer Information" },
    { id: "export", title: "Export Controls and Restricted Countries" },
    { id: "indemnification", title: "Release and Indemnification" },
    { id: "warranties", title: "Disclaimer of Warranties and Assumption of Risks by You" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "arbitration", title: "IMPORTANT: BINDING ARBITRATION AND CLASS ACTION WAIVER PROVISIONS" },
    { id: "license", title: "License to the Gatherly Services" },
    { id: "permits", title: "Licenses and Permits Organizers Must Obtain" },
    { id: "copyright", title: "Your Rights to Submit a Copyright Takedown Notice" },
    { id: "scraping", title: "Scraping or Commercial Use of Site Content is Prohibited" },
    { id: "fees", title: "Fees and Refunds" },
    { id: "account", title: "Your Account with Gatherly" },
    { id: "content", title: "Your Content and Your Trademarks" },
    { id: "notices", title: "Notices" },
    { id: "modifications", title: "Modifications to the Terms or Services" },
    { id: "assignment", title: "Assignment" },
    { id: "agreement", title: "Entire Agreement" },
    { id: "feedback", title: "Feedback" },
    { id: "additional", title: "Additional Clauses for Users in Certain Locations" }
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
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="mb-8">Last updated: April 28, 2025</p>

            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4">In this article</h2>
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
          case "accepting":
            return "By using Gatherly, you agree to abide by these Terms of Service. If you do not accept these terms, you should not use our platform.";
          case "services":
            return "Gatherly provides a virtual space for hosting and attending tech meetups, hackathons, and workshops. We serve as a facilitator, not a direct organizer of most events.";
          case "privacy":
            return "We collect and use your information in accordance with our Privacy Policy. Please review it to understand how your data is handled.";
          case "export":
            return "Gatherly complies with all applicable export laws and regulations. Users from restricted countries may not be permitted to access our platform.";
          case "indemnification":
            return "You agree to hold Gatherly harmless from any claims or liabilities arising from your use of the platform or violation of these terms.";
          case "warranties":
            return "We provide our platform 'as-is' and do not guarantee uninterrupted access or error-free experiences. Users participate in events at their own risk.";
          case "liability":
            return "To the fullest extent permitted by law, Gatherly disclaims liability for any indirect or consequential damages resulting from your use of the platform.";
          case "arbitration":
            return "Disputes arising under these terms will be resolved through binding arbitration. By agreeing to these terms, you waive your right to a jury trial or class action.";
          case "license":
            return "You are granted a limited, non-exclusive license to access and use the Gatherly platform for personal or professional purposes aligned with our services.";
          case "permits":
            return "Event organizers are responsible for obtaining any necessary licenses or permits required to host virtual or hybrid events on Gatherly.";
          case "copyright":
            return "If you believe content on Gatherly infringes your copyright, you may file a takedown notice under the DMCA by contacting us directly.";
          case "scraping":
            return "Scraping, harvesting, or commercially exploiting content from Gatherly without authorization is strictly prohibited.";
          case "fees":
            return "Some events or services may include registration fees. Refunds are handled according to the event organizer’s policy and not directly by Gatherly.";
          case "account":
            return "You are responsible for maintaining the confidentiality of your account credentials. Gatherly is not liable for activity resulting from unauthorized access.";
          case "content":
            return "By posting content or using your trademarks on Gatherly, you grant us a license to display, distribute, and promote them for event-related purposes.";
          case "notices":
            return "We may send you notices through email or in-app notifications. It is your responsibility to keep your contact information up to date.";
          case "modifications":
            return "We may update these terms occasionally. Continued use of Gatherly after changes indicates your acceptance of the new terms.";
          case "assignment":
            return "You may not transfer your rights under these terms to another party. We may assign our rights without restriction.";
          case "agreement":
            return "These Terms of Service constitute the entire agreement between you and Gatherly regarding your use of the platform.";
          case "feedback":
            return "We welcome feedback and suggestions. By submitting feedback, you grant us permission to use it without restriction or compensation.";
          case "additional":
            return "Additional terms may apply for users in specific jurisdictions. Please review your local laws and how they interact with our services.";
          default:
            return "This section will be updated with the appropriate information soon.";
        }
      })()}
    </p>
  </section>
))}

          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default TermsOfService;
