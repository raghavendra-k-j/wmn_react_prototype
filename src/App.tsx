import { useState } from 'react';
import { AppSidebar } from './components/AppSidebar';
import { PatientList } from './components/PatientList';
import { PatientDetailViewV2 } from './components/PatientDetailViewV2';
import { patientsList, getPatientByUhid } from './mockData';
import type { Patient } from './types';
import './App.css';

function App() {
  // App navigation state
  const [appSidebarCollapsed, setAppSidebarCollapsed] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('patients');

  // Patient selection state
  const [selectedPatientUhid, setSelectedPatientUhid] = useState<string | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);

  // Handle patient selection from list
  const handleSelectPatient = (uhid: string) => {
    const patientData = getPatientByUhid(uhid);
    if (patientData) {
      setPatient(patientData);
      setSelectedPatientUhid(uhid);
    } else {
      // For demo, show alert for patients without full data
      alert(`Patient ${uhid} data not available in demo. Only Chaitra (WMN-2025-001) has full data.`);
    }
  };

  // Go back to patient list
  const handleBackToList = () => {
    setSelectedPatientUhid(null);
    setPatient(null);
  };

  // Render content based on active nav item
  const renderContent = () => {
    // Non-patient pages show placeholders
    if (activeNavItem !== 'patients') {
      return (
        <div className="placeholder-page">
          <div className="placeholder-content">
            <h2>{getPageTitle(activeNavItem)}</h2>
            <p>This page is under construction.</p>
          </div>
        </div>
      );
    }

    // Patient list view (no patient selected)
    if (!selectedPatientUhid || !patient) {
      return <PatientList patients={patientsList} onSelectPatient={handleSelectPatient} />;
    }

    // Patient detail view - Use V2 component
    return (
      <PatientDetailViewV2
        patient={patient}
        onBack={handleBackToList}
        onPatientUpdate={setPatient}
      />
    );
  };

  const getPageTitle = (id: string): string => {
    const titles: Record<string, string> = {
      home: 'Home',
      dashboard: 'Dashboard',
      appointments: 'Appointments',
      staff: 'Staff Management',
      roles: 'Role Management',
      notifications: 'Notifications',
      settings: 'Settings',
      help: 'Help & Support',
    };
    return titles[id] || 'Page';
  };

  return (
    <div className="app-wrapper">
      {/* Application Sidebar */}
      <AppSidebar
        isCollapsed={appSidebarCollapsed}
        onToggle={() => setAppSidebarCollapsed(!appSidebarCollapsed)}
        activeItem={activeNavItem}
        onItemClick={(id) => {
          setActiveNavItem(id);
          // Reset patient selection when switching nav
          if (id !== 'patients') {
            setSelectedPatientUhid(null);
            setPatient(null);
          }
        }}
      />

      {/* Main App Container */}
      <div className="app-container">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
