import React from 'react';
import { Baby, Heart, Stethoscope, Plus, Calendar } from 'lucide-react';

interface SectionPlaceholderProps {
  section: 'anc' | 'gynecology' | 'general';
  patientName: string;
}

export const SectionPlaceholder: React.FC<SectionPlaceholderProps> = ({ section, patientName }) => {
  const sectionConfig = {
    anc: {
      title: 'ANC Visits',
      description: 'Antenatal Care visits and monitoring',
      icon: Baby,
      color: '#6366f1',
    },
    gynecology: {
      title: 'Gynecology',
      description: 'Gynecological examinations and treatments',
      icon: Heart,
      color: '#ec4899',
    },
    general: {
      title: 'General Visits',
      description: 'General medical consultations',
      icon: Stethoscope,
      color: '#10b981',
    },
  };

  const config = sectionConfig[section];
  const Icon = config.icon;

  return (
    <div className="section-placeholder">
      <div className="section-placeholder-content">
        <div className="section-placeholder-icon" style={{ backgroundColor: `${config.color}15`, color: config.color }}>
          <Icon size={48} />
        </div>
        <h2>{config.title}</h2>
        <p>{config.description} for <strong>{patientName}</strong></p>
        <div className="section-placeholder-actions">
          <button className="btn-primary">
            <Plus size={18} />
            New {section === 'anc' ? 'ANC Visit' : section === 'gynecology' ? 'Gynecology Visit' : 'General Visit'}
          </button>
          <button className="btn-secondary">
            <Calendar size={18} />
            View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionPlaceholder;
