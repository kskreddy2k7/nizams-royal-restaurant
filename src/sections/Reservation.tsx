import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, MessageSquare, Printer, CheckCircle, Wind, Sun, Layers } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  capacity: number;
  status: 'available' | 'reserved';
  roomType: 'ac' | 'non-ac';
  sharingText: string;
  cx: number;
  cy: number;
  r: number;
}

// 8 Tables total (4 in AC, 4 in Non-AC), covering 2, 4, 6, and 12 sharing configurations
const TABLES: Table[] = [
  // --- AC Chambers Layout ---
  { id: 'ac-2', name: 'The Nizam Alcove', capacity: 2, status: 'available', roomType: 'ac', sharingText: '2 Sharing Cozy Table', cx: 130, cy: 110, r: 22 },
  { id: 'ac-4', name: 'The Golconda Suite', capacity: 4, status: 'available', roomType: 'ac', sharingText: '4 Sharing Family Table', cx: 300, cy: 110, r: 30 },
  { id: 'ac-6', name: 'The Deccan Diwan', capacity: 6, status: 'available', roomType: 'ac', sharingText: '6 Sharing Royal Diwan', cx: 470, cy: 110, r: 38 },
  { id: 'ac-12', name: 'The Falaknuma Grand Table', capacity: 12, status: 'available', roomType: 'ac', sharingText: '12 Sharing Palace Banquet', cx: 300, cy: 245, r: 52 },

  // --- Non-AC Open-Air Courtyards Layout ---
  { id: 'nac-2', name: 'The Charminar Canopy', capacity: 2, status: 'available', roomType: 'non-ac', sharingText: '2 Sharing Open Canopy', cx: 130, cy: 110, r: 22 },
  { id: 'nac-4', name: 'The Kaveri Pergola', capacity: 4, status: 'reserved', roomType: 'non-ac', sharingText: '4 Sharing Pergola Seating', cx: 300, cy: 110, r: 30 },
  { id: 'nac-6', name: 'The Hampi Pavilion', capacity: 6, status: 'available', roomType: 'non-ac', sharingText: '6 Sharing Stone Pavilion', cx: 470, cy: 110, r: 38 },
  { id: 'nac-12', name: 'The Mysore Royal Courtyard', capacity: 12, status: 'available', roomType: 'non-ac', sharingText: '12 Sharing Grand Courtyard', cx: 300, cy: 245, r: 52 },
];

