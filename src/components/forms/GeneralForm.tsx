import React from 'react';
import type { VisitRecord } from '../../types';
import {
  LabelInput,
  ToggleGroup,
  SectionHeader,
  TextAreaInput,
} from '../ui/FormElements';
import { Activity, NotebookPen } from 'lucide-react';

interface GeneralFormProps {
  visit: VisitRecord;
  onChange: (updated: VisitRecord) => void;
}

export const GeneralForm: React.FC<GeneralFormProps> = ({ visit, onChange }) => {
  const updateField = <K extends keyof VisitRecord>(key: K, value: VisitRecord[K]) => {
    onChange({ ...visit, [key]: value });
  };

  return (
    <div className="general-form">
      {/* Section 1: Vitals */}
      <section className="form-section">
        <SectionHeader title="General Vitals" icon={<Activity size={18} />} />
        <div className="form-grid">
          <LabelInput
            label="Weight"
            value={visit.weight}
            onChange={(v) => updateField('weight', parseFloat(v) || undefined)}
            type="number"
            unit="kg"
          />
          <div className="bp-group">
            <label>Blood Pressure</label>
            <div className="bp-inputs">
              <input
                type="number"
                value={visit.bpSystolic ?? ''}
                onChange={(e) => updateField('bpSystolic', parseFloat(e.target.value) || undefined)}
                placeholder="Sys"
              />
              <span>/</span>
              <input
                type="number"
                value={visit.bpDiastolic ?? ''}
                onChange={(e) => updateField('bpDiastolic', parseFloat(e.target.value) || undefined)}
                placeholder="Dia"
              />
              <span className="unit">mmHg</span>
            </div>
          </div>
          <LabelInput
            label="Temperature"
            value=""
            onChange={() => {}}
            type="number"
            unit="°F"
            placeholder="e.g. 98.6"
          />
          <LabelInput
            label="Pulse"
            value=""
            onChange={() => {}}
            type="number"
            unit="bpm"
            placeholder="e.g. 72"
          />
          <ToggleGroup
            label="Pallor"
            options={[
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ]}
            value={String(visit.pallor)}
            onChange={(v) => updateField('pallor', v === 'true')}
          />
        </div>
      </section>

      {/* Section 2: Plan */}
      <section className="form-section">
        <SectionHeader title="Diagnosis & Plan" icon={<NotebookPen size={18} />} />
        <TextAreaInput
          label="Provisional Diagnosis"
          value=""
          onChange={() => {}}
          placeholder="Enter diagnosis..."
          rows={2}
        />
        <TextAreaInput
          label="Plan / Prescription"
          value={visit.remarks}
          onChange={(v) => updateField('remarks', v)}
          placeholder="Medications, investigations, advice..."
          rows={4}
        />
        <div className="form-grid" style={{ marginTop: '1rem' }}>
          <LabelInput
            label="Next Visit Date"
            value={visit.nextVisitDate}
            onChange={(v) => updateField('nextVisitDate', v)}
            type="date"
          />
          <LabelInput
            label="Seen By"
            value={visit.seenBy}
            onChange={(v) => updateField('seenBy', v)}
            placeholder="Doctor name"
          />
        </div>
      </section>

      {/* Complaints */}
      <section className="form-section complaints-section">
        <SectionHeader title="Chief Complaints" />
        <TextAreaInput
          label=""
          value={visit.complaints}
          onChange={(v) => updateField('complaints', v)}
          placeholder="Patient's presenting complaints..."
          rows={2}
        />
      </section>
    </div>
  );
};
