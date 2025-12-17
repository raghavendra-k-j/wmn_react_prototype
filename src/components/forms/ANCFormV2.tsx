import React, { useState } from 'react';
import { Plus, Save, ChevronLeft, X, ChevronDown, ChevronUp } from 'lucide-react';

// ANC Case - Complete data model based on anc.md

// Past Obstetric History Entry
interface PastObstetricEntry {
  pregnancyNumber: number;
  year: string;
  antenatalCourse: string;
  modeOfDelivery: string;
  sexOfBaby: string;
  birthWeight: string;
  remarks: string;
}

// Follow-up Visit Entry
interface ANCFollowUpVisit {
  id: string;
  date: string;
  complaints: string;
  weight: number;
  bpSystolic: number;
  bpDiastolic: number;
  weeksByLmp: number;
  sfh: string;
  fetalHeart: string;
  presentation: string;
  remarksPlan: string;
  nextVisitDate: string;
  seenBy: string;
}

// Follow-up Test Entry
interface FollowUpTest {
  id: string;
  period: string; // "24-28wks" | "32wks" | "36wks"
  date: string;
  hb: string;
  pcv: string;
  rbsFbs: string;
  gtt: string;
  tsh: string;
}

// Complete ANC Case
export interface ANCCase {
  id: string;
  patientName: string;
  patientAge: number;
  
  // 2. Obstetric Status (Current Pregnancy)
  obstetricStatus: {
    lmp: string;
    edd: string;
    scanEdd: string;
    gravida: number;
    para: number;
    living: number;
    abortions: number;
    riskFactors: string;
    menstrualCycle: string;
    previousContraception: string;
    papSmear: string;
    marriedLifeDuration: string;
  };
  
  // 3. Past Obstetric History
  pastObstetricHistory: PastObstetricEntry[];
  
  // 4. Medical & Personal History
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
  
  personalHabits: {
    smoking: boolean;
    alcohol: boolean;
    consanguinity: boolean;
    psychologicalStress: boolean;
  };
  
  // 5. Investigations & Lab Reports - Baseline
  baselineTests: {
    hb: string;
    pcv: string;
    platelets: string;
    fbsRbs: string;
    gctGtt: string;
    tsh: string;
    rubellaIgG: string;
    hiv: string;
    hbsAg: string;
    vdrl: string;
    urineAnalysis: string;
    hba1c: string;
  };
  
  // Follow-up Tests
  followUpTests: FollowUpTest[];
  
  // Ultrasound Tracking
  usgTracking: {
    datingScanDate: string;
    scan11_13WeeksDate: string;
    combinedScreeningDate: string;
    anomalyScanDate: string;
  };
  
  // 6. Vaccinations
  vaccinations: {
    tdVaccineDate: string;
    tdapVaccineDate: string;
    ictDate: string;
    antiDDate: string;
  };
  
  // 7. Antenatal Visit Log - Booking Visit
  bookingVisit: {
    bookingDate: string;
    height: number;
    weight: number;
    bmi: number;
    thyroidExam: string;
    breastExam: string;
    cvsExam: string;
    rsExam: string;
    perAbdomenFindings: string;
  };
  
  // 7. Recurring Follow-up Visits
  followUpVisits: ANCFollowUpVisit[];
  
  // 8. Delivery Outcome
  deliveryOutcome: {
    dateOfDelivery: string;
    sexOfBaby: string;
    modeOfDelivery: string;
    birthWeight: string;
    indicationForCS: string;
    perinealTear: string;
    complications: string;
  };
  
  // 9. Postnatal Care
  postnatalCare: {
    checklist: {
      diabetes: boolean;
      hypertension: boolean;
      thyroid: boolean;
      moodDepression: boolean;
    };
    examination: {
      bp: string;
      pallor: boolean;
      breasts: string;
      perAbdomen: string;
      perineum: string;
    };
    contraceptionAdvice: boolean;
    nextCheckupDate: string;
  };
}

