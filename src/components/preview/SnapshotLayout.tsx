import React from 'react';
import type { AnyBiodataData, HinduPersonalInfo, MuslimPersonalInfo, DesignTheme, ReligionTemplate, ThemeStyleTokens } from '../../types';
import { ThemeOrnament } from './shared/ThemeOrnament';
import { ThemeAvatarPlaceholder } from './shared/ThemeAvatarPlaceholder';
import { SnapshotDetailBlock } from './shared/DetailBlock';
import { THEME_CONFIG } from '../../data/themeConfig';

interface SnapshotLayoutProps {
  data: AnyBiodataData;
  theme: DesignTheme;
  religionTemplate: ReligionTemplate;
}

export const SnapshotLayout: React.FC<SnapshotLayoutProps> = ({ data, theme, religionTemplate }) => {
  const { personal, professional, family, contact, image } = data;
  const styles: ThemeStyleTokens = THEME_CONFIG[theme];

  const hinduPersonal = personal as HinduPersonalInfo;
  const muslimPersonal = personal as MuslimPersonalInfo;

  const footerText = religionTemplate === 'muslim'
    ? 'We warmly welcome family introductions and Nikah coordination.'
    : 'We warmly invite matching family proposals or horoscope coordination.';

  return (
    <div
      id="biodata-print-section"
      className={`${styles.cardBg} ${styles.primaryText} border-[14px] ${styles.outerBorder} p-6 shadow-2xl relative w-[700px] h-[700px] flex flex-col justify-between overflow-hidden mx-auto aspect-square`}
    >
      <div className={`border-2 ${styles.innerBorder} p-5 flex-1 flex flex-col justify-between h-full relative`}>

        <div className="text-center pt-1 pb-1">
          <span className={`${styles.labelFont} ${styles.accentText} block text-[9px] uppercase tracking-[0.2em] opacity-80 mb-0.5`}>
            Matrimonial Profile
          </span>
          <h2 className={`${styles.headingFont} text-[30px] leading-none text-current font-normal ${styles.accentText}`}>
            {personal.name || 'Your Name'}
          </h2>
          <p className={`${styles.headingFont} text-[10px] tracking-[0.14em] text-stone-500 uppercase mt-1`}>
            Profile Snapshot
          </p>
        </div>

        <ThemeOrnament theme={theme} />

        <div className="grid grid-cols-12 gap-6 items-stretch flex-1 my-3">

          <div className="col-span-5 flex flex-col justify-between h-full space-y-4">
            <div className={`aspect-[3/4] w-full border-[5px] border-white rounded-2xl overflow-hidden shadow-md ${styles.outerBorder} bg-white relative`}>
              {image ? (
                <img src={image} alt="Snapshot Canvas" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <ThemeAvatarPlaceholder theme={theme} />
              )}
            </div>

            <div className={`${styles.boxBg} p-3 rounded-xl border ${styles.boxOuterBorder} space-y-1.5 shadow-xs`}>
              <span className={`text-[9.5px] uppercase font-bold tracking-widest ${styles.descriptorLabel} block text-center`}>
                Contact Directory
              </span>
              <div className="space-y-1 text-center justify-center">
                {contact.phone && (
                  <div className="text-[13px] font-bold tracking-wide text-center">
                    <span className={`${theme === 'minimalist' ? 'font-sans' : 'font-warm'} text-current`}>{contact.phone}</span>
                  </div>
                )}
                {contact.email && (
                  <div className="text-[11px] truncate max-w-[200px] mx-auto text-stone-500 font-sans tracking-tight">
                    <span>{contact.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-7 flex flex-col justify-between h-full pr-1 space-y-3.5">

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className={`${styles.boxBg} border ${styles.boxOuterBorder} rounded-xl py-2 px-0.5 shadow-2xs`}>
                <span className={`text-[9px] uppercase tracking-wider block ${styles.descriptorLabel} font-bold opacity-80 mb-0.5`}>Age Status</span>
                <span className={`font-semibold ${theme === 'minimalist' ? 'text-[12.5px] font-sans' : 'text-[14.5px] font-warm'}`}>{personal.age} Years</span>
              </div>
              <div className={`${styles.boxBg} border ${styles.boxOuterBorder} rounded-xl py-2 px-0.5 shadow-2xs`}>
                <span className={`text-[9px] uppercase tracking-wider block ${styles.descriptorLabel} font-bold opacity-80 mb-0.5`}>Height</span>
                <span className={`font-semibold ${theme === 'minimalist' ? 'text-[12.5px] font-sans' : 'text-[14.5px] font-warm'}`}>{personal.height}</span>
              </div>
              <div className={`${styles.boxBg} border ${styles.boxOuterBorder} rounded-xl py-2 px-0.5 shadow-2xs`}>
                <span className={`text-[9px] uppercase tracking-wider block ${styles.descriptorLabel} font-bold opacity-80 mb-0.5`}>Weight</span>
                <span className={`font-semibold ${theme === 'minimalist' ? 'text-[12.5px] font-sans' : 'text-[14.5px] font-warm'} block truncate`}>{personal.weight}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] p-3 bg-stone-50/50 rounded-xl border border-stone-200/40 shadow-2xs">
              <div className="border-r border-stone-200/60 pr-1.5 text-left">
                <span className={`text-[9px] uppercase tracking-wider block ${styles.descriptorLabel} font-bold mb-0.5`}>Father</span>
                <span className={`font-semibold block ${theme === 'minimalist' ? 'text-[12.5px] font-sans' : 'text-[14px] font-warm'}`} title={`${family.fatherName} (${family.fatherOccupation})`}>
                  <span className="block truncate">{family.fatherName}</span>
                  {family.fatherOccupation && (
                    <span className="block text-[11px] font-normal text-stone-500 truncate mt-0.5" title={family.fatherOccupation}>
                      {family.fatherOccupation}
                    </span>
                  )}
                </span>
              </div>
              <div className="pl-1.5 text-left">
                <span className={`text-[9px] uppercase tracking-wider block ${styles.descriptorLabel} font-bold mb-0.5`}>Mother</span>
                <span className={`font-semibold block ${theme === 'minimalist' ? 'text-[12.5px] font-sans' : 'text-[14px] font-warm'}`} title={`${family.motherName} (${family.motherOccupation})`}>
                  <span className="block truncate">{family.motherName}</span>
                  {family.motherOccupation && (
                    <span className="block text-[11px] font-normal text-stone-500 truncate mt-0.5" title={family.motherOccupation}>
                      {family.motherOccupation}
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-3.5 bg-[#FFFFFF]/45 p-4 rounded-xl border border-stone-200/60 flex-1 flex flex-col justify-center min-h-0 shadow-2xs">
              <div className="grid grid-cols-2 gap-y-3.5 gap-x-2">
                {religionTemplate === 'hindu' ? (
                  <>
                    <SnapshotDetailBlock label="Caste / Gotra" value={`${hinduPersonal.caste}${hinduPersonal.gotra ? ` (${hinduPersonal.gotra})` : ''}`} theme={theme} />
                    <SnapshotDetailBlock label="Sibling Info" value={family.siblings} theme={theme} />
                    <SnapshotDetailBlock label="Rashi / Moon Sign" value={hinduPersonal.moonSign} theme={theme} />
                    <SnapshotDetailBlock label="Birth Nakshatra" value={hinduPersonal.nakshatra} theme={theme} />
                    <SnapshotDetailBlock label="Complexion" value={personal.complexion} theme={theme} />
                  </>
                ) : (
                  <>
                    <SnapshotDetailBlock label="Sect" value={muslimPersonal.sect} theme={theme} />
                    <SnapshotDetailBlock label="Maslak" value={muslimPersonal.maslak} theme={theme} />
                    <SnapshotDetailBlock label="Religious Practice" value={muslimPersonal.religiosity} theme={theme} />
                    <SnapshotDetailBlock label="Mehr Preference" value={muslimPersonal.mehrPreference} theme={theme} />
                    <SnapshotDetailBlock label="Complexion" value={personal.complexion} theme={theme} />
                  </>
                )}
                <div className="col-span-2 border-t border-dashed border-stone-200/60 pt-3">
                  <SnapshotDetailBlock label="Corporate Vocation" value={`${professional.occupation} at ${professional.company}`} theme={theme} />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className={`text-center pt-2.5 border-t ${styles.stoneHr} text-[8.5px] uppercase tracking-widest opacity-85`}>
          <span>{footerText}</span>
        </div>

      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${styles.bottomBand} w-full`} />
    </div>
  );
};
