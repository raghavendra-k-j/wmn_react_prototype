import React, { useState } from 'react';
import { PatientSidebarV2 } from './sidebar/PatientSidebarV2';
import { SectionPlaceholder } from './SectionPlaceholder';
import { PatientDetailsPage } from './PatientDetailsPage';
import { GynecologyForm } from './forms/GynecologyFormV2';
import { ANCFormV2 } from './forms/ANCFormV2';
import { ArrowLeft } from 'lucide-react';
import type { Patient, PatientProfile } from '../types';
import { EditProfileModal } from './sidebar/Sidebar';

interface PatientDetailViewV2Props {
  patient: Patient;
  onBack: () => void;
  onPatientUpdate: (updated: Patient) => void;
}

export const PatientDetailViewV2: React.FC<PatientDetailViewV2Props> = ({
  patient,
  onBack,
  onPatientUpdate,
}) => {
  const [activeSection, setActiveSection] = useState<'details' | 'anc' | 'gynecology' | 'general'>('details');
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleProfileSave = (updated: PatientProfile) => {
    onPatientUpdate({
      ...patient,
      profile: updated,
    });
    setShowEditProfile(false);
  };

  // Get section label for breadcrumb
  const getSectionLabel = () => {
    switch (activeSection) {
      case 'details': return 'Patient Details';
      case 'anc': return 'ANC Case';
      case 'gynecology': return 'Gynecology';
      case 'general': return 'General Visits';
      default: return activeSection;
    }
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'details':
        return <PatientDetailsPage patient={patient} onEditProfile={() => setShowEditProfile(true)} />;
      case 'anc':
        return <ANCFormV2 patientName={patient.profile.name} patientAge={patient.profile.age} />;
      case 'gynecology':
        return <GynecologyForm patientName={patient.profile.name} patientAge={patient.profile.age} />;
      case 'general':
        return <SectionPlaceholder section="general" patientName={patient.profile.name} />;
      default:
        return <PatientDetailsPage patient={patient} onEditProfile={() => setShowEditProfile(true)} />;
    }
  };

  return (
    <div className="patient-detail-v2">
      {/* Patient Sidebar */}
      <PatientSidebarV2
        patient={patient}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onEditProfile={() => setShowEditProfile(true)}
      />

      {/* Main Content Area */}
      <main className="pdv2-main">
        {/* Header with Back Button */}
        <div className="pdv2-header">
          <button className="back-btn" onClick={onBack}>
            <ArrowLeft size={18} />
            <span>All Patients</span>
          </button>
          <div className="pdv2-breadcrumb">
            <span className="breadcrumb-patient">{patient.profile.name}</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-section">{getSectionLabel()}</span>
          </div>
        </div>

        {/* Section Content */}
        <div className="pdv2-content">
          {renderContent()}
        </div>
      </main>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfileModal
          profile={patient.profile}
          onClose={() => setShowEditProfile(false)}
          onSave={handleProfileSave}
        />
      )}
    </div>
  );
};

export default PatientDetailViewV2;
