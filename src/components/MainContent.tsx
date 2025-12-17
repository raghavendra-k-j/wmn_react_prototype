import React from 'react';
import type { VisitRecord } from '../types';
import { Plus, Calendar } from 'lucide-react';

interface VisitTimelineProps {
  visits: VisitRecord[];
  selectedVisitId: string | null;
  onSelectVisit: (id: string) => void;
  onNewVisit: () => void;
}

export const VisitTimeline: React.FC<VisitTimelineProps> = ({
  visits,
  selectedVisitId,
  onSelectVisit,
  onNewVisit,
}) => {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="visit-timeline">
      <button className="new-visit-btn" onClick={onNewVisit}>
        <Plus size={18} /> New Visit
      </button>
      <div className="timeline-scroll">
        {visits.map((visit, index) => (
          <button
            key={visit.id}
            className={`timeline-item ${selectedVisitId === visit.id ? 'active' : ''}`}
            onClick={() => onSelectVisit(visit.id)}
          >
            <Calendar size={14} />
            <span className="visit-date">{formatDate(visit.date)}</span>
            <span className="visit-num">Visit {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

interface TemplateSelectorProps {
  selected: 'ANC' | 'GYNE' | 'GENERAL';
  onChange: (template: 'ANC' | 'GYNE' | 'GENERAL') => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selected, onChange }) => {
  const templates: Array<{ key: 'ANC' | 'GYNE' | 'GENERAL'; label: string }> = [
    { key: 'ANC', label: 'ANC' },
    { key: 'GYNE', label: 'Gynecology' },
    { key: 'GENERAL', label: 'General' },
  ];

  return (
    <div className="template-selector">
      {templates.map((t) => (
        <button
          key={t.key}
          className={`template-btn ${selected === t.key ? 'active' : ''}`}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};