// Create empty ANC case
const createEmptyANCCase = (patientName: string, patientAge: number): ANCCase => ({
  id: `anc-${Date.now()}`,
  patientName,
  patientAge,
  obstetricStatus: {
    lmp: '',
    edd: '',
    scanEdd: '',
    gravida: 1,
    para: 0,
    living: 0,
    abortions: 0,
    riskFactors: '',
    menstrualCycle: '',
    previousContraception: '',
    papSmear: '',
    marriedLifeDuration: '',
  },
  pastObstetricHistory: [],
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
  baselineTests: {
    hb: '',
    pcv: '',
    platelets: '',
    fbsRbs: '',
    gctGtt: '',
    tsh: '',
    rubellaIgG: '',
    hiv: '',
    hbsAg: '',
    vdrl: '',
    urineAnalysis: '',
    hba1c: '',
  },
  followUpTests: [],
  usgTracking: {
    datingScanDate: '',
    scan11_13WeeksDate: '',
    combinedScreeningDate: '',
    anomalyScanDate: '',
  },
  vaccinations: {
    tdVaccineDate: '',
    tdapVaccineDate: '',
    ictDate: '',
    antiDDate: '',
  },
  bookingVisit: {
    bookingDate: new Date().toISOString().split('T')[0],
    height: 0,
    weight: 0,
    bmi: 0,
    thyroidExam: '',
    breastExam: '',
    cvsExam: '',
    rsExam: '',
    perAbdomenFindings: '',
  },
  followUpVisits: [],
  deliveryOutcome: {
    dateOfDelivery: '',
    sexOfBaby: '',
    modeOfDelivery: '',
    birthWeight: '',
    indicationForCS: '',
    perinealTear: '',
    complications: '',
  },
  postnatalCare: {
    checklist: {
      diabetes: false,
      hypertension: false,
      thyroid: false,
      moodDepression: false,
    },
    examination: {
      bp: '',
      pallor: false,
      breasts: '',
      perAbdomen: '',
      perineum: '',
    },
    contraceptionAdvice: false,
    nextCheckupDate: '',
  },
});

// Tab types for ANC form - 'history' and 'obhistory' are now accessed via sidebar
export type AncTabType = 'booking' | 'history' | 'obhistory' | 'followup' | 'investigations' | 'delivery';

interface ANCFormProps {
  patientName: string;
  patientAge: number;
  /** Initial tab to display, used when navigating from sidebar sub-items */
  initialTab?: AncTabType;
}

