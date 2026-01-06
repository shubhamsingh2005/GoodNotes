import React from 'react';
import { FaQuestionCircle, FaEnvelope, FaLightbulb, FaShieldAlt, FaShareAlt, FaTrash, FaFolder, FaPen, FaSearch } from 'react-icons/fa';

const Help: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-6 md:p-12 scrollbar-thin">
      <div className="max-w-4xl mx-auto animate-fade-in-up">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
             <FaQuestionCircle size={40} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
            Help & Support
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about using GoodNotes efficiently.
          </p>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-12 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
           <div>
              <h2 className="text-2xl font-bold mb-2">Need personal assistance?</h2>
              <p className="text-blue-100">Found a bug or have a feature request? We'd love to hear from you.</p>
           </div>
           <a 
             href="mailto:shubhamsingh33972@gmail.com" 
             className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-md flex items-center gap-2"
           >
             <FaEnvelope /> Contact Support
           </a>
        </div>

        {/* Features Guide */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
           Features Guide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
           {/* Card 1 */}
           <FeatureCard 
              icon={<FaPen />} 
              title="Creating & Editing Notes" 
              desc="Use the 'Add Note' button to start. Our rich text editor supports formatting, colors, and lists. Don't forget to hit Save!" 
           />
           {/* Card 2 */}
           <FeatureCard 
              icon={<FaFolder />} 
              title="Organization" 
              desc="Organize your notes into folders. You can also pin important notes to the top or star them for quick access in the 'Favorites' tab." 
           />
           {/* Card 3 */}
           <FeatureCard 
              icon={<FaShareAlt />} 
              title="Sharing Notes" 
              desc="Share notes with anyone using a unique 4-digit code. Friends can view your note and even save a copy to their own account." 
           />
           {/* Card 4 */}
           <FeatureCard 
              icon={<FaTrash />} 
              title="Trash & Recovery" 
              desc="Deleted notes go to the Trash first. You can restore them anytime or permanently delete them if you're sure." 
           />
           {/* Card 5 */}
           <FeatureCard 
              icon={<FaSearch />} 
              title="Smart Search" 
              desc="Instantly find any note by searching for keywords in the title, content, or tags using the search bar." 
           />
           {/* Card 6 */}
           <FeatureCard 
              icon={<FaShieldAlt />} 
              title="Security" 
              desc="Your data is secure. You can also update your password and profile details in the Settings menu." 
           />
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
           Frequently Asked Questions
        </h2>
        <div className="space-y-4">
           <FAQItem 
              question="Is GoodNotes free to use?" 
              answer="Yes! GoodNotes is completely free for all users." 
           />
           <FAQItem 
              question="How do I change the theme?" 
              answer="Go to Settings > Appearance and toggle the Dark Mode switch." 
           />
           <FAQItem 
              question="Can I recover permanently deleted notes?" 
              answer="No. Once you delete a note from the Trash using 'Delete Forever', it cannot be recovered." 
           />
           <FAQItem 
              question="How does sharing work?" 
              answer="Click the Share icon on any note to generate a code. Give this code to a friend, and they can enter it in the 'Shared With Me' section." 
           />
        </div>

      </div>
    </div>
  );
};

// Helper Components
const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <div className="text-purple-600 mb-3 text-2xl">{icon}</div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
    </div>
);

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
            <FaLightbulb className="text-yellow-500" size={14} /> {question}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 ml-6">{answer}</p>
    </div>
);

export default Help;
