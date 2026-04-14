import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2, CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchPatients } from '../services/api';

export default function PatientsTable({ searchTerm, kycFilter, dateFilter }) {
  const navigate = useNavigate();
  const [allPatients, setAllPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Fetch patients from the API whenever filters change
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchPatients({ search: searchTerm, kycStatus: kycFilter, date: dateFilter })
      .then((data) => {
        if (isMounted) setAllPatients(data);
      })
      .catch((err) => {
        console.error('Failed to load patients:', err);
        if (isMounted) setAllPatients([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [searchTerm, kycFilter, dateFilter]);

  // Reset to page 1 when filters change
  useEffect(() => { setCurrentPage(1); }, [searchTerm, kycFilter, dateFilter]);

  const totalPages = Math.ceil(allPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPatients = allPatients.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
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

  if (loading) {
    return (
      <div className="glass-card flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-medicore-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
                      <button 
                        onClick={() => navigate(`/patients/${patient.id}`)}
                        className="p-1.5 text-text-secondary hover:text-medicore-primary hover:bg-medicore-primary/10 rounded-lg transition-colors" 
                        title="View Patient"
                      >
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
            Showing <span className="font-semibold text-text-primary">{startIndex + 1}</span> to <span className="font-semibold text-text-primary">{Math.min(startIndex + itemsPerPage, allPatients.length)}</span> of <span className="font-semibold text-text-primary">{allPatients.length}</span> results
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
