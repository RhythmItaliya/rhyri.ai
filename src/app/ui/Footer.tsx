import React from 'react';

const Footer = () => (
     <footer className="w-full text-center text-xs text-gray-500 space-x-4 py-4 border-t bg-white fixed bottom-0 left-0">
          <a
               href="https://www.rhythmitaliya.com/"
               target="_blank"
               rel="noopener noreferrer"
               className="hover:underline"
          >
               Personal Website
          </a>

          <a
               href="https://www.linkedin.com/in/rhythmitaliya/"
               target="_blank"
               rel="noopener noreferrer"
               className="hover:underline"
          >
               LinkedIn
          </a>

          <a
               href="https://github.com/rhythmitaliya"
               target="_blank"
               rel="noopener noreferrer"
               className="hover:underline"
          >
               GitHub Profile
          </a>

          <a
               href="https://github.com/RhythmItaliya/vendor#"
               target="_blank"
               rel="noopener noreferrer"
               className="hover:underline"
          >
               Source Code (This Repo)
          </a>
     </footer>
);

export default Footer;