export const Reservation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '19:00',
    guests: '2',
    seatingPreference: 'ac', // default to 'ac' section
    notes: '',
  });
  
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [activeLayoutTab, setActiveLayoutTab] = useState<'ac' | 'non-ac'>('ac');

  const handleTableClick = (table: Table) => {
    if (table.status === 'reserved') return;
    
    // Automatically align form seating preference to table Room Type when clicked
    if (formData.seatingPreference !== table.roomType) {
      setFormData(prev => ({
        ...prev,
        seatingPreference: table.roomType
      }));
    }

    setSelectedTable(selectedTable?.id === table.id ? null : table);
    setValidationError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationError('');

    // If user changes seating area select dropdown, switch the visible active SVG map layout tab as well
    if (name === 'seatingPreference') {
      setActiveLayoutTab(value as 'ac' | 'non-ac');
      // Clear selected table if it belongs to the other layout
      if (selectedTable && selectedTable.roomType !== value) {
        setSelectedTable(null);
      }
    }
  };

  const handleLayoutTabClick = (tab: 'ac' | 'non-ac') => {
    setActiveLayoutTab(tab);
    setFormData(prev => ({
      ...prev,
      seatingPreference: tab
    }));
    // Clear selected table if swapping tabs
    if (selectedTable && selectedTable.roomType !== tab) {
      setSelectedTable(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.date) {
      setValidationError('Please fill in all required fields (Name, Email, Date).');
      return;
    }

    if (!selectedTable) {
      setValidationError('Please select an available table from the active room layout.');
      return;
    }

    // Double check that the selected table capacity matches or accommodates guests count
    const guestNum = parseInt(formData.guests);
    if (guestNum > selectedTable.capacity) {
      setValidationError(`The selected table only accommodates up to ${selectedTable.capacity} guests. Please select a larger table.`);
      return;
    }

    setIsSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter tables based on active visual layout tab
  const visibleTables = TABLES.filter(table => table.roomType === activeLayoutTab);

  return (
    <section id="reservation" className="relative w-full min-h-screen section-padding bg-[#0A0A0A] z-10 overflow-hidden border-t border-charcoal">
      {/* Background decoration elements */}
      <div className="absolute right-10 bottom-10 w-96 h-96 rounded-full bg-copper/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-copper mb-6 font-semibold block">
            06 • THE COVENANT
          </span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-wide leading-tight uppercase">
            Reservations
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Side: Booking Form */}
          <div className="lg:col-span-6 glass-panel p-8 md:p-10 rounded-sm">
            <h3 className="text-2xl font-serif text-warm-white mb-8 border-b border-charcoal pb-4">
              Secure Your Feast
            </h3>

            {validationError && (
              <div className="mb-6 p-4 bg-red-950/20 border border-red-500/30 text-red-300 text-xs tracking-wider uppercase rounded-sm">
                {validationError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="flex flex-col text-left">
                <label className="text-[10px] uppercase tracking-widest text-copper mb-2 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="bg-charcoal/50 border border-charcoal focus:border-copper/50 px-4 py-3.5 text-sm text-warm-white placeholder-warm-white/20 rounded-sm outline-none transition-all cursor-none"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col text-left">
                <label className="text-[10px] uppercase tracking-widest text-copper mb-2 font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="bg-charcoal/50 border border-charcoal focus:border-copper/50 px-4 py-3.5 text-sm text-warm-white placeholder-warm-white/20 rounded-sm outline-none transition-all cursor-none"
                  required
                />
              </div>

              {/* Date / Time / Seating Preferences Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] uppercase tracking-widest text-copper mb-2 font-semibold flex items-center gap-1.5">
                    <Calendar size={12} /> Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="bg-charcoal/50 border border-charcoal focus:border-copper/50 px-3 py-3.5 text-xs text-warm-white rounded-sm outline-none transition-all cursor-none"
                    required
                  />
                </div>

                {/* Time */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] uppercase tracking-widest text-copper mb-2 font-semibold flex items-center gap-1.5">
                    <Clock size={12} /> Time
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="bg-charcoal/50 border border-charcoal focus:border-copper/50 px-3 py-3.5 text-xs text-warm-white rounded-sm outline-none transition-all cursor-none"
                  >
                    <option value="19:00">19:00 — Prelude</option>
                    <option value="19:30">19:30 — Prelude</option>
                    <option value="20:00">20:00 — Feast</option>
                    <option value="20:30">20:30 — Feast</option>
                    <option value="21:00">21:00 — Royal Dum</option>
                  </select>
                </div>

                {/* Guests */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] uppercase tracking-widest text-copper mb-2 font-semibold flex items-center gap-1.5">
                    <Users size={12} /> Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="bg-charcoal/50 border border-charcoal focus:border-copper/50 px-3 py-3.5 text-xs text-warm-white rounded-sm outline-none transition-all cursor-none"
                  >
                    <option value="2">2 Sharing</option>
                    <option value="4">4 Sharing</option>
                    <option value="6">6 Sharing</option>
                    <option value="12">12 Sharing Banquet</option>
                  </select>
                </div>

                {/* Seating Preference Dropdown */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] uppercase tracking-widest text-copper mb-2 font-semibold flex items-center gap-1.5">
                    <Wind size={12} /> Seating Area
                  </label>
                  <select
                    name="seatingPreference"
                    value={formData.seatingPreference}
                    onChange={handleInputChange}
                    className="bg-charcoal/50 border border-charcoal focus:border-copper/50 px-3 py-3.5 text-xs text-warm-white rounded-sm outline-none transition-all cursor-none"
                  >
                    <option value="ac">Royal AC Chamber</option>
                    <option value="non-ac">Traditional Courtyard (Non-AC)</option>
                  </select>
                </div>
              </div>

              {/* Selected Table Indicator */}
              <div className="flex justify-between items-center p-3.5 bg-copper/5 border border-copper/10 rounded-sm text-xs">
                <span className="text-warm-white/40 uppercase tracking-wider">Allocated Table</span>
                <span className="text-copper font-serif font-medium tracking-wide">
                  {selectedTable ? `${selectedTable.name} (${selectedTable.sharingText})` : 'Select on map →'}
                </span>
              </div>

              {/* Special Notes */}
              <div className="flex flex-col text-left">
                <label className="text-[10px] uppercase tracking-widest text-copper mb-2 font-semibold flex items-center gap-1.5">
                  <MessageSquare size={12} /> Dietary Requests
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Note allergies, anniversaries, spice tolerance"
                  className="bg-charcoal/50 border border-charcoal focus:border-copper/50 px-4 py-3 text-sm text-warm-white placeholder-warm-white/20 rounded-sm outline-none resize-none transition-all cursor-none"
                />
              </div>

              {/* Book Button */}
              <button
                type="submit"
                className="w-full py-4 bg-copper hover:bg-copper-light text-bg-dark uppercase tracking-widest font-semibold text-xs rounded-sm transition-all duration-300 relative group overflow-hidden cursor-none"
              >
                <span className="relative z-10">Confirm Seating Reservation</span>
              </button>
            </form>
          </div>

          {/* Right Side: Dual-Layout Interactive Seating maps */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div className="glass-panel p-6 rounded-sm text-left">
              <div className="flex items-center justify-between border-b border-charcoal pb-4 mb-6">
                <div>
                  <h4 className="text-lg font-serif text-copper tracking-wide">
                    Floor Plan Visualizer
                  </h4>
                  <p className="text-[10px] text-warm-white/40 font-light mt-0.5">
                    Click tabs to toggle sections. Pick your sharing circle.
                  </p>
                </div>
                <Layers className="text-copper/40" size={18} />
              </div>

              {/* Room Layout Swap Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => handleLayoutTabClick('ac')}
                  className={`py-3 text-[10px] uppercase tracking-widest font-bold border transition-all rounded-sm cursor-none ${
                    activeLayoutTab === 'ac'
                      ? 'border-sky-500 bg-sky-950/15 text-sky-400 font-semibold'
                      : 'border-charcoal bg-transparent text-warm-white/40 hover:text-warm-white'
                  }`}
                >
                  Royal AC Chamber (Indoor)
                </button>
                <button
                  type="button"
                  onClick={() => handleLayoutTabClick('non-ac')}
                  className={`py-3 text-[10px] uppercase tracking-widest font-bold border transition-all rounded-sm cursor-none ${
                    activeLayoutTab === 'non-ac'
                      ? 'border-amber-500 bg-amber-950/15 text-amber-400 font-semibold'
                      : 'border-charcoal bg-transparent text-warm-white/40 hover:text-warm-white'
                  }`}
                >
                  Open-Air Courtyard (Non-AC)
                </button>
              </div>

              {/* Seating Map SVG Wrapper with Animation */}
              <div className="relative w-full aspect-[4/3] bg-bg-dark/50 border border-charcoal rounded-sm flex items-center justify-center p-4">
                
                {/* Visual Section Badge inside Map */}
                <div className="absolute top-4 left-4 z-10 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 bg-charcoal/80 border border-charcoal rounded-sm font-semibold flex items-center gap-1.5">
                  {activeLayoutTab === 'ac' ? (
                    <>
                      <Wind size={10} className="text-sky-400" />
                      <span className="text-sky-400">Indoor AC Palace</span>
                    </>
                  ) : (
                    <>
                      <Sun size={10} className="text-amber-500" />
                      <span className="text-amber-500">Traditional Non-AC</span>
                    </>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  <motion.svg
                    key={activeLayoutTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    viewBox="0 0 600 350"
                    className="w-full h-full select-none"
                  >
                    {/* Dining Room Walls Outline */}
                    <rect x="10" y="10" width="580" height="330" fill="none" stroke="rgba(200, 125, 85, 0.08)" strokeWidth="2" />
                    
                    {/* Tandoor pass location */}
                    <line x1="10" y1="80" x2="10" y2="180" stroke="#C87D55" strokeWidth="4" strokeOpacity="0.4" />
                    <text x="25" y="135" fill="rgba(200, 125, 85, 0.4)" fontSize="9" letterSpacing="2" transform="rotate(-90 25 135)" textAnchor="middle">TANDOOR PASS</text>
                    
                    {/* Map Tables render */}
                    {visibleTables.map((table) => {
                      const isSelected = selectedTable?.id === table.id;
                      const isReserved = table.status === 'reserved';
                      
                      let strokeColor = table.roomType === 'ac' ? '#38bdf8' : '#f59e0b';
                      let fillColor = 'rgba(21, 21, 21, 0.6)';
                      
                      if (isReserved) {
                        strokeColor = 'rgba(255, 255, 255, 0.08)';
                        fillColor = 'rgba(21, 21, 21, 0.8)';
                      } else if (isSelected) {
                        strokeColor = '#C87D55';
                        fillColor = table.roomType === 'ac' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(245, 158, 11, 0.15)';
                      }

                      return (
                        <g
                          key={table.id}
                          onClick={() => handleTableClick(table)}
                          className={`transition-all duration-300 ${
                            isReserved ? 'cursor-not-allowed opacity-35' : 'cursor-none hover:scale-[1.015]'
                          }`}
                          style={{ transformOrigin: `${table.cx}px ${table.cy}px` }}
                        >
                          {/* Selected Table pulsing halo */}
                          {isSelected && (
                            <circle
                              cx={table.cx}
                              cy={table.cy}
                              r={table.r + 6}
                              fill="none"
                              stroke="#C87D55"
                              strokeOpacity="0.4"
                              strokeWidth="1.5"
                              className="animate-pulse-slow"
                            />
                          )}

                          {/* Outer Chairs Ring - exact seating count matching table capacity */}
                          {Array.from({ length: table.capacity }).map((_, chairIdx) => {
                            const angle = (chairIdx / table.capacity) * Math.PI * 2;
                            const cRadius = table.r + 9;
                            const cx = table.cx + Math.cos(angle) * cRadius;
                            const cy = table.cy + Math.sin(angle) * cRadius;
                            return (
                              <circle
                                key={chairIdx}
                                cx={cx}
                                cy={cy}
                                r="4.5"
                                fill={
                                  isReserved 
                                    ? '#1A1A1A' 
                                    : isSelected 
                                    ? '#C87D55' 
                                    : table.roomType === 'ac' 
                                    ? '#0284c7' 
                                    : '#d97706'
                                }
                                stroke={isReserved ? 'rgba(255, 255, 255, 0.05)' : '#C87D55'}
                                strokeWidth="1"
                                strokeOpacity={isReserved ? 0.3 : 0.6}
                              />
                            );
                          })}

                          {/* Central Table */}
                          <circle
                            cx={table.cx}
                            cy={table.cy}
                            r={table.r}
                            fill={fillColor}
                            stroke={strokeColor}
                            strokeWidth="2"
                          />

                          {/* Table Label number */}
                          <text
                            x={table.cx}
                            y={table.cy - 1}
                            fill={isReserved ? 'rgba(255, 255, 255, 0.1)' : isSelected ? '#C87D55' : 'rgba(245, 244, 240, 0.7)'}
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {table.id.toUpperCase()}
                          </text>

                          {/* Sharing Seat Number label below center */}
                          <text
                            x={table.cx}
                            y={table.cy + 9}
                            fill={isReserved ? 'rgba(255, 255, 255, 0.1)' : isSelected ? '#C87D55' : 'rgba(200, 125, 85, 0.7)'}
                            fontSize="7"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {table.capacity}P
                          </text>
                        </g>
                      );
                    })}
                  </motion.svg>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gold metallic reservation ticket modal overlay */}
      <AnimatePresence>
        {isSubmitted && selectedTable && (
          <div className="fixed inset-0 w-full h-full z-50 flex items-center justify-center p-6 bg-bg-dark/95 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="w-full max-w-xl bg-gradient-to-br from-[#E2CDAD]/20 via-[#C5A880]/10 to-[#A6865A]/20 border border-copper/40 p-8 rounded-sm text-left shadow-2xl relative"
            >
              {/* Scroll borders */}
              <div className="absolute top-0 bottom-0 left-4 w-[1px] border-l border-dashed border-copper/30 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-4 w-[1px] border-r border-dashed border-copper/30 pointer-events-none" />

              <div className="pl-6 pr-6">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-copper/20 pb-4 mb-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.3em] text-copper font-bold">
                      NIZAM'S DAAWAT
                    </h4>
                    <p className="text-[9px] uppercase tracking-widest text-warm-white/40 mt-1">
                      Royal Indian Fine Dining
                    </p>
                  </div>
                  <CheckCircle className="text-copper" size={24} />
                </div>

                {/* Status indicator */}
                <div className="text-center bg-copper/10 border border-copper/20 rounded-sm py-2 mb-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-copper font-semibold">
                    ROYAL INVITATION CONFIRMED
                  </span>
                </div>

                {/* Ticket Details Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs mb-8">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-warm-white/40 block mb-1">
                      Honored Guest
                    </span>
                    <span className="font-serif text-sm text-warm-white font-medium">
                      {formData.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-warm-white/40 block mb-1">
                      Feast Date
                    </span>
                    <span className="font-serif text-sm text-warm-white font-medium">
                      {formData.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-warm-white/40 block mb-1">
                      Feast Time Slot
                    </span>
                    <span className="font-serif text-sm text-warm-white font-medium">
                      {formData.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-warm-white/40 block mb-1">
                      Attendees Size
                    </span>
                    <span className="font-serif text-sm text-warm-white font-medium">
                      {formData.guests} Guests ({selectedTable.capacity} Sharing Circle)
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[9px] uppercase tracking-widest text-warm-white/40 block mb-1">
                      Allocated Seating Area
                    </span>
                    <span className="font-serif text-sm text-copper font-medium flex items-center gap-1.5">
                      {selectedTable.name} ({selectedTable.sharingText}) — {selectedTable.roomType === 'ac' ? 'AC Chamber' : 'Non-AC Courtyard'}
                      {selectedTable.roomType === 'ac' ? <Wind size={12} className="text-sky-400" /> : <Sun size={12} className="text-amber-500" />}
                    </span>
                  </div>
                </div>

                {/* Mock Barcode */}
                <div className="border-t border-copper/20 pt-6 mb-8 flex flex-col items-center">
                  <div className="w-full h-12 flex items-center justify-between bg-warm-white/5 p-2 border border-charcoal/50 rounded-sm">
                    <div className="w-1.5 h-full bg-warm-white/60 mx-px" />
                    <div className="w-[1px] h-full bg-warm-white/20 mx-px" />
                    <div className="w-1.5 h-full bg-warm-white/60 mx-px" />
                    <div className="w-[2px] h-full bg-warm-white/60 mx-px" />
                    <div className="w-[1px] h-full bg-warm-white/20 mx-px" />
                    <div className="w-1.5 h-full bg-warm-white/60 mx-px" />
                    <div className="w-[1px] h-full bg-warm-white/20 mx-px" />
                    <div className="w-2.5 h-full bg-warm-white/60 mx-px" />
                    <div className="w-[1px] h-full bg-warm-white/20 mx-px" />
                    <div className="w-[1px] h-full bg-warm-white/60 mx-px" />
                    <div className="w-1.5 h-full bg-warm-white/60 mx-px" />
                    <div className="w-1.5 h-full bg-warm-white/60 mx-px" />
                    <div className="w-[2px] h-full bg-warm-white/20 mx-px" />
                    <div className="w-2.5 h-full bg-warm-white/60 mx-px" />
                    <div className="w-[1px] h-full bg-warm-white/60 mx-px" />
                    <div className="w-1.5 h-full bg-warm-white/60 mx-px" />
                  </div>
                  <span className="text-[8px] font-mono tracking-[0.4em] text-warm-white/40 mt-2">
                    NZ-{Math.floor(10000 + Math.random() * 90000)}-2026
                  </span>
                </div>

                {/* Confirm buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handlePrint}
                    className="flex-1 py-3 text-xs uppercase tracking-widest border border-copper/30 hover:border-copper text-warm-white font-semibold rounded-sm transition-all flex items-center justify-center gap-2 cursor-none"
                  >
                    <Printer size={14} /> Print Scroll
                  </button>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', date: '', time: '19:00', guests: '2', seatingPreference: 'ac', notes: '' });
                      setSelectedTable(null);
                    }}
                    className="flex-1 py-3 text-xs uppercase tracking-widest bg-copper hover:bg-copper-light text-bg-dark font-semibold rounded-sm transition-all cursor-none"
                  >
                    Finish
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Reservation;
