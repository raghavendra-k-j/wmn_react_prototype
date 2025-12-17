import React from 'react';
import type { VisitRecord } from '../../types';
import {
  LabelInput,
  ToggleGroup,
  SectionHeader,
  TextAreaInput,
} from '../ui/FormElements';
import { Activity, Stethoscope, FlaskConical, NotebookPen } from 'lucide-react';

interface ANCFormProps {
  visit: VisitRecord;
  onChange: (updated: VisitRecord) => void;
  weeksFromLmp?: number;
}

export const ANCForm: React.FC<ANCFormProps> = ({ visit, onChange, weeksFromLmp }) => {
  const updateField = <K extends keyof VisitRecord>(key: K, value: VisitRecord[K]) => {
    onChange({ ...visit, [key]: value });
  };

  return (
    <div className="anc-form">
      {/* Section 1: Vitals */}
      <section className="form-section">
        <SectionHeader title="Vitals & Physical Status" icon={<Activity size={18} />} />
        <div className="form-grid">
          <LabelInput
            label="Weight"
            value={visit.weight}
            onChange={(v) => updateField('weight', parseFloat(v) || undefined)}
            type="number"
            unit="kg"
            placeholder="e.g. 56"
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
          <div className="label-input weeks-display">
            <label>Gestational Weeks</label>
            <div className="computed-value">{weeksFromLmp ?? visit.weeksFromLmp ?? '—'} wks</div>
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
          <ToggleGroup
            label="Pedal Edema"
            options={[
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ]}
            value={String(visit.pedalEdema)}
            onChange={(v) => updateField('pedalEdema', v === 'true')}
          />
        </div>
      </section>

      {/* Section 2: Examination */}
      <section className="form-section">
        <SectionHeader title="Obstetric Examination" icon={<Stethoscope size={18} />} />
        <div className="form-grid">
          <LabelInput
            label="SFH"
            value={visit.sfh}
            onChange={(v) => updateField('sfh', parseFloat(v) || undefined)}
            type="number"
            unit="cm"
            placeholder="Fundal Height"
          />
          <LabelInput
            label="Fetal Heart Rate"
            value={visit.fetalHeartRate}
            onChange={(v) => updateField('fetalHeartRate', parseFloat(v) || undefined)}
            type="number"
            unit="bpm"
            placeholder="e.g. 140"
          />
          <LabelInput
            label="Fetal Position (P/A)"
            value={visit.fetalPosition}
            onChange={(v) => updateField('fetalPosition', v)}
            placeholder="e.g. Cephalic"
          />
          <LabelInput
            label="P/V Exam"
            value={visit.pvExam}
            onChange={(v) => updateField('pvExam', v)}
            placeholder="If applicable"
          />
        </div>
      </section>

      {/* Section 3: Quick Labs */}
      <section className="form-section">
        <SectionHeader title="Quick Lab Entry" icon={<FlaskConical size={18} />} />
        <div className="form-grid">
          <LabelInput
            label="Urine Albumin"
            value={visit.urineAlbumin}
            onChange={(v) => updateField('urineAlbumin', v)}
            placeholder="Nil / Trace / +"
          />
          <LabelInput
            label="Urine Sugar"
            value={visit.urineSugar}
            onChange={(v) => updateField('urineSugar', v)}
            placeholder="Nil / +"
          />
        </div>
      </section>

      {/* Section 4: Plan */}
      <section className="form-section">
        <SectionHeader title="Plan & Remarks" icon={<NotebookPen size={18} />} />
        <TextAreaInput
          label="Remarks / Plan for Management"
          value={visit.remarks}
          onChange={(v) => updateField('remarks', v)}
          placeholder="Notes, medications, follow-up instructions..."
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

      {/* Complaints at top conceptually, but placed here for flow */}
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
