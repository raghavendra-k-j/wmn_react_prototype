import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Edit3,
  Phone,
  MapPin,
  Droplets,
  AlertTriangle,
  Baby,
  Heart,
  User,
  FileText,
  ClipboardList,
  History,
} from 'lucide-react';
import type { Patient } from '../../types';

// Section types - Medical History and Obstetric History are main sidebar items
export type SectionType = 'details' | 'anc' | 'medical-history' | 'ob-history' | 'gynecology';

interface PatientSidebarV2Props {
  patient: Patient;
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  onEditProfile: () => void;
}

export const PatientSidebarV2: React.FC<PatientSidebarV2Props> = ({
  patient,
  activeSection,
  onSectionChange,
  onEditProfile,
}) => {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const { profile, obstetricHistory } = patient;

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const hasRisks = obstetricHistory.riskFactors.length > 0;

  // Menu items for navigation - Medical History and OB History are now main items
  const menuItems = [
    { id: 'details', label: 'Patient Details', icon: User },
    { id: 'anc', label: 'ANC Visits', icon: Baby, count: patient.visits.filter(v => v.template === 'ANC').length },
    { id: 'medical-history', label: 'Medical History', icon: ClipboardList },
    { id: 'ob-history', label: 'Obstetric History', icon: History },
    { id: 'gynecology', label: 'Gynecology', icon: Heart },
  ];


  return (
    <aside className="patient-sidebar-v2">
      {/* Patient Header - Primary Info */}
      <div className="psv2-header">
        <div className="psv2-avatar">{getInitials(profile.name)}</div>
        <div className="psv2-primary-info">
          <h2>{profile.name}</h2>
          <div className="psv2-meta">
            <span className="psv2-badge">{profile.age}F</span>
            <span className="psv2-badge blood">
              <Droplets size={12} />
              {profile.bloodGroup}{profile.rhStatus === 'Positive' ? '+' : '-'}
            </span>
          </div>
          <span className="psv2-uhid">{profile.uhid}</span>
        </div>
        <button className="psv2-edit-btn" onClick={onEditProfile} title="Edit Profile">
          <Edit3 size={16} />
        </button>
      </div>

      {/* Quick Contact */}
      <div className="psv2-contact">
        <div className="psv2-contact-item">
          <Phone size={14} />
          <span>{profile.mobile}</span>
        </div>
        <div className="psv2-contact-item">
          <MapPin size={14} />
          <span>{profile.address}</span>
        </div>
      </div>

      {/* Risk Alert - Always Visible if Present */}
      {hasRisks && (
        <div className="psv2-alert">
          <div className="psv2-alert-header">
            <AlertTriangle size={14} />
            <span>High Risk</span>
          </div>
          <div className="psv2-alert-tags">
            {obstetricHistory.riskFactors.map((r, i) => (
              <span key={i} className="psv2-risk-tag">{r}</span>
            ))}
          </div>
        </div>
      )}

      {/* Current Pregnancy Quick View */}
      <div className="psv2-pregnancy-summary">
        <div className="psv2-stat">
          <span className="psv2-stat-label">GPLA</span>
          <span className="psv2-stat-value">
            G{obstetricHistory.gravida} P{obstetricHistory.para} L{obstetricHistory.living} A{obstetricHistory.abortion}
          </span>
        </div>
        <div className="psv2-stat">
          <span className="psv2-stat-label">EDD</span>
          <span className="psv2-stat-value">
            {new Date(obstetricHistory.edd).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
          </span>
        </div>
      </div>

      {/* Show More Details Accordion */}
      <div className="psv2-accordion">
        <button
          className={`psv2-accordion-toggle ${showMoreDetails ? 'open' : ''}`}
          onClick={() => setShowMoreDetails(!showMoreDetails)}
        >
          <span>More Details</span>
          {showMoreDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {showMoreDetails && (
          <div className="psv2-accordion-content">
            {/* Spouse Info */}
            {profile.spouseName && (
              <div className="psv2-detail-row">
                <span className="psv2-detail-label">Spouse</span>
                <span className="psv2-detail-value">{profile.spouseName}</span>
              </div>
            )}
            
            {/* LMP */}
            <div className="psv2-detail-row">
              <span className="psv2-detail-label">LMP</span>
              <span className="psv2-detail-value">{obstetricHistory.lmp}</span>
            </div>
            
            {/* Cycle */}
            <div className="psv2-detail-row">
              <span className="psv2-detail-label">Cycle</span>
              <span className="psv2-detail-value">{obstetricHistory.menstrualCycle}</span>
            </div>

            {/* Allergies */}
            {profile.allergies.length > 0 && (
              <div className="psv2-detail-row">
                <span className="psv2-detail-label">Allergies</span>
                <span className="psv2-detail-value warning">{profile.allergies.join(', ')}</span>
              </div>
            )}

            {/* Medications */}
            {patient.presentMedication && (
              <div className="psv2-detail-row">
                <span className="psv2-detail-label">Current Meds</span>
                <span className="psv2-detail-value">{patient.presentMedication}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="psv2-menu">
        <div className="psv2-menu-label">Patient Records</div>
        <nav className="psv2-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`psv2-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onSectionChange(item.id as SectionType)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="psv2-nav-count">{item.count}</span>
              )}
              <ChevronRight size={16} className="psv2-nav-arrow" />
            </button>
          ))}
        </nav>
      </div>

      {/* View Full History Link */}
      <div className="psv2-footer">
        <button className="psv2-full-history-btn">
          <FileText size={16} />
          <span>View Full History</span>
        </button>
      </div>
    </aside>
  );
};

export default PatientSidebarV2;
