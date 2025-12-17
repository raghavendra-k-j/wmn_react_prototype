# Common Demographic Fields

These fields are shared across ANC, Gynecology, and General patient records. They are captured **once** at patient registration and can be edited from the patient profile.

## Patient Demographics (Shared)

| Field | Type | Notes |
|-------|------|-------|
| **UHID No.** | String | Unique Hospital Identifier - auto-generated |
| **Patient Name** | String | Full name |
| **Age** | Number | Years |
| **Date of Birth** | Date | Optional - can calculate from age |
| **Husband/Father Name (W/O or D/O)** | String | Spouse or father name |
| **Spouse Occupation** | String | Optional |
| **Patient Occupation** | String | Optional |
| **Address** | String | Full address |
| **Area/Locality** | String | Optional - for local area |
| **Mobile No.** | String | Primary contact number |
| **Blood Group** | Enum | A, B, AB, O |
| **Rh Status** | Enum | Positive, Negative |
| **Husband's Blood Group** | String | Required if patient is Rh-ve |

## Allergies (Shared)

| Field | Type | Notes |
|-------|------|-------|
| **Allergies** | String[] | List of known allergies |

---

## Notes on Field Separation

While the following fields **appear similar** in both ANC and Gynecology forms, they should be **captured separately per visit type** because values may differ or have context-specific meaning:

### Captured Separately (NOT shared across visit types):

1. **Medical History** - Same checkboxes but recorded per context
   - Diabetes, Hypertension, Thyroid, Migraine, Cardiac, Epilepsy, Asthma, TB, 
   - Blood Transfusion, Surgery, Thromboembolism, Psychiatric Problems

2. **Family History** - Same checkboxes but recorded per context
   - Diabetes, Hypertension, Thyroid, TB, Cancers, IHD/CVA, Thromboembolism

3. **Personal History** - Same checkboxes but recorded per context
   - Smoking, Alcohol, Psychological Stress

4. **Vitals** (Per Visit) - Always captured fresh each visit
   - Weight, Height, BMI, BP, Pulse, Pallor

5. **LMP** - Different context for ANC (pregnancy dating) vs Gynae (menstrual history)

6. **Menstrual Cycle** - Regular/Irregular status

7. **Present Medications** - May differ per specialty context

---

## Summary

| Category | Shared? | Reason |
|----------|---------|--------|
| Demographics (Name, Age, Address, UHID, Contact) | ✅ Yes | Patient identity - never changes |
| Blood Group & Rh Status | ✅ Yes | Constant patient attribute |
| Allergies | ✅ Yes | Safety-critical, visible everywhere |
| Medical/Family/Personal History | ❌ No | Context-specific, may be recorded differently |
| Vitals | ❌ No | Time-specific, captured per visit |
| LMP | ❌ No | Different meaning in ANC vs Gynae |
| Menstrual Cycle | ❌ No | May be recorded with different detail |
