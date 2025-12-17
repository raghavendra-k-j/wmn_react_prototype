# Gynecology Record Form Fields

This document details all fields for Gynecology visits. Demographics are captured in `common_fields.md` and shared across all visit types.

---

## Page 1: Gynecology Record (Initial Assessment)

### Patient Identification
*See `common_fields.md` for shared demographics*

| Field | Type | Options/Notes |
|-------|------|---------------|
| NAME | String | From patient profile |
| AGE | Number | From patient profile |

### Menstrual & Reproductive History

| Field | Type | Options/Notes |
|-------|------|---------------|
| LMP (Last Menstrual Period) | Date | Most recent period start date |
| Para | String | Obstetric summary (e.g., P2L2) |
| Menstrual Cycles | Enum | Regular / Irregular |
| Cycle Length | String | e.g., "28-30 days" |
| Cycle Duration | String | e.g., "4-5 days" |
| Flow | Enum | Scanty / Normal / Heavy |
| Dysmenorrhea | Boolean | Yes / No |
| Intermenstrual Bleeding | Boolean | Yes / No |
| Post-coital Bleeding | Boolean | Yes / No |
| Contraception | Enum | Nil / Natural / OCP / IUD / Injection / Barrier / Sterilization |
| Previous Smear | Enum | Nil / Normal / Abnormal |
| Last Smear Date | Date | If applicable |

### Chief Complaints

| Field | Type | Options/Notes |
|-------|------|---------------|
| Presenting Complaints | Text | Free text - main reason for visit |
| Duration | String | How long symptoms present |
| Micturition | Text | Urinary symptoms (frequency, burning, incontinence) |
| Bowels | Text | Bowel symptoms (constipation, bleeding) |

### Past Medical History (Checkboxes)

| Field | Type | Options/Notes |
|-------|------|---------------|
| Diabetes | Boolean | Yes / No |
| Hypertension | Boolean | Yes / No |
| Thyroid Dysfunction | Boolean | Yes / No |
| Migraine | Boolean | Yes / No |
| Cardiac | Boolean | Yes / No |
| Epilepsy | Boolean | Yes / No |
| Asthma | Boolean | Yes / No |
| TB (Tuberculosis) | Boolean | Yes / No |
| Blood Transfusion | Boolean | Yes / No |
| Surgery | String | If Yes, describe |
| Thromboembolism | Boolean | Yes / No |
| Any Other | Text | Free text for other conditions |

### Family History (Checkboxes)

| Field | Type | Options/Notes |
|-------|------|---------------|
| Diabetes | Boolean | Yes / No |
| Hypertension | Boolean | Yes / No |
| Thyroid Dysfunction | Boolean | Yes / No |
| TB | Boolean | Yes / No |
| Cancers | String | If Yes, specify type |
| IHD/CVA | Boolean | Ischemic Heart Disease / Stroke |
| Thromboembolism | Boolean | Yes / No |
| Psychiatric Problems | Boolean | Yes / No |

### Personal History

| Field | Type | Options/Notes |
|-------|------|---------------|
| Allergies | String[] | List of known allergies |
| Smoking | Boolean | Yes / No |
| Alcohol | Boolean | Yes / No |
| Psychological Stress | Boolean | Yes / No |
| Marital Status | Enum | Single / Married / Divorced / Widowed |
| Years of Marriage | Number | If applicable |
| Sexual Activity | Boolean | Sexually active Yes / No |

---

## Page 2: Examination & Advice

### Current Medications

| Field | Type | Options/Notes |
|-------|------|---------------|
| Present Medications | Text | Current drugs patient is taking |

### Physical Examination

| Field | Type | Options/Notes |
|-------|------|---------------|
| Height | Number | In cm |
| Weight | Number | In kg |
| BMI | Number | Calculated: Weight / Height² |
| Pallor | Boolean | Present / Absent |
| Goiter | Boolean | Present / Absent |
| Pulse | Number | Beats per minute |
| BP (Blood Pressure) | String | Systolic/Diastolic mmHg |

### Systemic Examination

| Field | Type | Options/Notes |
|-------|------|---------------|
| CVS (Cardiovascular System) | Text | Normal / Findings |
| Breasts | Text | Normal / Findings (lumps, discharge) |
| RS (Respiratory System) | Text | Normal / Findings |
| P/A (Per Abdomen) | Text | Soft / Tender / Mass palpable / Findings |

### Vaginal Examination (VE)

| Field | Type | Options/Notes |
|-------|------|---------------|
| V & V (Vulva & Vagina) | Text | Healthy / Discharge / Lesions |
| Cervix | Text | Healthy / Eroded / Cervicitis / Polyp |
| Uterus | Text | Normal size / Bulky / Anteverted / Retroverted / Mobile |
| Adnexa | Text | Free / Mass palpable / Tenderness |

### Clinical Assessment

| Field | Type | Options/Notes |
|-------|------|---------------|
| Impression | Text | Provisional diagnosis |
| Differential Diagnosis | Text | Other possible conditions |

### Investigations Advised

| Field | Type | Options/Notes |
|-------|------|---------------|
| Pap Smear | Boolean | Advised Yes / No |
| USG Pelvis | Boolean | Advised Yes / No |
| USG TVS (Transvaginal) | Boolean | Advised Yes / No |
| Blood Tests | String[] | CBC, Thyroid, Hormonal profile, etc. |
| Urine Tests | Boolean | Advised Yes / No |
| Other Investigations | Text | Free text |

### Treatment & Advice

| Field | Type | Options/Notes |
|-------|------|---------------|
| Advice | Text | Free text - treatment plan and recommendations |
| Medications Prescribed | Text | Drugs prescribed with dosage |
| Procedure Planned | Text | If any procedure is planned |
| Referral | String | Referral to specialist if needed |
| Follow-up Date | Date | Next appointment |
| Doctor's Signature | String | Treating physician |

---

## Gynecology Visit Types

| Visit Type | Description |
|------------|-------------|
| **New Consultation** | First visit - full history and examination |
| **Follow-up** | Review visit - focused on specific concern |
| **Procedure** | Planned procedure visit (biopsy, IUD insertion, etc.) |
| **Review Results** | Post-investigation review |

---

## Common Gynecology Conditions

For reference during impression/diagnosis:

| Category | Conditions |
|----------|------------|
| **Menstrual Disorders** | Menorrhagia, Dysmenorrhea, Amenorrhea, PCOD, Oligomenorrhea |
| **Infections** | Vaginitis, Cervicitis, PID, UTI |
| **Structural** | Fibroid, Ovarian Cyst, Endometriosis, Polyp |
| **Prolapse** | Uterine Prolapse, Cystocele, Rectocele |
| **Fertility** | Infertility Evaluation, Anovulation |
| **Menopause** | Perimenopausal, Postmenopausal symptoms |
| **Cancer Screening** | Cervical, Endometrial, Ovarian |