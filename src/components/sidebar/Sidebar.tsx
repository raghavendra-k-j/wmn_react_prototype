import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  AlertTriangle,
  Baby,
  Heart,
  Users,
  Pill,
  X,
  FileText,
  User,
  Phone,
  MapPin,
  Droplets,
  ClipboardList,
  Activity,
} from 'lucide-react';
import type { ObstetricHistory, PastObstetricEntry, Patient, PatientProfile } from '../../types';

interface SidebarProps {
  patient: Patient;
  isCollapsed: boolean;
  onToggle: () => void;
  onEditProfile: () => void;
  onViewObHistory: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  patient,
  isCollapsed,
  onToggle,
  onEditProfile,
  onViewObHistory,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('quick-info');
  const { profile, obstetricHistory, medicalHistory, familyHistory, presentMedication } = patient;
  const riskFactors = obstetricHistory.riskFactors;

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const formatGPLA = (ob: ObstetricHistory) =>
    `G${ob.gravida} P${ob.para} L${ob.living} A${ob.abortion}`;

  const hasRisks = riskFactors.length > 0;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Action items for the sidebar
  const actionItems = [
    { id: 'ob-history', label: 'Obstetric History', icon: Baby, onClick: onViewObHistory },
    { id: 'medical-history', label: 'Medical History', icon: Heart, onClick: () => toggleSection('medical-hx') },
    { id: 'family-history', label: 'Family History', icon: Users, onClick: () => toggleSection('family-hx') },
    { id: 'personal-history', label: 'Personal History', icon: User, onClick: () => toggleSection('personal-hx') },
    { id: 'medications', label: 'Current Medications', icon: Pill, onClick: () => toggleSection('medications') },
    { id: 'lab-reports', label: 'Lab Reports', icon: Activity, onClick: () => {} },
    { id: 'discharge', label: 'Discharge Summary', icon: FileText, onClick: () => {} },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Toggle Button */}
      <button className="sidebar-toggle" onClick={onToggle} title={isCollapsed ? 'Expand' : 'Collapse'}>
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {isCollapsed ? (
        /* Collapsed View */
        <div className="sidebar-collapsed-content">
          <div className="avatar-small" title={profile.name}>
            {getInitials(profile.name)}
          </div>
          {hasRisks && (
            <div className="risk-indicator" title={riskFactors.join(', ')}>
              <AlertTriangle size={18} />
            </div>
          )}
        </div>
      ) : (
        /* Expanded View */
        <div className="sidebar-content">
          {/* Patient Header Card */}
          <div className="patient-card">
            <div className="patient-card-header">
              <div className="patient-avatar-lg">{getInitials(profile.name)}</div>
              <div className="patient-primary-info">
                <h2>{profile.name}</h2>
                <div className="patient-badges">
                  <span className="badge badge-info">{profile.age}F</span>
                  <span className="badge badge-blood">
                    <Droplets size={12} /> {profile.bloodGroup}{profile.rhStatus === 'Positive' ? '+' : '-'}
                  </span>
                </div>
                <span className="uhid-tag">UHID: {profile.uhid}</span>
              </div>
              <button className="edit-profile-btn" onClick={onEditProfile} title="Edit Profile">
                <Edit3 size={16} />
              </button>
            </div>

            {/* Quick Contact Info */}
            <div className="patient-contact">
              <div className="contact-item">
                <Phone size={14} />
                <span>{profile.mobile}</span>
              </div>
              <div className="contact-item">
                <MapPin size={14} />
                <span>{profile.address}</span>
              </div>
            </div>

            {/* Spouse Info */}
            {profile.spouseName && (
              <div className="spouse-info">
                <span className="spouse-label">W/O</span>
                <span className="spouse-name">{profile.spouseName}</span>
                {profile.spouseOccupation && <span className="spouse-occ">({profile.spouseOccupation})</span>}
              </div>
            )}
          </div>

          {/* Risk Alerts - Always Visible */}
          {hasRisks && (
            <div className="alert-card alert-danger">
              <div className="alert-header">
                <AlertTriangle size={16} />
                <span>High Risk Factors</span>
              </div>
              <div className="alert-tags">
                {riskFactors.map((r, i) => (
                  <span key={i} className="alert-tag">{r}</span>
                ))}
              </div>
            </div>
          )}

          {/* Allergies Alert */}
          {profile.allergies.length > 0 && (
            <div className="alert-card alert-warning">
              <div className="alert-header">
                <AlertTriangle size={16} />
                <span>Allergies</span>
              </div>
              <div className="alert-tags">
                {profile.allergies.map((a, i) => (
                  <span key={i} className="alert-tag">{a}</span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Obstetric Summary */}
          <div className="quick-summary-card">
            <div className="summary-header">
              <Baby size={16} />
              <span>Current Pregnancy</span>
            </div>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">GPLA</span>
                <span className="summary-value">{formatGPLA(obstetricHistory)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">LMP</span>
                <span className="summary-value">{new Date(obstetricHistory.lmp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">EDD</span>
                <span className="summary-value">{new Date(obstetricHistory.edd).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Cycle</span>
                <span className="summary-value">{obstetricHistory.menstrualCycle}</span>
              </div>
            </div>
          </div>

          {/* Actions List */}
          <div className="actions-section">
            <div className="actions-header">
              <ClipboardList size={14} />
              <span>Patient Records</span>
            </div>
            <div className="actions-list">
              {actionItems.map((action) => (
                <button
                  key={action.id}
                  className={`action-item ${expandedSection === action.id.replace('-history', '-hx') ? 'active' : ''}`}
                  onClick={action.onClick}
                >
                  <action.icon size={16} />
                  <span>{action.label}</span>
                  <ChevronRight size={14} className="action-arrow" />
                </button>
              ))}
            </div>
          </div>

          {/* Expandable Medical History */}
          {expandedSection === 'medical-hx' && (
            <div className="expandable-section">
              <div className="expandable-header">
                <span>Medical History</span>
                <button onClick={() => setExpandedSection(null)}><X size={14} /></button>
              </div>
              <div className="history-list-expanded">
                {Object.entries(medicalHistory)
                  .filter(([, v]) => v === true || (typeof v === 'string' && v))
                  .map(([k, v]) => (
                    <div key={k} className="history-entry">
                      <span className="history-key">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                      {typeof v === 'string' && <span className="history-val">{v}</span>}
                    </div>
                  ))}
                {Object.values(medicalHistory).every((v) => !v) && (
                  <div className="history-nil">No significant medical history</div>
                )}
              </div>
            </div>
          )}

          {/* Expandable Family History */}
          {expandedSection === 'family-hx' && (
            <div className="expandable-section">
              <div className="expandable-header">
                <span>Family History</span>
                <button onClick={() => setExpandedSection(null)}><X size={14} /></button>
              </div>
              <div className="history-list-expanded">
                {Object.entries(familyHistory)
                  .filter(([, v]) => v === true)
                  .map(([k]) => (
                    <div key={k} className="history-entry">
                      <span className="history-key">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                  ))}
                {Object.values(familyHistory).every((v) => !v) && (
                  <div className="history-nil">No significant family history</div>
                )}
              </div>
            </div>
          )}

          {/* Expandable Medications */}
          {expandedSection === 'medications' && (
            <div className="expandable-section">
              <div className="expandable-header">
                <span>Current Medications</span>
                <button onClick={() => setExpandedSection(null)}><X size={14} /></button>
              </div>
              <div className="medications-content">
                {presentMedication ? (
                  <p>{presentMedication}</p>
                ) : (
                  <div className="history-nil">No current medications</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

/* --- Edit Profile Modal --- */
interface EditProfileModalProps {
  profile: PatientProfile;
  onClose: () => void;
  onSave: (updated: PatientProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ profile, onClose, onSave }) => {
  const [form, setForm] = useState<PatientProfile>({ ...profile });

  const handleChange = (field: keyof PatientProfile, value: string | string[] | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Patient Profile</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-grid modal-form">
            <div className="label-input">
              <label>Name</label>
              <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div className="label-input">
              <label>Age</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="label-input">
              <label>DOB</label>
              <input type="date" value={form.dob ?? ''} onChange={(e) => handleChange('dob', e.target.value)} />
            </div>
            <div className="label-input">
              <label>Occupation</label>
              <input value={form.occupation ?? ''} onChange={(e) => handleChange('occupation', e.target.value)} />
            </div>
            <div className="label-input">
              <label>Spouse Name (W/O)</label>
              <input value={form.spouseName ?? ''} onChange={(e) => handleChange('spouseName', e.target.value)} />
            </div>
            <div className="label-input">
              <label>Spouse Occupation</label>
              <input value={form.spouseOccupation ?? ''} onChange={(e) => handleChange('spouseOccupation', e.target.value)} />
            </div>
            <div className="label-input full-width">
              <label>Address</label>
              <input value={form.address} onChange={(e) => handleChange('address', e.target.value)} />
            </div>
            <div className="label-input">
              <label>Mobile No.</label>
              <input value={form.mobile} onChange={(e) => handleChange('mobile', e.target.value)} />
            </div>
            <div className="label-input">
              <label>UHID</label>
              <input value={form.uhid} disabled />
            </div>
            <div className="label-input">
              <label>Blood Group</label>
              <input value={form.bloodGroup} onChange={(e) => handleChange('bloodGroup', e.target.value)} />
            </div>
            <div className="label-input">
              <label>Rh Status</label>
              <select
                value={form.rhStatus}
                onChange={(e) => handleChange('rhStatus', e.target.value)}
              >
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
              </select>
            </div>
            <div className="label-input full-width">
              <label>Allergies (comma separated)</label>
              <input
                value={form.allergies.join(', ')}
                onChange={(e) =>
                  handleChange(
                    'allergies',
                    e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={() => onSave(form)}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- OB History Modal --- */
interface OBHistoryModalProps {
  obstetricHistory: ObstetricHistory;
  pastObstetricHistory: PastObstetricEntry[];
  onClose: () => void;
}

export const OBHistoryModal: React.FC<OBHistoryModalProps> = ({
  obstetricHistory,
  pastObstetricHistory,
  onClose,
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Obstetric History</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="ob-summary">
            <div className="ob-stat">
              <span className="stat-label">Gravida</span>
              <span className="stat-value">{obstetricHistory.gravida}</span>
            </div>
            <div className="ob-stat">
              <span className="stat-label">Para</span>
              <span className="stat-value">{obstetricHistory.para}</span>
            </div>
            <div className="ob-stat">
              <span className="stat-label">Living</span>
              <span className="stat-value">{obstetricHistory.living}</span>
            </div>
            <div className="ob-stat">
              <span className="stat-label">Abortion</span>
              <span className="stat-value">{obstetricHistory.abortion}</span>
            </div>
          </div>

          <div className="ob-details-grid">
            <div className="ob-detail-item">
              <span className="detail-label">LMP</span>
              <span className="detail-value">{obstetricHistory.lmp}</span>
            </div>
            <div className="ob-detail-item">
              <span className="detail-label">EDD</span>
              <span className="detail-value">{obstetricHistory.edd}</span>
            </div>
            <div className="ob-detail-item">
              <span className="detail-label">Scan EDD</span>
              <span className="detail-value">{obstetricHistory.scanEdd || '—'}</span>
            </div>
            <div className="ob-detail-item">
              <span className="detail-label">Menstrual Cycle</span>
              <span className="detail-value">{obstetricHistory.menstrualCycle}</span>
            </div>
            <div className="ob-detail-item">
              <span className="detail-label">Married Life</span>
              <span className="detail-value">{obstetricHistory.marriedLife || '—'}</span>
            </div>
            <div className="ob-detail-item">
              <span className="detail-label">Pap Smear</span>
              <span className="detail-value">{obstetricHistory.papSmear}</span>
            </div>
          </div>

          <h3>Past Pregnancies</h3>
          <table className="ob-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Year</th>
                <th>Antenatal</th>
                <th>Mode of Delivery</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {pastObstetricHistory.map((entry) => (
                <tr key={entry.no}>
                  <td>{entry.no}</td>
                  <td>{entry.year}</td>
                  <td>{entry.antenatal}</td>
                  <td>{entry.deliveryMode}</td>
                  <td>{entry.remarks || '—'}</td>
                </tr>
              ))}
              {pastObstetricHistory.length === 0 && (
                <tr>
                  <td colSpan={5} className="no-data">No past obstetric history</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
