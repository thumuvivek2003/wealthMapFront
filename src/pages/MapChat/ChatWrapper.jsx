// ChatWrapper.jsx
import React, { useState } from 'react';
import { MessageSquare,X} from 'lucide-react';
import Chat from './Chat';

const ChatWrapper = ({ generateLocations }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="absolute bottom-4 left-4 z-[1000]" style={{bottom:'100px'}}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
      >
        {isOpen ?  <X className="w-5 h-5" />  : <MessageSquare className="w-5 h-5" /> }
      </button>
      {isOpen && (
        <div className="mt-2 w-80 h-96 bg-white border rounded shadow-lg flex flex-col">
          <Chat generateLocations={generateLocations} />
        </div>
      )}
    </div>
  );
};

export default ChatWrapper;
