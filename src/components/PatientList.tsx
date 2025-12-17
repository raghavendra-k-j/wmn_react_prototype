import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  ChevronRight,
  AlertTriangle,
  Calendar,
  Phone,
  Droplets,
} from 'lucide-react';
import type { PatientListItem } from '../mockData';

interface PatientListProps {
  patients: PatientListItem[];
  onSelectPatient: (uhid: string) => void;
}

export const PatientList: React.FC<PatientListProps> = ({ patients, onSelectPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Delivered' | 'Closed'>('All');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.uhid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mobile.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'risk-high';
      case 'Medium':
        return 'risk-medium';
      default:
        return 'risk-low';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Delivered':
        return 'status-delivered';
      default:
        return 'status-closed';
    }
  };

  return (
    <div className="patient-list-page">
      {/* Header */}
      <div className="patient-list-header">
        <div className="header-title">
          <h1>All Patients</h1>
          <span className="patient-count">{patients.length} patients</span>
        </div>
        <button className="btn-primary">
          <Plus size={18} /> New Patient
        </button>
      </div>

      {/* Search & Filters */}
      <div className="patient-list-filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name, UHID, or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          {(['All', 'Active', 'Delivered', 'Closed'] as const).map((status) => (
            <button
              key={status}
              className={`filter-tab ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
              {status !== 'All' && (
                <span className="filter-count">
                  {patients.filter((p) => p.status === status).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Cards */}
      <div className="patient-cards-grid">
        {filteredPatients.map((patient) => (
          <div
            key={patient.uhid}
            className="patient-card-item"
            onClick={() => onSelectPatient(patient.uhid)}
          >
            {/* Card Header */}
            <div className="card-header">
              <div className="patient-avatar-card">
                {patient.name.charAt(0)}
              </div>
              <div className="patient-basic">
                <h3>{patient.name}</h3>
                <span className="uhid-small">{patient.uhid}</span>
              </div>
              <div className="card-badges">
                <span className={`badge-small ${getRiskBadgeClass(patient.riskLevel)}`}>
                  {patient.riskLevel === 'High' && <AlertTriangle size={12} />}
                  {patient.riskLevel}
                </span>
                <span className={`badge-small ${getStatusBadgeClass(patient.status)}`}>
                  {patient.status}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="card-body">
              <div className="card-info-row">
                <span className="info-label">Age</span>
                <span className="info-value">{patient.age} yrs</span>
              </div>
              <div className="card-info-row">
                <span className="info-label">Blood</span>
                <span className="info-value">
                  <Droplets size={12} /> {patient.bloodGroup}{patient.rhStatus === 'Positive' ? '+' : '-'}
                </span>
              </div>
              {patient.weeksPregnant && (
                <div className="card-info-row">
                  <span className="info-label">Weeks</span>
                  <span className="info-value highlight">{patient.weeksPregnant} wks</span>
                </div>
              )}
              {patient.edd && (
                <div className="card-info-row">
                  <span className="info-label">EDD</span>
                  <span className="info-value">
                    {new Date(patient.edd).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="card-footer">
              {patient.nextVisit ? (
                <div className="next-visit">
                  <Calendar size={14} />
                  <span>Next: {new Date(patient.nextVisit).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                </div>
              ) : (
                <div className="next-visit muted">No upcoming visit</div>
              )}
              <ChevronRight size={18} className="card-arrow" />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="empty-state">
          <p>No patients found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
