import React, { useState } from 'react';
import { Save, X, Edit3 } from 'lucide-react';

// Medical History data model
export interface MedicalHistoryData {
  // Past Medical History
  pastHistory: {
    diabetes: boolean;
    hypertension: boolean;
    thyroid: boolean;
    migraine: boolean;
    cardiac: boolean;
    epilepsy: boolean;
    asthma: boolean;
    tb: boolean;
    bloodTransfusion: boolean;
    surgery: string;
    thromboembolism: boolean;
    psychiatricProblems: boolean;
  };
  
  // Family History
  familyHistory: {
    diabetes: boolean;
    hypertension: boolean;
    thyroid: boolean;
    stroke: boolean;
    tb: boolean;
    cancers: boolean;
    twins: boolean;
    mentallyChallenged: boolean;
  };
  
  // Personal Habits
  personalHabits: {
    smoking: boolean;
    alcohol: boolean;
    consanguinity: boolean;
    psychologicalStress: boolean;
  };
}

// Create empty medical history
const createEmptyMedicalHistory = (): MedicalHistoryData => ({
  pastHistory: {
    diabetes: false,
    hypertension: false,
    thyroid: false,
    migraine: false,
    cardiac: false,
    epilepsy: false,
    asthma: false,
    tb: false,
    bloodTransfusion: false,
    surgery: '',
    thromboembolism: false,
    psychiatricProblems: false,
  },
  familyHistory: {
    diabetes: false,
    hypertension: false,
    thyroid: false,
    stroke: false,
    tb: false,
    cancers: false,
    twins: false,
    mentallyChallenged: false,
  },
  personalHabits: {
    smoking: false,
    alcohol: false,
    consanguinity: false,
    psychologicalStress: false,
  },
});

interface MedicalHistoryFormProps {
  patientName: string;
  patientAge: number;
}

export const MedicalHistoryForm: React.FC<MedicalHistoryFormProps> = ({ patientName, patientAge }) => {
  const [data, setData] = useState<MedicalHistoryData>(createEmptyMedicalHistory());
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save to backend/storage
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const updateField = (section: keyof MedicalHistoryData, key: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  return (
    <div className="medical-history-form">
      {/* Header */}
      <div className="section-form-header">
        <div className="section-form-title">
          <h2>Medical History</h2>
          <span className="patient-info-badge">{patientName}, {patientAge}F</span>
        </div>
        <div className="section-form-actions">
          {isEditing ? (
            <>
              <button className="btn-secondary" onClick={handleCancel}>
                <X size={16} />
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSave}>
                <Save size={18} />
                Save
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              <Edit3 size={16} />
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="section-form-content">
        {/* Past Medical History */}
        <section className="form-section">
          <h3 className="form-section-title">Past Medical History</h3>
          <div className="form-section-body">
            <div className="form-checkboxes">
              {[
                { key: 'diabetes', label: 'Diabetes' },
                { key: 'hypertension', label: 'Hypertension' },
                { key: 'thyroid', label: 'Thyroid' },
                { key: 'migraine', label: 'Migraine' },
                { key: 'cardiac', label: 'Cardiac' },
                { key: 'epilepsy', label: 'Epilepsy' },
                { key: 'asthma', label: 'Asthma' },
                { key: 'tb', label: 'TB' },
                { key: 'bloodTransfusion', label: 'Blood Transfusion' },
                { key: 'thromboembolism', label: 'Thromboembolism' },
                { key: 'psychiatricProblems', label: 'Psychiatric Problems' },
              ].map(item => (
                <label key={item.key} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={(data.pastHistory as any)[item.key]}
                    onChange={(e) => updateField('pastHistory', item.key, e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
            <div className="form-grid" style={{ marginTop: '16px' }}>
              <div className="form-group wide">
                <label>Surgery (if any)</label>
                <input
                  type="text"
                  value={data.pastHistory.surgery}
                  onChange={(e) => updateField('pastHistory', 'surgery', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Describe any past surgeries"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Family History */}
        <section className="form-section">
          <h3 className="form-section-title">Family History</h3>
          <div className="form-section-body">
            <div className="form-checkboxes">
              {[
                { key: 'diabetes', label: 'Diabetes' },
                { key: 'hypertension', label: 'Hypertension' },
                { key: 'thyroid', label: 'Thyroid' },
                { key: 'stroke', label: 'Stroke' },
                { key: 'tb', label: 'TB' },
                { key: 'cancers', label: 'Cancers' },
                { key: 'twins', label: 'Twins' },
                { key: 'mentallyChallenged', label: 'Mentally Challenged' },
              ].map(item => (
                <label key={item.key} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={(data.familyHistory as any)[item.key]}
                    onChange={(e) => updateField('familyHistory', item.key, e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Habits */}
        <section className="form-section">
          <h3 className="form-section-title">Personal Habits</h3>
          <div className="form-section-body">
            <div className="form-checkboxes">
              {[
                { key: 'smoking', label: 'Smoking' },
                { key: 'alcohol', label: 'Alcohol' },
                { key: 'consanguinity', label: 'Consanguinity' },
                { key: 'psychologicalStress', label: 'Psychological Stress' },
              ].map(item => (
                <label key={item.key} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={(data.personalHabits as any)[item.key]}
                    onChange={(e) => updateField('personalHabits', item.key, e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MedicalHistoryForm;
