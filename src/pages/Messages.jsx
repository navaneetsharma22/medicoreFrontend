import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Send, Phone, Video, Info, 
  MoreVertical, CheckCheck, Smile, Paperclip,
  User, CheckCircle
} from 'lucide-react';
import Header from '../components/Header';

const chats = [
  { id: 1, name: 'Dr. Sarah L.', message: 'The blood test results look promising.', time: '10:30 AM', unread: 2, online: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 2, name: 'Alice Walker', message: 'I have a question about the prescription.', time: '09:45 AM', unread: 0, online: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  { id: 3, name: 'Lab Dept.', message: 'New reports uploaded for Robert.', time: 'Yesterday', unread: 0, online: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lab' },
  { id: 4, name: 'Billing Support', message: 'Invoice #8822 has been paid.', time: 'Monday', unread: 0, online: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Billing' },
];

const messages = [
  { id: 1, sender: 'them', text: 'Good morning! Have you seen the latest results for Alice?', time: '10:25 AM' },
  { id: 2, sender: 'me', text: 'Yes, I was just reviewing them. Everything seems to be within the normal range.', time: '10:27 AM' },
  { id: 3, sender: 'them', text: 'Great. I will schedule a follow-up for next Tuesday to discuss the next steps.', time: '10:30 AM' },
];

export default function Messages() {
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [inputText, setInputText] = useState('');

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
      <Header />

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 pb-6 overflow-hidden">
        
        {/* Left: Chat List */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          className="lg:w-1/3 flex flex-col gap-6 h-full"
        >
          <div className="glass-card rounded-3xl p-6 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Messages</h2>
              <button className="text-text-secondary hover:text-white p-2 bg-white/5 rounded-xl transition">
                <Info className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-text-primary placeholder:text-text-secondary outline-none focus:border-medicore-primary/50 transition-all"
              />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
              {chats.map((chat) => (
                <button 
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                    activeChat.id === chat.id ? 'bg-medicore-primary/20 border border-medicore-primary/30 shadow-lg' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img src={chat.avatar} className="w-12 h-12 rounded-2xl border border-white/10" alt="" />
                    {chat.online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#1e293b] rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-bold truncate text-sm">{chat.name}</h4>
                      <span className="text-[10px] text-text-secondary uppercase">{chat.time}</span>
                    </div>
                    <p className="text-text-secondary text-xs truncate">{chat.message}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="bg-medicore-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                      {chat.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Chat Window */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:w-2/3 flex flex-col gap-6 h-full"
        >
          <div className="glass-card rounded-3xl flex flex-col h-full overflow-hidden border border-white/10">
            {/* Chat Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={activeChat.avatar} className="w-12 h-12 rounded-2xl border border-white/10" alt="" />
                  {activeChat.online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#1e293b] rounded-full" />}
                </div>
                <div>
                  <h3 className="text-white font-bold">{activeChat.name}</h3>
                  <p className="text-medicore-primary text-xs font-medium">{activeChat.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2.5 hover:bg-white/10 rounded-xl transition text-text-secondary"><Phone className="w-5 h-5" /></button>
                <button className="p-2.5 hover:bg-white/10 rounded-xl transition text-text-secondary"><Video className="w-5 h-5" /></button>
                <button className="p-2.5 hover:bg-white/10 rounded-xl transition text-text-secondary"><MoreVertical className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] group ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                      msg.sender === 'me' 
                        ? 'bg-medicore-primary text-white rounded-tr-none shadow-lg' 
                        : 'bg-white/5 border border-white/10 text-text-primary rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <div className={`flex items-center gap-2 mt-2 text-[10px] text-text-secondary ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      {msg.time}
                      {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-medicore-primary" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 bg-white/5 border-t border-white/10">
              <form className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2" onSubmit={(e) => e.preventDefault()}>
                <button type="button" className="text-text-secondary hover:text-white p-2 transition"><Paperclip className="w-5 h-5" /></button>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 bg-transparent border-none outline-none text-text-primary text-sm py-2"
                />
                <button type="button" className="text-text-secondary hover:text-white p-2 transition"><Smile className="w-5 h-5" /></button>
                <button type="submit" className="bg-medicore-primary hover:bg-medicore-dark p-3 rounded-xl text-white shadow-lg transition-all active:scale-95">
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
