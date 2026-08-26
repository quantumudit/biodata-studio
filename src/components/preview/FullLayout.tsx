import React from 'react';
import type { AnyBiodataData, HinduPersonalInfo, MuslimPersonalInfo, DesignTheme, ReligionTemplate, ThemeStyleTokens } from '../../types';
import { ThemeOrnament } from './shared/ThemeOrnament';
import { ThemeAvatarPlaceholder } from './shared/ThemeAvatarPlaceholder';
import { DetailBlock } from './shared/DetailBlock';
import { HinduPersonalBlock } from './shared/HinduPersonalBlock';
import { MuslimPersonalBlock } from './shared/MuslimPersonalBlock';
import { THEME_CONFIG } from '../../data/themeConfig';

interface FullLayoutProps {
  data: AnyBiodataData;
  theme: DesignTheme;
  religionTemplate: ReligionTemplate;
}

export const FullLayout: React.FC<FullLayoutProps> = ({ data, theme, religionTemplate }) => {
  const { personal, professional, family, contact, partnerPreferences, image } = data;
  const styles: ThemeStyleTokens = THEME_CONFIG[theme];

  const footerText = religionTemplate === 'muslim'
    ? 'To coordinate a family introduction or request further conversation, you are kindly welcome to reach out.'
    : 'To coordinate horoscope checks or request further conversation, you are kindly welcome to reach out.';

  return (
    <div
      id="biodata-print-section"
      className={`${styles.cardBg} ${styles.primaryText} border-[16px] ${styles.outerBorder} p-10 shadow-2xl relative w-[760px] h-[1050px] flex flex-col justify-between overflow-hidden print:shadow-none print:border-[12px] print:p-8 print:w-[210mm] print:h-[297mm] print:mx-auto`}
    >
      <div className={`border-2 ${styles.innerBorder} p-6 flex-1 flex flex-col justify-between h-full relative`}>

        <div className="text-center pt-2 pb-1">
          <span className={`${styles.labelFont} ${styles.accentText} font-bold opacity-80 tracking-[0.25em] block mb-1`}>
            Matrimonial Biography
          </span>
          <h1 className={`${styles.headingFont} text-[36px] font-normal leading-none ${styles.accentText}`}>
            {personal.name || 'Your Name'}
          </h1>
          <div className={`mt-2 flex items-center justify-center gap-2 text-xs opacity-80 ${styles.valueFont}`}>
            <span>{professional.occupation}</span>
            <span className="opacity-40">•</span>
            <span>{professional.location.split('(')[0]}</span>
          </div>
        </div>

        <ThemeOrnament theme={theme} />

        <div className="grid grid-cols-12 gap-7 flex-1 my-3 items-stretch content-start">

          <div className="col-span-4 flex flex-col justify-between space-y-6 h-full">
            <div className="w-full">
              <div className={`aspect-[3/4] w-full border-[6px] border-white rounded-3xl overflow-hidden shadow-md ${styles.outerBorder} bg-white relative`}>
                {image ? (
                  <img src={image} alt="Portrait Canvas" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <ThemeAvatarPlaceholder theme={theme} />
                )}
              </div>
            </div>

            <div className={`${styles.boxBg} p-4 rounded-2xl border ${styles.boxOuterBorder} flex-1 flex flex-col justify-center space-y-4`}>
              <h3 className={`${styles.headingFont} text-[12px] text-center uppercase tracking-widest ${styles.accentText} border-b pb-2 ${styles.stoneHr}`}>
                Contact Channels
              </h3>
              <div className="space-y-4">
                {contact.phone && (
                  <div className="space-y-0.5">
                    <span className={`${styles.labelFont} ${styles.descriptorLabel} opacity-75 block`}>Phone Coordinate</span>
                    <span className={`text-sm font-semibold tracking-wide ${styles.valueFont}`}>{contact.phone}</span>
                  </div>
                )}
                {contact.email && (
                  <div className="space-y-0.5 max-w-full">
                    <span className={`${styles.labelFont} ${styles.descriptorLabel} opacity-75 block`}>Email Directory</span>
                    <span className={`text-xs font-semibold block break-all leading-tight ${styles.valueFont}`}>{contact.email}</span>
                  </div>
                )}
                {contact.address && (
                  <div className="space-y-0.5">
                    <span className={`${styles.labelFont} ${styles.descriptorLabel} opacity-75 block`}>Current Location</span>
                    <span className={`text-[11px] leading-relaxed block ${styles.valueFont}`}>{contact.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-8 flex flex-col justify-between h-full space-y-4">

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className={`${styles.headingFont} text-sm uppercase tracking-widest ${styles.accentText}`}>
                  Personal Particulars
                </h3>
                <span className={`h-[1px] flex-1 ${styles.stoneHr}`} />
              </div>
              {religionTemplate === 'hindu'
                ? <HinduPersonalBlock personal={personal as HinduPersonalInfo} styles={styles} />
                : <MuslimPersonalBlock personal={personal as MuslimPersonalInfo} styles={styles} />}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className={`${styles.headingFont} text-sm uppercase tracking-widest ${styles.accentText}`}>
                  Professional Stature
                </h3>
                <span className={`h-[1px] flex-1 ${styles.stoneHr}`} />
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                <div className="col-span-2">
                  <DetailBlock label="Highest Academic Qualification" value={professional.education} styles={styles} />
                </div>
                <DetailBlock label="Corporate Role / Stature" value={professional.occupation} styles={styles} />
                <DetailBlock label="Associated Company" value={professional.company} styles={styles} />
                <DetailBlock label="Annual Revenue range" value={professional.income} styles={styles} />
                <DetailBlock label="Present Station" value={professional.location} styles={styles} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className={`${styles.headingFont} text-sm uppercase tracking-widest ${styles.accentText}`}>
                  Family Ancestry & Roots
                </h3>
                <span className={`h-[1px] flex-1 ${styles.stoneHr}`} />
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                <DetailBlock
                  label="Father"
                  value={
                    <span>
                      <span className="block font-semibold">{family.fatherName}</span>
                      {family.fatherOccupation && (
                        <span className="block text-xs font-normal text-stone-500 mt-0.5">{family.fatherOccupation}</span>
                      )}
                    </span>
                  }
                  styles={styles}
                />
                <DetailBlock
                  label="Mother"
                  value={
                    <span>
                      <span className="block font-semibold">{family.motherName}</span>
                      {family.motherOccupation && (
                        <span className="block text-xs font-normal text-stone-500 mt-0.5">{family.motherOccupation}</span>
                      )}
                    </span>
                  }
                  styles={styles}
                />
                <DetailBlock label="Sibling Information" value={family.siblings} styles={styles} />
                <DetailBlock label="Native Background" value={family.nativePlace} styles={styles} />
              </div>
            </div>

          </div>
        </div>

        {partnerPreferences && (
          <div className={`mt-3 pt-3.5 border-t-2 border-dashed ${styles.innerBorder}`}>
            <div className={`${styles.boxBg} p-4 rounded-2xl border ${styles.boxOuterBorder} text-center`}>
              <span className={`${styles.labelFont} ${styles.accentText} font-bold block mb-1.5`}>
                Partner Preferences & Union Goals
              </span>
              <p className={`${styles.valueFont} italic text-sm leading-relaxed max-w-2xl mx-auto text-current/90`}>
                "{partnerPreferences}"
              </p>
            </div>
          </div>
        )}

        <div className={`text-center pt-3 text-[9px] uppercase tracking-[0.2em] opacity-80 border-t ${styles.stoneHr}`}>
          {footerText}
        </div>

      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-2 ${styles.bottomBand} w-full`} />
    </div>
  );
};
