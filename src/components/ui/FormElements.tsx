import React from 'react';

interface LabelInputProps {
  label: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'date';
  unit?: string;
  placeholder?: string;
  className?: string;
}

export const LabelInput: React.FC<LabelInputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  unit,
  placeholder,
  className = '',
}) => (
  <div className={`label-input ${className}`}>
    <label>{label}</label>
    <div className="input-wrapper">
      <input
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {unit && <span className="unit">{unit}</span>}
    </div>
  </div>
);

interface ToggleGroupProps {
  label: string;
  options: { label: string; value: string }[];
  value: string | boolean | undefined;
  onChange: (value: string) => void;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  label,
  options,
  value,
  onChange,
}) => (
  <div className="toggle-group">
    <label>{label}</label>
    <div className="toggle-options">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`toggle-btn ${String(value) === opt.value ? 'active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon }) => (
  <div className="section-header">
    {icon && <span className="section-icon">{icon}</span>}
    <h3>{title}</h3>
  </div>
);

interface TextAreaInputProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}) => (
  <div className="textarea-input">
    <label>{label}</label>
    <textarea
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  </div>
);
