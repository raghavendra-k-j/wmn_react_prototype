import type { Patient } from './types';

// Full patient data for Chaitra
export const chaitraPatient: Patient = {
  profile: {
    uhid: 'WMN-2025-001',
    name: 'Chaitra',
    age: 29,
    dob: '1996-03-15',
    occupation: 'IT',
    spouseName: 'Mr. Ramana',
    spouseOccupation: 'IT',
    address: 'Jaynagar, Bangalore',
    mobile: '9876543210',
    allergies: [],
    bloodGroup: 'O',
    rhStatus: 'Positive',
    husbandBloodGroup: 'O+ve',
  },
  obstetricHistory: {
    gravida: 4,
    para: 0,
    living: 0,
    abortion: 3,
    lmp: '2025-04-01',
    edd: '2026-01-08',
    scanEdd: '2026-01-05',
    menstrualCycle: 'Regular',
    riskFactors: ['H/o Depression on Rx', 'GDM on Diet + OHA + Insulin'],
    planForManagement:
      'Percan @ 37 wks, Psych evaluation, R/o macrosomia, Polyhydramnios watch',
    previousContraception: 'Nil',
    papSmear: 'Normal',
    marriedLife: '2 yrs',
  },
  pastObstetricHistory: [
    { no: 1, year: 2020, antenatal: 'MTOP for social reasons', deliveryMode: 'Medical', remarks: '' },
    { no: 2, year: 2022, antenatal: 'Missed miscarriage', deliveryMode: 'Medical Mx', remarks: '' },
    { no: 3, year: 2024, antenatal: 'Missed miscarriage', deliveryMode: 'Me & Mx', remarks: '' },
    { no: 4, year: 2024, antenatal: 'PP (Spontaneous)', deliveryMode: '', remarks: 'APC Neg' },
  ],
  medicalHistory: {
    diabetes: false, hypertension: false, thyroid: true, migraine: false,
    cardiac: false, epilepsy: false, asthma: false, tb: false,
    bloodTransfusion: false, surgery: 'H/o Lap Appendicectomy',
    thromboembolism: false, psychiatricProblems: 'H/o Depression on Rx', hduIcuAdmission: false,
  },
  familyHistory: {
    diabetes: true, hypertension: true, thyroid: false, stroke: false,
    tb: false, cancers: false, twin: false, physicallyChallenged: false,
    mentallyChallenged: false, thromboembolism: false, psychiatricProblems: false,
  },
  personalHistory: { smoking: false, alcohol: false, consanguinity: false, psychStress: true },
  presentMedication: 'Thyronorm 50mcg',
  comments: '',
  labResults: { hb: 11.5, pcv: 34, tsh: 2.5 },
  visits: [
    { id: 'v1', date: '2025-05-16', template: 'ANC', complaints: 'H/o vomiting, tiredness', weight: 55, bpSystolic: 110, bpDiastolic: 70, weeksFromLmp: 7, pallor: false, pedalEdema: false, remarks: 'T3, T4, Seratil, Uterogel', nextVisitDate: '2025-06-12', seenBy: 'Dr. Smith' },
    { id: 'v2', date: '2025-06-12', template: 'ANC', complaints: 'Well, FTS', weight: 56, bpSystolic: 120, bpDiastolic: 80, weeksFromLmp: 12, pallor: false, pedalEdema: false, remarks: 'U Well', nextVisitDate: '2025-07-10', seenBy: 'Dr. Smith' },
    { id: 'v3', date: '2025-07-10', template: 'ANC', complaints: 'Well', weight: 57, bpSystolic: 120, bpDiastolic: 70, weeksFromLmp: 16, sfh: 16, pallor: false, pedalEdema: false, remarks: 'H/o bleeding, Flu burning micturition', nextVisitDate: '2025-08-07', seenBy: 'Dr. Smith' },
  ],
};

// Summary data for patient list
export interface PatientListItem {
  uhid: string;
  name: string;
  age: number;
  mobile: string;
  bloodGroup: string;
  rhStatus: 'Positive' | 'Negative';
  lmp?: string;
  edd?: string;
  weeksPregnant?: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  lastVisit?: string;
  nextVisit?: string;
  status: 'Active' | 'Delivered' | 'Closed';
}

export const patientsList: PatientListItem[] = [
  {
    uhid: 'WMN-2025-001',
    name: 'Chaitra',
    age: 29,
    mobile: '9876543210',
    bloodGroup: 'O',
    rhStatus: 'Positive',
    lmp: '2025-04-01',
    edd: '2026-01-08',
    weeksPregnant: 16,
    riskLevel: 'High',
    lastVisit: '2025-07-10',
    nextVisit: '2025-08-07',
    status: 'Active',
  },
  {
    uhid: 'WMN-2025-002',
    name: 'Priya Sharma',
    age: 26,
    mobile: '9876543211',
    bloodGroup: 'A',
    rhStatus: 'Positive',
    lmp: '2025-03-15',
    edd: '2025-12-22',
    weeksPregnant: 24,
    riskLevel: 'Low',
    lastVisit: '2025-07-05',
    nextVisit: '2025-07-19',
    status: 'Active',
  },
  {
    uhid: 'WMN-2025-003',
    name: 'Lakshmi Devi',
    age: 32,
    mobile: '9876543212',
    bloodGroup: 'B',
    rhStatus: 'Negative',
    lmp: '2025-02-20',
    edd: '2025-11-27',
    weeksPregnant: 28,
    riskLevel: 'Medium',
    lastVisit: '2025-07-08',
    nextVisit: '2025-07-22',
    status: 'Active',
  },
  {
    uhid: 'WMN-2025-004',
    name: 'Ananya Reddy',
    age: 28,
    mobile: '9876543213',
    bloodGroup: 'AB',
    rhStatus: 'Positive',
    lmp: '2025-05-10',
    edd: '2026-02-14',
    weeksPregnant: 10,
    riskLevel: 'Low',
    lastVisit: '2025-07-01',
    nextVisit: '2025-07-29',
    status: 'Active',
  },
  {
    uhid: 'WMN-2025-005',
    name: 'Meera Krishnan',
    age: 35,
    mobile: '9876543214',
    bloodGroup: 'O',
    rhStatus: 'Negative',
    lmp: '2025-01-05',
    edd: '2025-10-12',
    weeksPregnant: 36,
    riskLevel: 'High',
    lastVisit: '2025-07-12',
    nextVisit: '2025-07-19',
    status: 'Active',
  },
  {
    uhid: 'WMN-2024-098',
    name: 'Sunita Patel',
    age: 30,
    mobile: '9876543215',
    bloodGroup: 'A',
    rhStatus: 'Positive',
    riskLevel: 'Low',
    lastVisit: '2025-06-15',
    status: 'Delivered',
  },
  {
    uhid: 'WMN-2024-087',
    name: 'Kavitha Nair',
    age: 27,
    mobile: '9876543216',
    bloodGroup: 'B',
    rhStatus: 'Positive',
    riskLevel: 'Low',
    lastVisit: '2025-05-20',
    status: 'Closed',
  },
];

// Get full patient data by UHID (for demo, only Chaitra has full data)
export const getPatientByUhid = (uhid: string): Patient | null => {
  if (uhid === 'WMN-2025-001') {
    return chaitraPatient;
  }
  // For other patients, return null (would be fetched from API in real app)
  return null;
};

export const mockPatient = chaitraPatient;

export const createNewVisit = (template: 'ANC' | 'GYNE' | 'GENERAL') => ({
  id: `v${Date.now()}`,
  date: new Date().toISOString().split('T')[0],
  template,
  pallor: false,
  pedalEdema: false,
});