export const ANCFormV2: React.FC<ANCFormProps> = ({ patientName, patientAge, initialTab }) => {
  const [ancCase, setAncCase] = useState<ANCCase | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<AncTabType>(initialTab || 'booking');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    obstetric: true,
    pastOb: true,
    medical: true,
    baseline: true,
    usg: true,
    vaccines: true,
    booking: true,
  });

  // Update activeTab when initialTab changes (e.g., from sidebar navigation)
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleNewCase = () => {
    setAncCase(createEmptyANCCase(patientName, patientAge));
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (!ancCase?.bookingVisit.bookingDate) {
      setAncCase(null);
    }
    setIsEditing(false);
  };

  const updateField = (path: string, value: any) => {
    if (!ancCase) return;
    
    const keys = path.split('.');
    const updated = JSON.parse(JSON.stringify(ancCase)); // Deep clone
    
    let obj: any = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    
    // Auto-calculate BMI
    if (path === 'bookingVisit.weight' || path === 'bookingVisit.height') {
      const h = updated.bookingVisit.height;
      const w = updated.bookingVisit.weight;
      if (h > 0 && w > 0) {
        updated.bookingVisit.bmi = Math.round((w / ((h / 100) ** 2)) * 10) / 10;
      }
    }
    
    // Auto-calculate EDD from LMP
    if (path === 'obstetricStatus.lmp' && value) {
      const lmpDate = new Date(value);
      const eddDate = new Date(lmpDate);
      eddDate.setDate(eddDate.getDate() + 280); // 40 weeks
      updated.obstetricStatus.edd = eddDate.toISOString().split('T')[0];
    }
    
    setAncCase(updated);
  };

  const addFollowUpVisit = () => {
    if (!ancCase) return;
    const newVisit: ANCFollowUpVisit = {
      id: `fv-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      complaints: '',
      weight: 0,
      bpSystolic: 0,
      bpDiastolic: 0,
      weeksByLmp: 0,
      sfh: '',
      fetalHeart: '',
      presentation: '',
      remarksPlan: '',
      nextVisitDate: '',
      seenBy: '',
    };
    setAncCase({
      ...ancCase,
      followUpVisits: [...ancCase.followUpVisits, newVisit],
    });
  };

  const updateFollowUpVisit = (visitId: string, field: string, value: any) => {
    if (!ancCase) return;
    setAncCase({
      ...ancCase,
      followUpVisits: ancCase.followUpVisits.map(v =>
        v.id === visitId ? { ...v, [field]: value } : v
      ),
    });
  };

  const addPastObstetricEntry = () => {
    if (!ancCase) return;
    const newEntry: PastObstetricEntry = {
      pregnancyNumber: ancCase.pastObstetricHistory.length + 1,
      year: '',
      antenatalCourse: '',
      modeOfDelivery: '',
      sexOfBaby: '',
      birthWeight: '',
      remarks: '',
    };
    setAncCase({
      ...ancCase,
      pastObstetricHistory: [...ancCase.pastObstetricHistory, newEntry],
    });
  };

  // Empty State
  if (!ancCase) {
    return (
      <div className="anc-empty">
        <div className="anc-empty-content">
          <h2>No ANC Case</h2>
          <p>Start a new ANC case for <strong>{patientName}</strong></p>
          <button className="btn-primary" onClick={handleNewCase}>
            <Plus size={18} />
            New ANC Case
          </button>
        </div>
      </div>
    );
  }

  // Section Header Component
  const SectionHeader: React.FC<{ title: string; section: string }> = ({ title, section }) => (
    <button className="anc-section-header" onClick={() => toggleSection(section)}>
      <h3>{title}</h3>
      {expandedSections[section] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </button>
  );

  return (
    <div className="anc-form">
      {/* Header */}
      <div className="anc-form-header">
        <div className="anc-form-title">
          {isEditing && (
            <button className="btn-icon" onClick={handleCancel}>
              <ChevronLeft size={20} />
            </button>
          )}
          <h2>ANC Case - {patientName}</h2>
          <span className="anc-edd-badge">
            EDD: {ancCase.obstetricStatus.edd ? new Date(ancCase.obstetricStatus.edd).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Not set'}
          </span>
        </div>
        <div className="anc-form-actions">
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
              Edit Case
            </button>
          )}
        </div>
      </div>

      {/* Tabs - Medical History and OB History are now accessed via sidebar */}
      <div className="anc-tabs">
        <button className={`anc-tab ${activeTab === 'booking' ? 'active' : ''}`} onClick={() => setActiveTab('booking')}>
          Booking Visit
        </button>
        <button className={`anc-tab ${activeTab === 'followup' ? 'active' : ''}`} onClick={() => setActiveTab('followup')}>
          Follow-up Visits ({ancCase.followUpVisits.length})
        </button>
        <button className={`anc-tab ${activeTab === 'investigations' ? 'active' : ''}`} onClick={() => setActiveTab('investigations')}>
          Investigations
        </button>
        <button className={`anc-tab ${activeTab === 'delivery' ? 'active' : ''}`} onClick={() => setActiveTab('delivery')}>
          Delivery & PNC
        </button>
      </div>

      {/* Tab Content */}
      <div className="anc-form-content">
        {/* Booking Visit Tab */}
        {activeTab === 'booking' && (
          <>
            {/* Obstetric Status */}
            <section className="anc-section">
              <SectionHeader title="Obstetric Status (Current Pregnancy)" section="obstetric" />
              {expandedSections.obstetric && (
                <div className="anc-section-body">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>LMP</label>
                      <input type="date" value={ancCase.obstetricStatus.lmp} onChange={(e) => updateField('obstetricStatus.lmp', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>EDD (Calculated)</label>
                      <input type="date" value={ancCase.obstetricStatus.edd} onChange={(e) => updateField('obstetricStatus.edd', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Scan EDD</label>
                      <input type="date" value={ancCase.obstetricStatus.scanEdd} onChange={(e) => updateField('obstetricStatus.scanEdd', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Menstrual Cycle</label>
                      <select value={ancCase.obstetricStatus.menstrualCycle} onChange={(e) => updateField('obstetricStatus.menstrualCycle', e.target.value)} disabled={!isEditing}>
                        <option value="">Select</option>
                        <option value="Regular">Regular</option>
                        <option value="Irregular">Irregular</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Gravida (G)</label>
                      <input type="number" min="1" value={ancCase.obstetricStatus.gravida} onChange={(e) => updateField('obstetricStatus.gravida', parseInt(e.target.value) || 1)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Para (P)</label>
                      <input type="number" min="0" value={ancCase.obstetricStatus.para} onChange={(e) => updateField('obstetricStatus.para', parseInt(e.target.value) || 0)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Living (L)</label>
                      <input type="number" min="0" value={ancCase.obstetricStatus.living} onChange={(e) => updateField('obstetricStatus.living', parseInt(e.target.value) || 0)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Abortions (A)</label>
                      <input type="number" min="0" value={ancCase.obstetricStatus.abortions} onChange={(e) => updateField('obstetricStatus.abortions', parseInt(e.target.value) || 0)} disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="form-grid">
                    <div className="form-group wide">
                      <label>Risk Factors</label>
                      <textarea rows={2} placeholder="Enter risk factors..." value={ancCase.obstetricStatus.riskFactors} onChange={(e) => updateField('obstetricStatus.riskFactors', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Previous Contraception</label>
                      <select value={ancCase.obstetricStatus.previousContraception} onChange={(e) => updateField('obstetricStatus.previousContraception', e.target.value)} disabled={!isEditing}>
                        <option value="">Select</option>
                        <option value="Nil">Nil</option>
                        <option value="Natural">Natural</option>
                        <option value="OCP">OCP</option>
                        <option value="IUD">IUD</option>
                        <option value="Injection">Injection</option>
                        <option value="Barrier">Barrier</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Pap Smear</label>
                      <select value={ancCase.obstetricStatus.papSmear} onChange={(e) => updateField('obstetricStatus.papSmear', e.target.value)} disabled={!isEditing}>
                        <option value="">Select</option>
                        <option value="Nil">Nil</option>
                        <option value="Normal">Normal</option>
                        <option value="Abnormal">Abnormal</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Married Life Duration</label>
                      <input type="text" placeholder="e.g., 3 years" value={ancCase.obstetricStatus.marriedLifeDuration} onChange={(e) => updateField('obstetricStatus.marriedLifeDuration', e.target.value)} disabled={!isEditing} />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Booking Visit Examination */}
            <section className="anc-section">
              <SectionHeader title="Booking Visit Examination" section="booking" />
              {expandedSections.booking && (
                <div className="anc-section-body">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Booking Date</label>
                      <input type="date" value={ancCase.bookingVisit.bookingDate} onChange={(e) => updateField('bookingVisit.bookingDate', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Height (cm)</label>
                      <input type="number" value={ancCase.bookingVisit.height || ''} onChange={(e) => updateField('bookingVisit.height', parseFloat(e.target.value) || 0)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Weight (kg)</label>
                      <input type="number" value={ancCase.bookingVisit.weight || ''} onChange={(e) => updateField('bookingVisit.weight', parseFloat(e.target.value) || 0)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>BMI</label>
                      <input type="number" value={ancCase.bookingVisit.bmi || ''} readOnly className="readonly" />
                    </div>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Thyroid Exam</label>
                      <input type="text" value={ancCase.bookingVisit.thyroidExam} onChange={(e) => updateField('bookingVisit.thyroidExam', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Breast Exam</label>
                      <input type="text" value={ancCase.bookingVisit.breastExam} onChange={(e) => updateField('bookingVisit.breastExam', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>CVS Exam</label>
                      <input type="text" value={ancCase.bookingVisit.cvsExam} onChange={(e) => updateField('bookingVisit.cvsExam', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>RS Exam</label>
                      <input type="text" value={ancCase.bookingVisit.rsExam} onChange={(e) => updateField('bookingVisit.rsExam', e.target.value)} disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="form-grid">
                    <div className="form-group wide">
                      <label>Per Abdomen Findings</label>
                      <textarea rows={2} value={ancCase.bookingVisit.perAbdomenFindings} onChange={(e) => updateField('bookingVisit.perAbdomenFindings', e.target.value)} disabled={!isEditing} />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Vaccinations */}
            <section className="anc-section">
              <SectionHeader title="Vaccinations & Immunization" section="vaccines" />
              {expandedSections.vaccines && (
                <div className="anc-section-body">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>TD Vaccine Date</label>
                      <input type="date" value={ancCase.vaccinations.tdVaccineDate} onChange={(e) => updateField('vaccinations.tdVaccineDate', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>TDAP Vaccine Date</label>
                      <input type="date" value={ancCase.vaccinations.tdapVaccineDate} onChange={(e) => updateField('vaccinations.tdapVaccineDate', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>ICT Date (if Rh-ve)</label>
                      <input type="date" value={ancCase.vaccinations.ictDate} onChange={(e) => updateField('vaccinations.ictDate', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Anti-D Date</label>
                      <input type="date" value={ancCase.vaccinations.antiDDate} onChange={(e) => updateField('vaccinations.antiDDate', e.target.value)} disabled={!isEditing} />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </>
        )}

        {/* Medical History Tab */}
        {activeTab === 'history' && (
          <div className="anc-history-tab">
            {/* Past Medical History */}
            <section className="anc-section">
              <h3 className="anc-section-title-static">Past Medical History</h3>
              <div className="anc-section-body">
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
                        checked={(ancCase.pastHistory as any)[item.key]}
                        onChange={(e) => updateField(`pastHistory.${item.key}`, e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
                <div className="form-grid" style={{ padding: '16px 0 0 0' }}>
                  <div className="form-group wide">
                    <label>Surgery (if any)</label>
                    <input type="text" value={ancCase.pastHistory.surgery} onChange={(e) => updateField('pastHistory.surgery', e.target.value)} disabled={!isEditing} placeholder="Describe any past surgeries" />
                  </div>
                </div>
              </div>
            </section>

            {/* Family History */}
            <section className="anc-section">
              <h3 className="anc-section-title-static">Family History</h3>
              <div className="anc-section-body">
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
                        checked={(ancCase.familyHistory as any)[item.key]}
                        onChange={(e) => updateField(`familyHistory.${item.key}`, e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Personal Habits */}
            <section className="anc-section">
              <h3 className="anc-section-title-static">Personal Habits</h3>
              <div className="anc-section-body">
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
                        checked={(ancCase.personalHabits as any)[item.key]}
                        onChange={(e) => updateField(`personalHabits.${item.key}`, e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* OB History Tab */}
        {activeTab === 'obhistory' && (
          <div className="anc-obhistory-tab">
            <div className="obhistory-header">
              <h3>Past Obstetric History</h3>
              {isEditing && (
                <button className="btn-primary" onClick={addPastObstetricEntry}>
                  <Plus size={16} /> Add Pregnancy
                </button>
              )}
            </div>

            {ancCase.pastObstetricHistory.length === 0 ? (
              <div className="no-data-text" style={{ padding: '48px', textAlign: 'center' }}>
                <p>No past obstetric history recorded.</p>
                <p style={{ fontSize: '12px', marginTop: '8px' }}>
                  Record previous pregnancies including outcomes and complications.
                </p>
                {isEditing && (
                  <button className="btn-primary" onClick={addPastObstetricEntry} style={{ marginTop: '16px' }}>
                    <Plus size={16} /> Add First Pregnancy
                  </button>
                )}
              </div>
            ) : (
              <div className="obhistory-table-container">
                <table className="anc-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Year</th>
                      <th>Antenatal Course</th>
                      <th>Mode of Delivery</th>
                      <th>Sex</th>
                      <th>Birth Weight</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ancCase.pastObstetricHistory.map((entry, idx) => (
                      <tr key={idx}>
                        <td>{entry.pregnancyNumber}</td>
                        <td>
                          <input type="text" value={entry.year} onChange={(e) => {
                            const updated = [...ancCase.pastObstetricHistory];
                            updated[idx] = { ...updated[idx], year: e.target.value };
                            setAncCase({ ...ancCase, pastObstetricHistory: updated });
                          }} disabled={!isEditing} placeholder="e.g., 2020" />
                        </td>
                        <td>
                          <input type="text" value={entry.antenatalCourse} onChange={(e) => {
                            const updated = [...ancCase.pastObstetricHistory];
                            updated[idx] = { ...updated[idx], antenatalCourse: e.target.value };
                            setAncCase({ ...ancCase, pastObstetricHistory: updated });
                          }} disabled={!isEditing} placeholder="Uneventful/Complicated" />
                        </td>
                        <td>
                          <input type="text" value={entry.modeOfDelivery} onChange={(e) => {
                            const updated = [...ancCase.pastObstetricHistory];
                            updated[idx] = { ...updated[idx], modeOfDelivery: e.target.value };
                            setAncCase({ ...ancCase, pastObstetricHistory: updated });
                          }} disabled={!isEditing} placeholder="NVD/CS/Vacuum" />
                        </td>
                        <td>
                          <input type="text" value={entry.sexOfBaby} onChange={(e) => {
                            const updated = [...ancCase.pastObstetricHistory];
                            updated[idx] = { ...updated[idx], sexOfBaby: e.target.value };
                            setAncCase({ ...ancCase, pastObstetricHistory: updated });
                          }} disabled={!isEditing} placeholder="M/F" />
                        </td>
                        <td>
                          <input type="text" value={entry.birthWeight} onChange={(e) => {
                            const updated = [...ancCase.pastObstetricHistory];
                            updated[idx] = { ...updated[idx], birthWeight: e.target.value };
                            setAncCase({ ...ancCase, pastObstetricHistory: updated });
                          }} disabled={!isEditing} placeholder="e.g., 3.2 kg" />
                        </td>
                        <td>
                          <input type="text" value={entry.remarks} onChange={(e) => {
                            const updated = [...ancCase.pastObstetricHistory];
                            updated[idx] = { ...updated[idx], remarks: e.target.value };
                            setAncCase({ ...ancCase, pastObstetricHistory: updated });
                          }} disabled={!isEditing} placeholder="Any complications" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Follow-up Visits Tab */}
        {activeTab === 'followup' && (
          <div className="anc-followup-tab">
            <div className="followup-header">
              <h3>Follow-up Visits</h3>
              {isEditing && (
                <button className="btn-primary" onClick={addFollowUpVisit}>
                  <Plus size={16} /> Add Visit
                </button>
              )}
            </div>

            {ancCase.followUpVisits.length === 0 ? (
              <div className="no-data-text" style={{ padding: '48px', textAlign: 'center' }}>
                <p>No follow-up visits recorded yet.</p>
                {isEditing && (
                  <button className="btn-primary" onClick={addFollowUpVisit} style={{ marginTop: '16px' }}>
                    <Plus size={16} /> Add First Visit
                  </button>
                )}
              </div>
            ) : (
              <div className="followup-visits-grid">
                {ancCase.followUpVisits.map((visit, idx) => (
                  <div key={visit.id} className="followup-visit-card">
                    <div className="followup-visit-header">
                      <span className="visit-number">Visit #{idx + 1}</span>
                      <div className="form-group inline">
                        <label>Date</label>
                        <input type="date" value={visit.date} onChange={(e) => updateFollowUpVisit(visit.id, 'date', e.target.value)} disabled={!isEditing} />
                      </div>
                    </div>
                    <div className="followup-visit-grid">
                      <div className="form-group">
                        <label>Complaints</label>
                        <input type="text" value={visit.complaints} onChange={(e) => updateFollowUpVisit(visit.id, 'complaints', e.target.value)} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>Weight (kg)</label>
                        <input type="number" value={visit.weight || ''} onChange={(e) => updateFollowUpVisit(visit.id, 'weight', parseFloat(e.target.value) || 0)} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>BP (mmHg)</label>
                        <div className="bp-inputs">
                          <input type="number" placeholder="Sys" value={visit.bpSystolic || ''} onChange={(e) => updateFollowUpVisit(visit.id, 'bpSystolic', parseInt(e.target.value) || 0)} disabled={!isEditing} />
                          <span>/</span>
                          <input type="number" placeholder="Dia" value={visit.bpDiastolic || ''} onChange={(e) => updateFollowUpVisit(visit.id, 'bpDiastolic', parseInt(e.target.value) || 0)} disabled={!isEditing} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Weeks by LMP</label>
                        <input type="number" value={visit.weeksByLmp || ''} onChange={(e) => updateFollowUpVisit(visit.id, 'weeksByLmp', parseInt(e.target.value) || 0)} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>SFH (cm)</label>
                        <input type="text" value={visit.sfh} onChange={(e) => updateFollowUpVisit(visit.id, 'sfh', e.target.value)} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>Fetal Heart</label>
                        <input type="text" value={visit.fetalHeart} onChange={(e) => updateFollowUpVisit(visit.id, 'fetalHeart', e.target.value)} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>Presentation</label>
                        <input type="text" value={visit.presentation} onChange={(e) => updateFollowUpVisit(visit.id, 'presentation', e.target.value)} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>Seen By</label>
                        <input type="text" value={visit.seenBy} onChange={(e) => updateFollowUpVisit(visit.id, 'seenBy', e.target.value)} disabled={!isEditing} />
                      </div>
                    </div>
                    <div className="form-grid" style={{ marginTop: '12px' }}>
                      <div className="form-group wide">
                        <label>Remarks / Plan</label>
                        <textarea rows={2} value={visit.remarksPlan} onChange={(e) => updateFollowUpVisit(visit.id, 'remarksPlan', e.target.value)} disabled={!isEditing} />
                      </div>
                      <div className="form-group">
                        <label>Next Visit Date</label>
                        <input type="date" value={visit.nextVisitDate} onChange={(e) => updateFollowUpVisit(visit.id, 'nextVisitDate', e.target.value)} disabled={!isEditing} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Investigations Tab */}
        {activeTab === 'investigations' && (
          <>
            {/* Baseline Tests */}
            <section className="anc-section">
              <SectionHeader title="Baseline Tests (Booking/1st Trimester)" section="baseline" />
              {expandedSections.baseline && (
                <div className="anc-section-body">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Hb (g/dL)</label>
                      <input type="text" value={ancCase.baselineTests.hb} onChange={(e) => updateField('baselineTests.hb', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>PCV (%)</label>
                      <input type="text" value={ancCase.baselineTests.pcv} onChange={(e) => updateField('baselineTests.pcv', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Platelets</label>
                      <input type="text" value={ancCase.baselineTests.platelets} onChange={(e) => updateField('baselineTests.platelets', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>FBS/RBS</label>
                      <input type="text" value={ancCase.baselineTests.fbsRbs} onChange={(e) => updateField('baselineTests.fbsRbs', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>GCT/GTT</label>
                      <input type="text" value={ancCase.baselineTests.gctGtt} onChange={(e) => updateField('baselineTests.gctGtt', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>TSH</label>
                      <input type="text" value={ancCase.baselineTests.tsh} onChange={(e) => updateField('baselineTests.tsh', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Rubella IgG</label>
                      <input type="text" value={ancCase.baselineTests.rubellaIgG} onChange={(e) => updateField('baselineTests.rubellaIgG', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>HIV</label>
                      <input type="text" value={ancCase.baselineTests.hiv} onChange={(e) => updateField('baselineTests.hiv', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>HBsAg</label>
                      <input type="text" value={ancCase.baselineTests.hbsAg} onChange={(e) => updateField('baselineTests.hbsAg', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>VDRL</label>
                      <input type="text" value={ancCase.baselineTests.vdrl} onChange={(e) => updateField('baselineTests.vdrl', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Urine Analysis</label>
                      <input type="text" value={ancCase.baselineTests.urineAnalysis} onChange={(e) => updateField('baselineTests.urineAnalysis', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>HbA1c</label>
                      <input type="text" value={ancCase.baselineTests.hba1c} onChange={(e) => updateField('baselineTests.hba1c', e.target.value)} disabled={!isEditing} />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* USG Tracking */}
            <section className="anc-section">
              <SectionHeader title="Ultrasound (USG) Tracking" section="usg" />
              {expandedSections.usg && (
                <div className="anc-section-body">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Dating Scan Date</label>
                      <input type="date" value={ancCase.usgTracking.datingScanDate} onChange={(e) => updateField('usgTracking.datingScanDate', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>11-13 Weeks Scan Date</label>
                      <input type="date" value={ancCase.usgTracking.scan11_13WeeksDate} onChange={(e) => updateField('usgTracking.scan11_13WeeksDate', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Combined Screening Date</label>
                      <input type="date" value={ancCase.usgTracking.combinedScreeningDate} onChange={(e) => updateField('usgTracking.combinedScreeningDate', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Anomaly Scan Date</label>
                      <input type="date" value={ancCase.usgTracking.anomalyScanDate} onChange={(e) => updateField('usgTracking.anomalyScanDate', e.target.value)} disabled={!isEditing} />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </>
        )}

        {/* Delivery & PNC Tab */}
        {activeTab === 'delivery' && (
          <>
            {/* Delivery Outcome */}
            <section className="anc-section">
              <h3 className="anc-section-title-static">Delivery Outcome</h3>
              <div className="anc-section-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Date of Delivery</label>
                    <input type="date" value={ancCase.deliveryOutcome.dateOfDelivery} onChange={(e) => updateField('deliveryOutcome.dateOfDelivery', e.target.value)} disabled={!isEditing} />
                  </div>
                  <div className="form-group">
                    <label>Sex of Baby</label>
                    <select value={ancCase.deliveryOutcome.sexOfBaby} onChange={(e) => updateField('deliveryOutcome.sexOfBaby', e.target.value)} disabled={!isEditing}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Mode of Delivery</label>
                    <select value={ancCase.deliveryOutcome.modeOfDelivery} onChange={(e) => updateField('deliveryOutcome.modeOfDelivery', e.target.value)} disabled={!isEditing}>
                      <option value="">Select</option>
                      <option value="Normal">Normal</option>
                      <option value="Forceps">Forceps</option>
                      <option value="Vacuum">Vacuum</option>
                      <option value="CS">CS (Caesarean)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Birth Weight</label>
                    <input type="text" placeholder="e.g., 3.2 kg" value={ancCase.deliveryOutcome.birthWeight} onChange={(e) => updateField('deliveryOutcome.birthWeight', e.target.value)} disabled={!isEditing} />
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Indication for CS</label>
                    <input type="text" value={ancCase.deliveryOutcome.indicationForCS} onChange={(e) => updateField('deliveryOutcome.indicationForCS', e.target.value)} disabled={!isEditing} />
                  </div>
                  <div className="form-group">
                    <label>Perineal Tear</label>
                    <input type="text" placeholder="e.g., IIIa/b/c, IV" value={ancCase.deliveryOutcome.perinealTear} onChange={(e) => updateField('deliveryOutcome.perinealTear', e.target.value)} disabled={!isEditing} />
                  </div>
                  <div className="form-group wide">
                    <label>Complications (PPH/Shoulder Dystocia)</label>
                    <input type="text" value={ancCase.deliveryOutcome.complications} onChange={(e) => updateField('deliveryOutcome.complications', e.target.value)} disabled={!isEditing} />
                  </div>
                </div>
              </div>
            </section>

            {/* Postnatal Care */}
            <section className="anc-section">
              <h3 className="anc-section-title-static">Postnatal Care (Post Partum Visit)</h3>
              <div className="anc-section-body">
                <div className="anc-history-group">
                  <h4>Checklist</h4>
                  <div className="form-checkboxes">
                    {[
                      { key: 'diabetes', label: 'Diabetes' },
                      { key: 'hypertension', label: 'Hypertension' },
                      { key: 'thyroid', label: 'Thyroid' },
                      { key: 'moodDepression', label: 'Mood/Depression' },
                    ].map(item => (
                      <label key={item.key} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={(ancCase.postnatalCare.checklist as any)[item.key]}
                          onChange={(e) => updateField(`postnatalCare.checklist.${item.key}`, e.target.checked)}
                          disabled={!isEditing}
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="anc-history-group">
                  <h4>Examination</h4>
                  <div className="form-grid" style={{ padding: '12px 0' }}>
                    <div className="form-group">
                      <label>BP</label>
                      <input type="text" value={ancCase.postnatalCare.examination.bp} onChange={(e) => updateField('postnatalCare.examination.bp', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Breasts</label>
                      <input type="text" value={ancCase.postnatalCare.examination.breasts} onChange={(e) => updateField('postnatalCare.examination.breasts', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Per Abdomen</label>
                      <input type="text" value={ancCase.postnatalCare.examination.perAbdomen} onChange={(e) => updateField('postnatalCare.examination.perAbdomen', e.target.value)} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Perineum</label>
                      <input type="text" value={ancCase.postnatalCare.examination.perineum} onChange={(e) => updateField('postnatalCare.examination.perineum', e.target.value)} disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="form-checkboxes" style={{ padding: '12px 0' }}>
                    <label className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={ancCase.postnatalCare.examination.pallor}
                        onChange={(e) => updateField('postnatalCare.examination.pallor', e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span>Pallor</span>
                    </label>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={ancCase.postnatalCare.contraceptionAdvice}
                        onChange={(e) => updateField('postnatalCare.contraceptionAdvice', e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span>Contraception Advice Given</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label>Next Check-up Date (6 Weeks)</label>
                    <input type="date" value={ancCase.postnatalCare.nextCheckupDate} onChange={(e) => updateField('postnatalCare.nextCheckupDate', e.target.value)} disabled={!isEditing} />
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default ANCFormV2;
