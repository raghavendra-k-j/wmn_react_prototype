import React, { useState } from 'react';
import { Save, X, Edit3, Plus, Trash2 } from 'lucide-react';

// Past Obstetric History Entry
export interface ObstetricHistoryEntry {
  id: string;
  pregnancyNumber: number;
  year: string;
  antenatalCourse: string;
  modeOfDelivery: string;
  sexOfBaby: string;
  birthWeight: string;
  remarks: string;
}

// Obstetric History data model
export interface ObstetricHistoryData {
  entries: ObstetricHistoryEntry[];
}

// Create empty entry
const createEmptyEntry = (pregnancyNumber: number): ObstetricHistoryEntry => ({
  id: `ob-${Date.now()}`,
  pregnancyNumber,
  year: '',
  antenatalCourse: '',
  modeOfDelivery: '',
  sexOfBaby: '',
  birthWeight: '',
  remarks: '',
});

interface ObstetricHistoryFormProps {
  patientName: string;
  patientAge: number;
}

export const ObstetricHistoryForm: React.FC<ObstetricHistoryFormProps> = ({ patientName, patientAge }) => {
  const [entries, setEntries] = useState<ObstetricHistoryEntry[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save to backend/storage
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const addEntry = () => {
    setEntries(prev => [...prev, createEmptyEntry(prev.length + 1)]);
  };

  const removeEntry = (id: string) => {
    setEntries(prev => {
      const filtered = prev.filter(e => e.id !== id);
      // Renumber pregnancies
      return filtered.map((e, idx) => ({ ...e, pregnancyNumber: idx + 1 }));
    });
  };

  const updateEntry = (id: string, field: keyof ObstetricHistoryEntry, value: string) => {
    setEntries(prev => prev.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  return (
    <div className="obstetric-history-form">
      {/* Header */}
      <div className="section-form-header">
        <div className="section-form-title">
          <h2>Obstetric History</h2>
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
        <section className="form-section">
          <div className="form-section-header-row">
            <h3 className="form-section-title">Past Obstetric History</h3>
            {isEditing && (
              <button className="btn-primary btn-sm" onClick={addEntry}>
                <Plus size={16} />
                Add Pregnancy
              </button>
            )}
          </div>
          
          {entries.length === 0 ? (
            <div className="empty-state-box">
              <p>No past obstetric history recorded.</p>
              <p className="empty-state-hint">Record previous pregnancies including outcomes and complications.</p>
              {isEditing && (
                <button className="btn-primary" onClick={addEntry} style={{ marginTop: '16px' }}>
                  <Plus size={16} />
                  Add First Pregnancy
                </button>
              )}
            </div>
          ) : (
            <div className="ob-history-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Year</th>
                    <th>Antenatal Course</th>
                    <th>Mode of Delivery</th>
                    <th>Sex of Baby</th>
                    <th>Birth Weight</th>
                    <th>Remarks</th>
                    {isEditing && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.pregnancyNumber}</td>
                      <td>
                        <input
                          type="text"
                          value={entry.year}
                          onChange={(e) => updateEntry(entry.id, 'year', e.target.value)}
                          disabled={!isEditing}
                          placeholder="YYYY"
                          className="table-input"
                        />
                      </td>
                      <td>
                        <select
                          value={entry.antenatalCourse}
                          onChange={(e) => updateEntry(entry.id, 'antenatalCourse', e.target.value)}
                          disabled={!isEditing}
                          className="table-input"
                        >
                          <option value="">Select</option>
                          <option value="Uneventful">Uneventful</option>
                          <option value="Complicated">Complicated</option>
                          <option value="GDM">GDM</option>
                          <option value="PIH">PIH</option>
                          <option value="Preterm">Preterm</option>
                        </select>
                      </td>
                      <td>
                        <select
                          value={entry.modeOfDelivery}
                          onChange={(e) => updateEntry(entry.id, 'modeOfDelivery', e.target.value)}
                          disabled={!isEditing}
                          className="table-input"
                        >
                          <option value="">Select</option>
                          <option value="FTND">FTND</option>
                          <option value="LSCS">LSCS</option>
                          <option value="Vacuum">Vacuum</option>
                          <option value="Forceps">Forceps</option>
                          <option value="Abortion">Abortion</option>
                          <option value="Ectopic">Ectopic</option>
                        </select>
                      </td>
                      <td>
                        <select
                          value={entry.sexOfBaby}
                          onChange={(e) => updateEntry(entry.id, 'sexOfBaby', e.target.value)}
                          disabled={!isEditing}
                          className="table-input"
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="N/A">N/A</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={entry.birthWeight}
                          onChange={(e) => updateEntry(entry.id, 'birthWeight', e.target.value)}
                          disabled={!isEditing}
                          placeholder="e.g., 3.2 kg"
                          className="table-input"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={entry.remarks}
                          onChange={(e) => updateEntry(entry.id, 'remarks', e.target.value)}
                          disabled={!isEditing}
                          placeholder="Notes..."
                          className="table-input"
                        />
                      </td>
                      {isEditing && (
                        <td>
                          <button
                            className="btn-icon-danger"
                            onClick={() => removeEntry(entry.id)}
                            title="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ObstetricHistoryForm;
