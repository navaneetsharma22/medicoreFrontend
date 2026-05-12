import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Mic, MicOff, Video, VideoOff, 
  PhoneOff, Settings, Users, MessageSquare,
  Share, Maximize, Shield
} from 'lucide-react';

export default function TelehealthModal({ patientName = "Emma Watson", onClose }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsConnected(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/40 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="bg-mediBuddy-primary/20 p-2 rounded-xl">
            <Shield className="w-5 h-5 text-mediBuddy-primary" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Secure Consultation</h2>
            <p className="text-text-secondary text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Patient: {patientName} · End-to-end Encrypted
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition text-text-secondary">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Video Grid */}
      <div className="flex-1 relative p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Remote Participant (Patient) */}
        <div className="relative bg-white/5 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center">
          {!isConnected ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-mediBuddy-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-text-secondary animate-pulse">Waiting for patient to join...</p>
            </div>
          ) : (
            <>
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover" 
                alt="Patient" 
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <p className="text-white text-xs font-medium">{patientName}</p>
              </div>
            </>
          )}
        </div>

        {/* Local Participant (Doctor) */}
        <div className="relative bg-white/5 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center">
          {isVideoOff ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-mediBuddy-primary/20 rounded-full flex items-center justify-center">
                <VideoOff className="w-8 h-8 text-mediBuddy-primary" />
              </div>
              <p className="text-text-secondary text-sm">Your camera is off</p>
            </div>
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover grayscale brightness-75" 
              alt="Doctor" 
            />
          )}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <p className="text-white text-xs font-medium">Dr. Sarah (You)</p>
          </div>
          {isMuted && (
            <div className="absolute top-4 right-4 bg-rose-500 p-2 rounded-full shadow-lg">
              <MicOff className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-black/60 backdrop-blur-xl p-8 border-t border-white/10 flex items-center justify-center gap-4">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`p-4 rounded-2xl transition-all ${isMuted ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        <button 
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-4 rounded-2xl transition-all ${isVideoOff ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
        </button>
        
        <div className="w-px h-8 bg-white/10 mx-2" />

        <button className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all hidden sm:block">
          <MessageSquare className="w-6 h-6" />
        </button>
        <button className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all hidden sm:block">
          <Share className="w-6 h-6" />
        </button>

        <button 
          onClick={onClose}
          className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-rose-500/20"
        >
          <PhoneOff className="w-6 h-6" />
          End Session
        </button>

        <div className="w-px h-8 bg-white/10 mx-2" />

        <button className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all">
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
}
