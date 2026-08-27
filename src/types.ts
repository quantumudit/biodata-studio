export interface BasePersonalInfo {
  name: string;
  age: number;
  dob: string;
  height: string;
  weight: string;
  complexion: string;
}

export interface HinduPersonalInfo extends BasePersonalInfo {
  religion: string;
  caste: string;
  gotra: string;
  moonSign: string;
  nakshatra: string;
}

export interface MuslimPersonalInfo extends BasePersonalInfo {
  sect: string;
  maslak: string;
  religiosity: string;
  mehrPreference: string;
}

export interface ProfessionalInfo {
  education: string;
  occupation: string;
  company: string;
  income: string;
  location: string;
}

export interface FamilyInfo {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  familyType: string;
  nativePlace: string;
  currentLocation: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface BiodiversityData {
  personal: HinduPersonalInfo;
  professional: ProfessionalInfo;
  family: FamilyInfo;
  contact: ContactInfo;
  partnerPreferences: string;
  image: string | null;
}

export interface MuslimBiodataData {
  personal: MuslimPersonalInfo;
  professional: ProfessionalInfo;
  family: FamilyInfo;
  contact: ContactInfo;
  partnerPreferences: string;
  image: string | null;
}

export interface ChristianPersonalInfo extends BasePersonalInfo {
  denomination: string;
  diocese: string;
  parish: string;
  baptism: string;
  confirmation: string;
}

export interface ChristianBiodataData {
  personal: ChristianPersonalInfo;
  professional: ProfessionalInfo;
  family: FamilyInfo;
  contact: ContactInfo;
  partnerPreferences: string;
  image: string | null;
}

export type AnyBiodataData = BiodiversityData | MuslimBiodataData | ChristianBiodataData;

export type LayoutOption = 'full' | 'snapshot';
export type DesignTheme = 'natural' | 'royal' | 'minimalist' | 'sunset' | 'emerald' | 'sapphire';
export type ReligionTemplate = 'hindu' | 'muslim' | 'christian';

export interface ThemeStyleTokens {
  cardBg: string;
  outerBorder: string;
  innerBorder: string;
  primaryText: string;
  accentText: string;
  descriptorLabel: string;
  stoneHr: string;
  bottomBand: string;
  boxBg: string;
  boxOuterBorder: string;
  headingFont: string;
  valueFont: string;
  labelFont: string;
}

export interface ThemeConfig extends ThemeStyleTokens {
  label: string;
  swatchColor: string;
  exportBgColor: string;
  hoverBorderClass: string;
}

export type ThemeConfigMap = Record<DesignTheme, ThemeConfig>;

export interface FormFieldDef {
  section: 'personal' | 'professional' | 'family' | 'contact';
  field: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'textarea';
  placeholder?: string;
  colSpan?: 1 | 2 | 3;
  rows?: number;
}

export type FormFieldMap = Record<'personal' | 'professional' | 'family' | 'contact', FormFieldDef[]>;
