import React, { useState } from 'react';
import { Plus, Save, Calendar, ChevronLeft, X } from 'lucide-react';

// Gynecology Visit Type - matching gynae.md exactly
export interface GyneVisit {
  id: string;
  date: string;
  
  // Page 1: Gynaecology Record
  // Patient Info (from profile, read-only display)
  name: string;
  age: number;
  
  // Menstrual & Reproductive
  lmp: string;
  para: string;
  contraception: string;
  previousSmear: string;
  menstrualCycles: string;
  
  // Presenting Complaints
  presentingComplaints: string;
  micturition: string;
  bowels: string;
  
  // Past Medical History
  pastMedicalHistory: {
    diabetes: boolean;
    hypertension: boolean;
    thyroidDysfunction: boolean;
    migraine: boolean;
    cardiac: boolean;
    epilepsy: boolean;
    asthma: boolean;
    tb: boolean;
    bloodTransfusion: boolean;
    surgery: string;
    thromboembolism: boolean;
  };
  
  // Family History
  familyHistory: {
    diabetes: boolean;
    hypertension: boolean;
    thyroidDysfunction: boolean;
    tb: boolean;
    cancers: string;
    ihdCva: boolean;
    thromboembolism: boolean;
    psychiatricProblems: boolean;
  };
  
  // Personal History
  personalHistory: {
    allergies: string;
    smoking: boolean;
    alcohol: boolean;
    psychStress: boolean;
  };
  
  // Page 2: Examination & Advice
  medications: string;
  
  // Physical Examination
  physicalExam: {
    height: number;
    weight: number;
    bmi: number;
    pallor: boolean;
    goiter: boolean;
    pulse: number;
    bpSystolic: number;
    bpDiastolic: number;
    cvs: string;
    breasts: string;
    rs: string;
    perAbdomen: string;
  };
  
  // Vaginal Examination (VE)
  vaginalExam: {
    vulvaVagina: string;
    cervix: string;
    uterus: string;
    adnexa: string;
  };
  
  // Impression & Advice
  impression: string;
  advice: string;
  doctorSignature: string;
}

// Empty visit template
const createEmptyVisit = (): Omit<GyneVisit, 'id' | 'date' | 'name' | 'age'> => ({
  lmp: '',
  para: '',
  contraception: '',
  previousSmear: '',
  menstrualCycles: '',
  presentingComplaints: '',
  micturition: '',
  bowels: '',
  pastMedicalHistory: {
    diabetes: false,
    hypertension: false,
    thyroidDysfunction: false,
    migraine: false,
    cardiac: false,
    epilepsy: false,
    asthma: false,
    tb: false,
    bloodTransfusion: false,
    surgery: '',
    thromboembolism: false,
  },
  familyHistory: {
    diabetes: false,
    hypertension: false,
    thyroidDysfunction: false,
    tb: false,
    cancers: '',
    ihdCva: false,
    thromboembolism: false,
    psychiatricProblems: false,
  },
  personalHistory: {
    allergies: '',
    smoking: false,
    alcohol: false,
    psychStress: false,
  },
  medications: '',
  physicalExam: {
    height: 0,
    weight: 0,
    bmi: 0,
    pallor: false,
    goiter: false,
    pulse: 0,
    bpSystolic: 0,
    bpDiastolic: 0,
    cvs: '',
    breasts: '',
    rs: '',
    perAbdomen: '',
  },
  vaginalExam: {
    vulvaVagina: '',
    cervix: '',
    uterus: '',
    adnexa: '',
  },
  impression: '',
  advice: '',
  doctorSignature: '',
});

interface GynecologyFormProps {
  patientName: string;
  patientAge: number;
}

