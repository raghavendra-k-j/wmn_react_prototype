// Data models for Patient Visit Form

export interface PatientProfile {
  uhid: string;
  name: string;
  age: number;
  dob?: string;
  occupation?: string;
  spouseName?: string;
  spouseOccupation?: string;
  address: string;
  mobile: string;
  allergies: string[];
  bloodGroup: string;
  rhStatus: 'Positive' | 'Negative';
  husbandBloodGroup?: string;
}

export interface ObstetricHistory {
  gravida: number;
  para: number;
  living: number;
  abortion: number;
  lmp: string;
  edd: string;
  scanEdd?: string;
  menstrualCycle: 'Regular' | 'Irregular';
  riskFactors: string[];
  planForManagement?: string;
  previousContraception?: string;
  papSmear: 'Nil' | 'Normal' | 'Abnormal';
  marriedLife?: string;
}

export interface PastObstetricEntry {
  no: number;
  year: number;
  antenatal: string;
  deliveryMode: string;
  sex?: 'M' | 'F';
  weight?: number;
  remarks?: string;
}

export interface MedicalHistory {
  diabetes: boolean;
  hypertension: boolean;
  thyroid: boolean;
  migraine: boolean;
  cardiac: boolean;
  epilepsy: boolean;
  asthma: boolean;
  tb: boolean;
  bloodTransfusion: boolean;
  surgery: string | null;
  thromboembolism: boolean;
  psychiatricProblems: string | null;
  hduIcuAdmission: boolean;
  others?: string;
}

export interface FamilyHistory {
  diabetes: boolean;
  hypertension: boolean;
  thyroid: boolean;
  stroke: boolean;
  tb: boolean;
  cancers: boolean;
  twin: boolean;
  physicallyChallenged: boolean;
  mentallyChallenged: boolean;
  thromboembolism: boolean;
  psychiatricProblems: boolean;
  others?: string;
}

export interface PersonalHistory {
  smoking: boolean;
  alcohol: boolean;
  consanguinity: boolean;
  psychStress: boolean;
}

export interface LabResults {
  hb?: number;
  pcv?: number;
  platelets?: number;
  fbsRbs?: number;
  gctGtt?: string;
  tsh?: number;
  rubellaIgG?: string;
  vdrl?: string;
  hiv?: string;
  hbsAg?: string;
  ict?: string;
  urine?: string;
  hba1c?: number;
}

export interface VisitRecord {
  id: string;
  date: string;
  template: 'ANC' | 'GYNE' | 'GENERAL';
  complaints?: string;
  weight?: number;
  bpSystolic?: number;
  bpDiastolic?: number;
  weeksFromLmp?: number;
  sfh?: number;
  fetalHeartRate?: number;
  fetalPosition?: string;
  pallor: boolean;
  pedalEdema: boolean;
  pvExam?: string;
  urineAlbumin?: string;
  urineSugar?: string;
  remarks?: string;
  nextVisitDate?: string;
  seenBy?: string;
}

export interface Patient {
  profile: PatientProfile;
  obstetricHistory: ObstetricHistory;
  pastObstetricHistory: PastObstetricEntry[];
  medicalHistory: MedicalHistory;
  familyHistory: FamilyHistory;
  personalHistory: PersonalHistory;
  presentMedication?: string;
  comments?: string;
  labResults: LabResults;
  visits: VisitRecord[];
}
