import React from 'react';
import { FaLinkedin, FaGithub, FaCode, FaUserTie } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-6 md:p-12 scrollbar-thin">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
            About <span className="text-purple-600">GoodNotes</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            A modern, secure, and intuitive note-taking application built for productivity.
          </p>
        </div>

        {/* Developer Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-12 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-32 relative">
             <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200">
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                        alt="Shubham Singh" 
                        className="w-full h-full object-cover"
                    />
                </div>
             </div>
          </div>
          
          <div className="pt-20 pb-8 px-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Shubham Singh</h2>
            <p className="text-purple-600 font-medium mb-4">Full Stack Developer</p>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-lg mx-auto">
              Passionate about building scalable web applications and solving real-world problems through code. 
              GoodNotes is a testament to the power of the MERN stack and modern web technologies.
            </p>

            <div className="flex justify-center gap-4">
              <a 
                href="https://www.linkedin.com/in/shubham-singh-848a82268/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#0077b5] text-white px-6 py-2 rounded-full font-bold hover:bg-[#006396] transition-colors shadow-md"
              >
                <FaLinkedin size={20} /> LinkedIn
              </a>
              {/* Optional: Add GitHub if available, or just keep LinkedIn */}
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-purple-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-purple-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                 <FaCode className="text-purple-600" /> Tech Stack
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                 <li>• <strong>Frontend:</strong> React, TypeScript, Tailwind CSS</li>
                 <li>• <strong>Backend:</strong> Node.js, Express</li>
                 <li>• <strong>Database:</strong> MongoDB Atlas</li>
                 <li>• <strong>State Management:</strong> Context API</li>
              </ul>
           </div>

           <div className="bg-blue-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-blue-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                 <FaUserTie className="text-blue-600" /> Credits
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                 Designed and Developed by <strong>Shubham Singh</strong>.
                 <br/>
                 Built with love for the open source community.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default About;
