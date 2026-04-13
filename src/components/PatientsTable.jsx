import React, { useState } from 'react';
import { Eye, Edit, Trash2, CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const mockPatients = [
  { id: '1', name: 'Alice Walker', email: 'alice.w@example.com', center: 'New York City', kycStatus: 'Completed', date: '2023-10-15' },
  { id: '2', name: 'Robert Fox', email: 'robert.fox@example.com', center: 'Los Angeles', kycStatus: 'Pending', date: '2023-10-18' },
  { id: '3', name: 'Esther Howard', email: 'esther.h@example.com', center: 'Chicago', kycStatus: 'Completed', date: '2023-10-20' },
  { id: '4', name: 'Jenny Wilson', email: 'jenny.w@example.com', center: 'Houston', kycStatus: 'Pending', date: '2023-10-22' },
  { id: '5', name: 'Guy Hawkins', email: 'guy.h@example.com', center: 'Phoenix', kycStatus: 'Completed', date: '2023-10-25' },
  { id: '6', name: 'Jacob Jones', email: 'jacob.j@example.com', center: 'Philadelphia', kycStatus: 'Completed', date: '2023-10-28' },
  { id: '7', name: 'Courtney Henry', email: 'courtney.h@example.com', center: 'San Antonio', kycStatus: 'Pending', date: '2023-10-30' },
  { id: '8', name: 'Kathryn Murphy', email: 'kathryn.m@example.com', center: 'San Diego', kycStatus: 'Completed', date: '2023-11-02' },
  { id: '9', name: 'Darrell Steward', email: 'darrell.s@example.com', center: 'Dallas', kycStatus: 'Pending', date: '2023-11-05' },
  { id: '10', name: 'Floyd Miles', email: 'floyd.m@example.com', center: 'San Jose', kycStatus: 'Completed', date: '2023-11-08' },
  { id: '11', name: 'Ronald Richards', email: 'ronald.r@example.com', center: 'Austin', kycStatus: 'Completed', date: '2023-11-10' },
  { id: '12', name: 'Arlene McCoy', email: 'arlene.m@example.com', center: 'Jacksonville', kycStatus: 'Pending', date: '2023-11-12' },
];

export default function PatientsTable({ searchTerm, kycFilter, dateFilter }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filter logic
  let filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKyc = kycFilter === 'All' || patient.kycStatus === kycFilter;
    const matchesDate = !dateFilter || patient.date >= dateFilter; // Basic date filter
    return matchesSearch && matchesKyc && matchesDate;
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Completed') {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
          <CheckCircle className="w-3.5 h-3.5" />
          Completed
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
        <AlertCircle className="w-3.5 h-3.5" />
        Pending
      </span>
    );
  };

  return (
    <div className="glass-card flex flex-col w-full animate-fade-in overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 dark:border-white/5">
              <th className="py-4 px-6 text-sm font-semibold text-text-secondary">Name</th>
              <th className="py-4 px-6 text-sm font-semibold text-text-secondary">Email</th>
              <th className="py-4 px-6 text-sm font-semibold text-text-secondary">Center</th>
              <th className="py-4 px-6 text-sm font-semibold text-text-secondary">KYC Status</th>
              <th className="py-4 px-6 text-sm font-semibold text-text-secondary">Created Date</th>
              <th className="py-4 px-6 text-sm font-semibold text-text-secondary text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.length > 0 ? (
              currentPatients.map((patient, index) => (
                <tr 
                  key={patient.id} 
                  className={`border-b border-white/5 dark:border-white/5 hover:bg-white/5 transition-colors ${index === currentPatients.length - 1 ? 'border-b-0' : ''}`}
                >
                  <td className="py-4 px-6 text-sm font-medium text-text-primary whitespace-nowrap">{patient.name}</td>
                  <td className="py-4 px-6 text-sm text-text-secondary whitespace-nowrap">{patient.email}</td>
                  <td className="py-4 px-6 text-sm text-text-secondary whitespace-nowrap">{patient.center}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {getStatusBadge(patient.kycStatus)}
                  </td>
                  <td className="py-4 px-6 text-sm text-text-secondary whitespace-nowrap">{patient.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-3">
                      <button className="p-1.5 text-text-secondary hover:text-medicore-primary hover:bg-medicore-primary/10 rounded-lg transition-colors" title="View Patient">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-text-secondary hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors" title="Edit Patient">
                        <Edit className="w-4 h-4" />
                      </button>
                      {patient.kycStatus === 'Pending' && (
                        <button className="p-1.5 text-text-secondary hover:text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors" title="Verify KYC">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1.5 text-text-secondary hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors" title="Delete Patient">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-text-secondary text-sm">
                  No patients found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 dark:border-white/5 bg-white/5">
          <p className="text-sm text-text-secondary">
            Showing <span className="font-semibold text-text-primary">{startIndex + 1}</span> to <span className="font-semibold text-text-primary">{Math.min(startIndex + itemsPerPage, filteredPatients.length)}</span> of <span className="font-semibold text-text-primary">{filteredPatients.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-white/10 dark:border-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1 text-sm font-medium text-text-secondary">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-medicore-primary text-white' 
                      : 'hover:bg-white/10 hover:text-text-primary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-white/10 dark:border-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
