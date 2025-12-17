import React from 'react';
import type { VisitRecord } from '../../types';
import {
  LabelInput,
  ToggleGroup,
  SectionHeader,
  TextAreaInput,
} from '../ui/FormElements';
import { Activity, Stethoscope, NotebookPen } from 'lucide-react';

interface GyneFormProps {
  visit: VisitRecord;
  onChange: (updated: VisitRecord) => void;
}

export const GyneForm: React.FC<GyneFormProps> = ({ visit, onChange }) => {
  const updateField = <K extends keyof VisitRecord>(key: K, value: VisitRecord[K]) => {
    onChange({ ...visit, [key]: value });
  };

  return (
    <div className="gyne-form">
      {/* Section 1: Vitals */}
      <section className="form-section">
        <SectionHeader title="Vitals" icon={<Activity size={18} />} />
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

      {/* Section 2: Gyne Examination */}
      <section className="form-section">
        <SectionHeader title="Gynecological Examination" icon={<Stethoscope size={18} />} />
        <div className="form-grid">
          <LabelInput
            label="P/V Exam"
            value={visit.pvExam}
            onChange={(v) => updateField('pvExam', v)}
            placeholder="Findings"
          />
          {/* Placeholder fields for Gyne-specific data */}
          <LabelInput
            label="P/S Exam"
            value=""
            onChange={() => {}}
            placeholder="Per Speculum"
          />
          <LabelInput
            label="Cervix"
            value=""
            onChange={() => {}}
            placeholder="Description"
          />
          <LabelInput
            label="Uterus"
            value=""
            onChange={() => {}}
            placeholder="Size, Position"
          />
        </div>
      </section>

      {/* Section 3: Plan */}
      <section className="form-section">
        <SectionHeader title="Plan & Remarks" icon={<NotebookPen size={18} />} />
        <TextAreaInput
          label="Remarks"
          value={visit.remarks}
          onChange={(v) => updateField('remarks', v)}
          placeholder="Notes, investigations, follow-up..."
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
