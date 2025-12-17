import React from 'react';
import {
  User,
  Phone,
  Droplets,
  Heart,
  Users,
  Briefcase,
  AlertTriangle,
  Pill,
  Edit3,
} from 'lucide-react';
import type { Patient } from '../types';

interface PatientDetailsPageProps {
  patient: Patient;
  onEditProfile: () => void;
}

export const PatientDetailsPage: React.FC<PatientDetailsPageProps> = ({ patient, onEditProfile }) => {
  const { profile, obstetricHistory, medicalHistory, familyHistory } = patient;


  return (
    <div className="patient-details-page">
      {/* Header */}
      <div className="pd-header">
        <h1>Patient Details</h1>
        <button className="btn-secondary" onClick={onEditProfile}>
          <Edit3 size={16} />
          Edit Profile
        </button>
      </div>

      <div className="pd-grid">
        {/* Demographics Card */}
        <div className="pd-card">
          <div className="pd-card-header">
            <User size={18} />
            <h3>Demographics</h3>
          </div>
          <div className="pd-card-body">
            <div className="pd-field">
              <span className="pd-label">Full Name</span>
              <span className="pd-value">{profile.name}</span>
            </div>
            <div className="pd-field">
              <span className="pd-label">Age</span>
              <span className="pd-value">{profile.age} years</span>
            </div>
            <div className="pd-field">
              <span className="pd-label">Date of Birth</span>
              <span className="pd-value">{profile.dob || 'Not provided'}</span>
            </div>
            <div className="pd-field">
              <span className="pd-label">UHID</span>
              <span className="pd-value mono">{profile.uhid}</span>
            </div>
            <div className="pd-field">
              <span className="pd-label">Occupation</span>
              <span className="pd-value">{profile.occupation || 'Not provided'}</span>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="pd-card">
          <div className="pd-card-header">
            <Phone size={18} />
            <h3>Contact Information</h3>
          </div>
          <div className="pd-card-body">
            <div className="pd-field">
              <span className="pd-label">Mobile</span>
              <span className="pd-value">{profile.mobile}</span>
            </div>
            <div className="pd-field">
              <span className="pd-label">Address</span>
              <span className="pd-value">{profile.address}</span>
            </div>
          </div>
        </div>

        {/* Blood Group & Allergies */}
        <div className="pd-card">
          <div className="pd-card-header">
            <Droplets size={18} />
            <h3>Blood & Allergies</h3>
          </div>
          <div className="pd-card-body">
            <div className="pd-field">
              <span className="pd-label">Blood Group</span>
              <span className="pd-value highlight">{profile.bloodGroup} {profile.rhStatus === 'Positive' ? '+ve' : '-ve'}</span>
            </div>
            {profile.rhStatus === 'Negative' && (
              <div className="pd-field">
                <span className="pd-label">Husband's Blood Group</span>
                <span className="pd-value">{profile.husbandBloodGroup || 'Not provided'}</span>
              </div>
            )}
            <div className="pd-field">
              <span className="pd-label">Allergies</span>
              <span className="pd-value">
                {profile.allergies.length > 0 ? (
                  <span className="warning">{profile.allergies.join(', ')}</span>
                ) : (
                  'None known'
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Spouse Information */}
        <div className="pd-card">
          <div className="pd-card-header">
            <Users size={18} />
            <h3>Spouse Information</h3>
          </div>
          <div className="pd-card-body">
            <div className="pd-field">
              <span className="pd-label">Spouse Name</span>
              <span className="pd-value">{profile.spouseName || 'Not provided'}</span>
            </div>
            <div className="pd-field">
              <span className="pd-label">Spouse Occupation</span>
              <span className="pd-value">{profile.spouseOccupation || 'Not provided'}</span>
            </div>
          </div>
        </div>

        {/* Obstetric Summary */}
        <div className="pd-card">
          <div className="pd-card-header">
            <Heart size={18} />
            <h3>Obstetric Summary</h3>
          </div>
          <div className="pd-card-body">
            <div className="pd-stats-row">
              <div className="pd-stat">
                <span className="pd-stat-value">{obstetricHistory.gravida}</span>
                <span className="pd-stat-label">Gravida</span>
              </div>
              <div className="pd-stat">
                <span className="pd-stat-value">{obstetricHistory.para}</span>
                <span className="pd-stat-label">Para</span>
              </div>
              <div className="pd-stat">
                <span className="pd-stat-value">{obstetricHistory.living}</span>
                <span className="pd-stat-label">Living</span>
              </div>
              <div className="pd-stat">
                <span className="pd-stat-value">{obstetricHistory.abortion}</span>
                <span className="pd-stat-label">Abortion</span>
              </div>
            </div>
            <div className="pd-field">
              <span className="pd-label">LMP</span>
              <span className="pd-value">{obstetricHistory.lmp}</span>
            </div>
            <div className="pd-field">
              <span className="pd-label">EDD</span>
              <span className="pd-value">{obstetricHistory.edd}</span>
            </div>
            <div className="pd-field">
              <span className="pd-label">Menstrual Cycle</span>
              <span className="pd-value">{obstetricHistory.menstrualCycle}</span>
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        {obstetricHistory.riskFactors.length > 0 && (
          <div className="pd-card danger">
            <div className="pd-card-header">
              <AlertTriangle size={18} />
              <h3>Risk Factors</h3>
            </div>
            <div className="pd-card-body">
              <div className="pd-tags">
                {obstetricHistory.riskFactors.map((risk, i) => (
                  <span key={i} className="pd-tag danger">{risk}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Medical History */}
        <div className="pd-card wide">
          <div className="pd-card-header">
            <Briefcase size={18} />
            <h3>Medical History</h3>
          </div>
          <div className="pd-card-body">
            <div className="pd-checkbox-grid">
              {Object.entries(medicalHistory).map(([key, value]) => (
                <div key={key} className={`pd-checkbox-item ${value ? 'checked' : ''}`}>
                  <span className="pd-checkbox-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="pd-checkbox-value">{typeof value === 'string' ? value : value ? 'Yes' : 'No'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Family History */}
        <div className="pd-card wide">
          <div className="pd-card-header">
            <Users size={18} />
            <h3>Family History</h3>
          </div>
          <div className="pd-card-body">
            <div className="pd-checkbox-grid">
              {Object.entries(familyHistory).map(([key, value]) => (
                <div key={key} className={`pd-checkbox-item ${value ? 'checked' : ''}`}>
                  <span className="pd-checkbox-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="pd-checkbox-value">{value ? 'Yes' : 'No'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Medications */}
        {patient.presentMedication && (
          <div className="pd-card">
            <div className="pd-card-header">
              <Pill size={18} />
              <h3>Current Medications</h3>
            </div>
            <div className="pd-card-body">
              <p className="pd-medication-text">{patient.presentMedication}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetailsPage;