export const GynecologyForm: React.FC<GynecologyFormProps> = ({ patientName, patientAge }) => {
  const [visits, setVisits] = useState<GyneVisit[]>([]);
  const [currentVisit, setCurrentVisit] = useState<GyneVisit | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleNewVisit = () => {
    const newVisit: GyneVisit = {
      id: `gyne-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      name: patientName,
      age: patientAge,
      ...createEmptyVisit(),
    };
    setCurrentVisit(newVisit);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!currentVisit) return;
    setVisits(prev => {
      const exists = prev.find(v => v.id === currentVisit.id);
      if (exists) {
        return prev.map(v => v.id === currentVisit.id ? currentVisit : v);
      }
      return [...prev, currentVisit];
    });
    setIsEditing(false);
    setCurrentVisit(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentVisit(null);
  };

  const updateField = (path: string, value: any) => {
    if (!currentVisit) return;
    
    const keys = path.split('.');
    const updated = { ...currentVisit };
    
    let obj: any = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      obj[keys[i]] = { ...obj[keys[i]] };
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    
    // Auto-calculate BMI
    if (path === 'physicalExam.weight' || path === 'physicalExam.height') {
      const h = updated.physicalExam.height;
      const w = updated.physicalExam.weight;
      if (h > 0 && w > 0) {
        updated.physicalExam.bmi = Math.round((w / ((h / 100) ** 2)) * 10) / 10;
      }
    }
    
    setCurrentVisit(updated);
  };

  // Empty State
  if (!isEditing && visits.length === 0) {
    return (
      <div className="gyne-empty">
        <div className="gyne-empty-content">
          <h2>No Gynecology Visits</h2>
          <p>Start a new gynecology consultation for <strong>{patientName}</strong></p>
          <button className="btn-primary" onClick={handleNewVisit}>
            <Plus size={18} />
            Add Visit
          </button>
        </div>
      </div>
    );
  }

  // Visit List
  if (!isEditing) {
    return (
      <div className="gyne-list">
        <div className="gyne-list-header">
          <h2>Gynecology Visits</h2>
          <button className="btn-primary" onClick={handleNewVisit}>
            <Plus size={18} />
            Add Visit
          </button>
        </div>
        <div className="gyne-visits-list">
          {visits.map(visit => (
            <div 
              key={visit.id} 
              className="gyne-visit-card" 
              onClick={() => { setCurrentVisit(visit); setIsEditing(true); }}
            >
              <div className="visit-card-date">
                <Calendar size={16} />
                {new Date(visit.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
              <div className="visit-card-complaint">
                {visit.presentingComplaints || 'No complaints recorded'}
              </div>
              <div className="visit-card-impression">
                {visit.impression || 'No impression'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Edit Form
  return (
    <div className="gyne-form">
      <div className="gyne-form-header">
        <div className="gyne-form-title">
          <button className="btn-icon" onClick={handleCancel}>
            <ChevronLeft size={20} />
          </button>
          <h2>Gynecology Visit - {new Date(currentVisit!.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</h2>
        </div>
        <div className="gyne-form-actions">
          <button className="btn-secondary" onClick={handleCancel}>
            <X size={16} />
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            <Save size={18} />
            Save Visit
          </button>
        </div>
      </div>

      <div className="gyne-form-content">
        {/* Page 1: Gynaecology Record */}
        
        {/* Patient Info (Read-only) */}
        <section className="gyne-section">
          <h3>Patient Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={currentVisit!.name} readOnly className="readonly" />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input type="text" value={`${currentVisit!.age} years`} readOnly className="readonly" />
            </div>
          </div>
        </section>

        {/* Menstrual & Reproductive History */}
        <section className="gyne-section">
          <h3>Menstrual & Reproductive History</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>LMP</label>
              <input
                type="date"
                value={currentVisit!.lmp}
                onChange={(e) => updateField('lmp', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Para</label>
              <input
                type="text"
                placeholder="e.g., P2L2"
                value={currentVisit!.para}
                onChange={(e) => updateField('para', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Contraception</label>
              <input
                type="text"
                placeholder="Type of contraception"
                value={currentVisit!.contraception}
                onChange={(e) => updateField('contraception', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Previous Smear</label>
              <input
                type="text"
                placeholder="Nil / Normal / Abnormal"
                value={currentVisit!.previousSmear}
                onChange={(e) => updateField('previousSmear', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Menstrual Cycles</label>
              <input
                type="text"
                placeholder="Regular / Irregular"
                value={currentVisit!.menstrualCycles}
                onChange={(e) => updateField('menstrualCycles', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Presenting Complaints */}
        <section className="gyne-section">
          <h3>Presenting Complaints</h3>
          <div className="form-grid">
            <div className="form-group wide">
              <label>Presenting Complaints</label>
              <textarea
                rows={3}
                placeholder="Main reason for visit..."
                value={currentVisit!.presentingComplaints}
                onChange={(e) => updateField('presentingComplaints', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Micturition</label>
              <input
                type="text"
                placeholder="Urinary symptoms"
                value={currentVisit!.micturition}
                onChange={(e) => updateField('micturition', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Bowels</label>
              <input
                type="text"
                placeholder="Bowel symptoms"
                value={currentVisit!.bowels}
                onChange={(e) => updateField('bowels', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Past Medical History */}
        <section className="gyne-section">
          <h3>Past Medical History</h3>
          <div className="form-checkboxes">
            {[
              { key: 'diabetes', label: 'Diabetes' },
              { key: 'hypertension', label: 'Hypertension' },
              { key: 'thyroidDysfunction', label: 'Thyroid Dysfunction' },
              { key: 'migraine', label: 'Migraine' },
              { key: 'cardiac', label: 'Cardiac' },
              { key: 'epilepsy', label: 'Epilepsy' },
              { key: 'asthma', label: 'Asthma' },
              { key: 'tb', label: 'TB' },
              { key: 'bloodTransfusion', label: 'Blood Transfusion' },
              { key: 'thromboembolism', label: 'Thromboembolism' },
            ].map(item => (
              <label key={item.key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(currentVisit!.pastMedicalHistory as any)[item.key]}
                  onChange={(e) => updateField(`pastMedicalHistory.${item.key}`, e.target.checked)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
          <div className="form-grid" style={{ padding: '12px 16px' }}>
            <div className="form-group wide">
              <label>Surgery (if any)</label>
              <input
                type="text"
                placeholder="Describe any surgeries"
                value={currentVisit!.pastMedicalHistory.surgery}
                onChange={(e) => updateField('pastMedicalHistory.surgery', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Family History */}
        <section className="gyne-section">
          <h3>Family History</h3>
          <div className="form-checkboxes">
            {[
              { key: 'diabetes', label: 'Diabetes' },
              { key: 'hypertension', label: 'Hypertension' },
              { key: 'thyroidDysfunction', label: 'Thyroid Dysfunction' },
              { key: 'tb', label: 'TB' },
              { key: 'ihdCva', label: 'IHD/CVA' },
              { key: 'thromboembolism', label: 'Thromboembolism' },
              { key: 'psychiatricProblems', label: 'Psychiatric Problems' },
            ].map(item => (
              <label key={item.key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(currentVisit!.familyHistory as any)[item.key]}
                  onChange={(e) => updateField(`familyHistory.${item.key}`, e.target.checked)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
          <div className="form-grid" style={{ padding: '12px 16px' }}>
            <div className="form-group wide">
              <label>Cancers (specify if any)</label>
              <input
                type="text"
                placeholder="Type of cancer if any"
                value={currentVisit!.familyHistory.cancers}
                onChange={(e) => updateField('familyHistory.cancers', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Personal History */}
        <section className="gyne-section">
          <h3>Personal History</h3>
          <div className="form-checkboxes">
            {[
              { key: 'smoking', label: 'Smoking' },
              { key: 'alcohol', label: 'Alcohol' },
              { key: 'psychStress', label: 'Psych. Stress' },
            ].map(item => (
              <label key={item.key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(currentVisit!.personalHistory as any)[item.key]}
                  onChange={(e) => updateField(`personalHistory.${item.key}`, e.target.checked)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
          <div className="form-grid" style={{ padding: '12px 16px' }}>
            <div className="form-group wide">
              <label>Allergies</label>
              <input
                type="text"
                placeholder="List any allergies"
                value={currentVisit!.personalHistory.allergies}
                onChange={(e) => updateField('personalHistory.allergies', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Page 2: Examination & Advice */}
        
        {/* Medications */}
        <section className="gyne-section">
          <h3>Current Medications</h3>
          <div className="form-grid">
            <div className="form-group wide">
              <label>Medications</label>
              <textarea
                rows={2}
                placeholder="Current medications..."
                value={currentVisit!.medications}
                onChange={(e) => updateField('medications', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Physical Examination */}
        <section className="gyne-section">
          <h3>Physical Examination</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Height (cm)</label>
              <input
                type="number"
                value={currentVisit!.physicalExam.height || ''}
                onChange={(e) => updateField('physicalExam.height', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                value={currentVisit!.physicalExam.weight || ''}
                onChange={(e) => updateField('physicalExam.weight', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="form-group">
              <label>BMI</label>
              <input
                type="number"
                value={currentVisit!.physicalExam.bmi || ''}
                readOnly
                className="readonly"
              />
            </div>
            <div className="form-group">
              <label>Pulse (bpm)</label>
              <input
                type="number"
                value={currentVisit!.physicalExam.pulse || ''}
                onChange={(e) => updateField('physicalExam.pulse', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="form-group">
              <label>BP (mmHg)</label>
              <div className="bp-inputs">
                <input
                  type="number"
                  placeholder="Sys"
                  value={currentVisit!.physicalExam.bpSystolic || ''}
                  onChange={(e) => updateField('physicalExam.bpSystolic', parseInt(e.target.value) || 0)}
                />
                <span>/</span>
                <input
                  type="number"
                  placeholder="Dia"
                  value={currentVisit!.physicalExam.bpDiastolic || ''}
                  onChange={(e) => updateField('physicalExam.bpDiastolic', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>
          <div className="form-checkboxes">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={currentVisit!.physicalExam.pallor}
                onChange={(e) => updateField('physicalExam.pallor', e.target.checked)}
              />
              <span>Pallor</span>
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={currentVisit!.physicalExam.goiter}
                onChange={(e) => updateField('physicalExam.goiter', e.target.checked)}
              />
              <span>Goiter</span>
            </label>
          </div>
          <div className="form-grid" style={{ padding: '12px 16px' }}>
            <div className="form-group">
              <label>CVS</label>
              <input
                type="text"
                placeholder="Cardiovascular system"
                value={currentVisit!.physicalExam.cvs}
                onChange={(e) => updateField('physicalExam.cvs', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Breasts</label>
              <input
                type="text"
                placeholder="Breast examination"
                value={currentVisit!.physicalExam.breasts}
                onChange={(e) => updateField('physicalExam.breasts', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>RS</label>
              <input
                type="text"
                placeholder="Respiratory system"
                value={currentVisit!.physicalExam.rs}
                onChange={(e) => updateField('physicalExam.rs', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>P/A (Per Abdomen)</label>
              <input
                type="text"
                placeholder="Abdominal examination"
                value={currentVisit!.physicalExam.perAbdomen}
                onChange={(e) => updateField('physicalExam.perAbdomen', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Vaginal Examination */}
        <section className="gyne-section">
          <h3>Vaginal Examination (VE)</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>V&V (Vulva & Vagina)</label>
              <input
                type="text"
                placeholder="Vulva & Vagina findings"
                value={currentVisit!.vaginalExam.vulvaVagina}
                onChange={(e) => updateField('vaginalExam.vulvaVagina', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Cervix</label>
              <input
                type="text"
                placeholder="Cervix findings"
                value={currentVisit!.vaginalExam.cervix}
                onChange={(e) => updateField('vaginalExam.cervix', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Uterus</label>
              <input
                type="text"
                placeholder="Uterus findings"
                value={currentVisit!.vaginalExam.uterus}
                onChange={(e) => updateField('vaginalExam.uterus', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Adnexa</label>
              <input
                type="text"
                placeholder="Adnexa findings"
                value={currentVisit!.vaginalExam.adnexa}
                onChange={(e) => updateField('vaginalExam.adnexa', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Impression & Advice */}
        <section className="gyne-section">
          <h3>Impression & Advice</h3>
          <div className="form-grid">
            <div className="form-group wide">
              <label>Impression</label>
              <textarea
                rows={2}
                placeholder="Clinical impression / diagnosis..."
                value={currentVisit!.impression}
                onChange={(e) => updateField('impression', e.target.value)}
              />
            </div>
            <div className="form-group wide">
              <label>Advice</label>
              <textarea
                rows={3}
                placeholder="Treatment plan and recommendations..."
                value={currentVisit!.advice}
                onChange={(e) => updateField('advice', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Doctor's Signature</label>
              <input
                type="text"
                placeholder="Doctor name"
                value={currentVisit!.doctorSignature}
                onChange={(e) => updateField('doctorSignature', e.target.value)}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GynecologyForm;
