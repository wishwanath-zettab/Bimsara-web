import { useState, useEffect } from 'react'
import { useSiteData } from '../context/SiteDataContext'
import aboutHero from '../assets/images/about-hero.webp'
import aboutLogo from '../assets/images/about-logo.png'
import isoCert from '../assets/images/iso-certificate.png'
import isoLogo from '../assets/images/iso-logo.png'
import downloadIcon from '../assets/images/download-icon.png'
import safetynetLogo from '../assets/images/safetynet-logo.png'
import linkedinIcon2 from '../assets/images/linkedin-icon.png'
import hitmediaLogo from '../assets/images/hitmedia-logo.webp'

const values = [
  'Upholding the highest ethical standards and fair practices in conducting business.',
  'Being open and transparent in all our dealings.',
  'Protecting and safeguarding the interests of all our stakeholders.',
]

function getImageUrl(filename) {
  if (!filename) return ''
  if (filename.startsWith('data:') || filename.startsWith('http')) return filename
  return `/uploads/${filename}`
}

export default function About() {
  const { data } = useSiteData()
  const [selectedMember, setSelectedMember] = useState(null)

  const teamMembers = data.teamMembers || []

  // Default to first member (Bimsara Gamage) once data loads
  useEffect(() => {
    if (teamMembers.length > 0 && !selectedMember) {
      setSelectedMember(teamMembers[0])
    }
  }, [teamMembers])

  // Always show all members except the selected one as icons
  const otherMembers = selectedMember
    ? teamMembers.filter((m) => m.id !== selectedMember.id)
    : teamMembers

  // First member on left, rest spread on right arc
  const getCirclePosition = (index, total) => {
    const radius = 52
    if (index === 0) {
      const rad = (210 * Math.PI) / 180
      return { x: 50 + radius * Math.cos(rad), y: 50 + radius * Math.sin(rad) }
    }
    const startAngle = -15
    const endAngle = 55
    const rightCount = total - 1
    const angleStep = rightCount > 1 ? (endAngle - startAngle) / (rightCount - 1) : 0
    const angle = startAngle + (index - 1) * angleStep
    const rad = (angle * Math.PI) / 180
    return { x: 50 + radius * Math.cos(rad), y: 50 + radius * Math.sin(rad) }
  }

  // ISO cert: use uploaded file or default static import
  const isoCertSrc = data.isoCertificateImage ? getImageUrl(data.isoCertificateImage) : isoCert

  return (
    <div className="about-bg-lines overflow-x-hidden w-[100vw]">
      {/* ═══════ HERO / Background ═══════ */}
      <section className="relative h-[60vh] lg:h-[95vh]">
        <div className="absolute inset-0">
          <img src={aboutHero} alt="Bimsara Real Estate office" className="w-full h-full object-cover object-bottom" />
        </div>
      </section>

      {/* ═══════ VALUE PROPS (below banner) ═══════ */}
      <section className="mt-[3.58%] mb-[1.8%] pr-[10%]">
        <div className="flex justify-center w-full">
          {['Trusted Advisor', 'Skilled Negotiator', 'Expert Facilitator'].map((title) => (
            <div key={title} className="text-crimson font-lato text-[35px] lg:text-[44px] font-semibold italic text-center w-[26%] flex justify-center">
              {title}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ WHO WE ARE ═══════ */}
      <section id="about-who" className="pt-[3.61%] px-[4%] lg:pl-[5%] lg:w-[80%]">
        <p className="font-lato text-[30px] text-royal-blue tracking-[0.95em] uppercase">WHO WE ARE</p>
        <div className="flex flex-col lg:flex-row flex-1 w-[120%]">
          <div className="lg:w-[64.8%] mt-[3%]">
            <h2 className="font-lato text-[36px] lg:text-[45px] font-bold text-ebony-clay leading-tight lg:mr-[2vw] text-justify">
              Bimsara Real Estate is a premier broking brand at the forefront of Sri Lanka's real estate market.
            </h2>
            <p className="font-lato text-[29px] font-normal leading-[50px] text-ebony-clay text-justify mt-[30px]">
              With many successful transactions concluded, we possess an unparalleled, profound, insightful understanding of the property market in Sri Lanka. Attributed to our far-flung experience in the industry, we are capable of providing holistic, end-to-end options to the versatile demands and concerns of every client.
            </p>
            <p className="font-lato text-[29px] font-light leading-[50px] text-ebony-clay text-justify mt-[30px]">
              The brand is put to the forefront by Safetynet (Private) Limited founded in 2006. The company has been in the industry since then and has extended mediation services under the guidance and close inspection of the founder and the Managing Director; Bimsara Gamage, to a wide spectrum of property sellers, landlords, buyers and tenants with myriad, diverse and unique needs and requirements.
            </p>
            <div className="mt-[61px] pl-[3%]">
              <a href="#" className="secondary-btn">
                DOWNLOAD COMPANY PROFILE BOOK
                <img src={downloadIcon} alt="" className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="hidden lg:flex flex-col items-center mt-[3%] lg:w-[46%]">
            <img src={aboutLogo} alt="Bimsara Real Estate" className="w-[77%]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ═══════ VISION / MISSION / VALUES ═══════ */}
      <section id="about-mission" className="pt-[10vh] pb-[5%] px-[8%] lg:w-[90%]">
        <div className="flex flex-col items-center">
          {/* Vision & Mission — same width, sized to Mission content */}
          <div className="flex flex-col w-fit">
            <div className="gradient-border-card w-full">
              <span className="gradient-border-card-inner block text-center">
                <p className="font-lato text-[22px] lg:text-[26px] font-normal text-royal-blue py-[2.4vh] px-[10%]">
                  Vision
                </p>
                <p className="font-lato text-[16px] lg:text-[20px] font-normal text-ebony-clay text-center leading-[25px]">
                  To be the most sought after Real Estate Broker in Sri Lanka
                </p>
              </span>
            </div>

            <div className="gradient-border-card w-full">
              <span className="gradient-border-card-inner block text-center">
                <p className="font-lato text-[22px] lg:text-[26px] font-normal text-royal-blue py-[2.4vh] px-[10%]">
                  Mission
                </p>
                <p className="font-lato text-[16px] lg:text-[20px] font-normal text-ebony-clay text-center leading-[25px]">
                  To set the benchmark for Sri Lankan Real Estate Broking by redefining the way the business is done.
                </p>
              </span>
            </div>
          </div>

          {/* We Value */}
          <div className="mt-[4%]">
            <p className="font-lato text-[22px] lg:text-[26px] font-normal text-royal-blue py-[2.4vh] px-[10%]">
              We Value,
            </p>
            <div className="flex flex-col md:flex-row gap-0 mt-[-3vh] px-[10%] pt-[2%]">
              {values.map((v) => (
                <div key={v} className="flex-1 p-[1.5%]">
                  <div className="gradient-border-card">
                    <span className="gradient-border-card-inner block text-center value-card-outer">
                      <p className="font-lato text-[18px] lg:text-[20px] font-normal text-ebony-clay text-center leading-[43px] value-card-inner">
                        {v}
                      </p>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ISO CERTIFICATION ═══════ */}
      <section id="about-iso" className="py-[3.5%] px-[4%] lg:pl-[5%] lg:pr-[20%] iso-section-bg">
        <div className="flex flex-col lg:flex-row items-center gap-36">
          <div className="lg:w-[65%] text-white">
            <p className="font-lato text-[18px] lg:text-[25px] tracking-[0.42em] text-royal-blue uppercase mb-4">WE LOVE TO FOLLOW<br />SYSTEMS</p>
            <h2 className="font-lato text-[41px] lg:text-[52px] font-bold leading-[1.31] mb-[30px] text-alto w-full">
              To ensure our framework of policies and processes are at internationally recognized standards.
            </h2>
            <p className="font-lato text-[29px] lg:text-[32px] font-light leading-[53px] text-alto/80 text-justify">
              In 2016, we adopted an internationally recognized quality management system and was awarded the ISO 9001:2008 standard. In 2019, we acquired the revised ISO 9001:2015 certificate from Bureau Veritas Certification Holding SAS-UK Branch, Accredited by UKAS Management Systems.
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="lg:w-[518px]">
              <img src={isoCertSrc} alt="ISO 9001:2015 Certificate" className="w-full rounded-lg shadow-xl" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ COMPANY OVERVIEW ═══════ */}
      <section id="about-overview" className="pt-[5%] pb-[5%] pl-[5%] pr-[10%] w-full">
        <p className="font-lato text-[30px] text-royal-blue tracking-[0.95em] uppercase">COMPANY OVERVIEW</p>

        {/* Glassmorphism card — matching live site */}
        <div className="company-overview-card flex flex-col lg:flex-row mt-[5%] w-full lg:w-[92%]">
          {/* Left column */}
          <div className="flex-1 lg:w-[60%] px-[5%] lg:px-[8%] py-[5%]">
            <img src={safetynetLogo} alt="Safetynet" className="h-[86px] mb-6 mx-auto" loading="lazy" />
            <p className="font-lato text-[28px] font-normal leading-[46px] text-ebony-clay text-center mb-2">
              Safetynet (Private) Limited
            </p>
            <p className="font-lato text-[28px] font-light leading-[46px] text-ebony-clay text-center mb-8">
              Company Registration No: PV 1525
            </p>
            <p className="font-lato text-[28px] font-light leading-[46px] text-ebony-clay text-center mt-[30px] mb-[30px]">
              Safetynet (Private) Limited has been in business since its inception on the 19th June 2006 and the company is duly registered under the companies Act No. 7 of 2007 as a private company with limited liability with one director at present.
            </p>
            <div className="text-center mb-6">
              <p className="font-lato text-[28px] text-royal-blue mb-1">Registered Office</p>
              <p className="font-lato text-[28px] font-light text-ebony-clay leading-[47px]">
                199/58<br />Rajagiriya Road, Rajagiriya<br />Sri Lanka
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:w-[40%] pl-0 pr-[10%] py-[5%]">
            <div className="text-center mb-8 lg:mt-[80px]">
              <p className="font-lato text-[28px] text-royal-blue mb-1">Company Secretary</p>
              <p className="font-lato text-[28px] font-normal text-ebony-clay">M C A Advisory Services (Pvt) Ltd</p>
              <p className="font-lato text-[28px] font-light text-ebony-clay leading-[47px]">17/1, Charles Way, Colombo 03</p>
            </div>
            <div className="text-center mb-8">
              <p className="font-lato text-[28px] text-royal-blue mb-1">Auditor</p>
              <p className="font-lato text-[28px] font-normal text-ebony-clay">Thilak Jayathilaka & Co.</p>
              <p className="font-lato text-[28px] font-light text-ebony-clay leading-[47px]">
                Chartered Accountants<br />17/1, Charles Way, Colombo 03
              </p>
            </div>
            <div className="text-center">
              <p className="font-lato text-[28px] text-royal-blue mb-1">Banker</p>
              <p className="font-lato text-[28px] font-normal text-ebony-clay">Hatton National Bank PLC.</p>
              <p className="font-lato text-[28px] font-light text-ebony-clay leading-[47px]">
                Green Path Branch<br />38, Ananda Coomaradwamy Mawatha<br />Colombo 03
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ OUR TEAM ═══════ */}
      <section id="about-team" className="pt-[5vh] pb-[5%] px-[4%] lg:pl-[10%] lg:w-[80%]">
        <div className="flex w-[70%]">
          <p className="font-lato text-[30px] text-royal-blue tracking-[0.95em] uppercase">OUR TEAM</p>
        </div>

        {/* Two-column: text left, stats right */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[300px] pt-[2%]">
          {/* Left: heading + description */}
          <div className="lg:w-[53%]">
            <h2 className="font-lato text-[24px] font-bold text-ebony-clay leading-[29px] mt-[30px] text-justify">
              We are an ever growing group of individuals in terms of number, proficiency and experiences.
            </h2>
            <p className="font-lato text-[30px] font-light text-ebony-clay leading-[44px] mt-[30px] text-justify">
              Through our collective efforts including sharing knowledge about diverse projects, we have made our journey far more than a success story.
            </p>
          </div>

          {/* Right: stats */}
          <div className="flex flex-row lg:flex-col items-start gap-8 lg:gap-4 shrink-0 w-[240px] text-center lg:text-left mx-auto lg:mx-0">
            <div className="text-center lg:text-left">
              <span className="font-khand text-[41px] lg:text-[99px] font-bold leading-none text-crimson block">{data.teamPositions}</span>
              <p className="font-lato text-[17px] lg:text-[29px] font-bold text-royal-blue leading-[20px] lg:leading-[34px] mt-1">Positions and<br />growing</p>
            </div>
            <div className="text-center lg:text-left mt-0 lg:mt-4">
              <span className="font-khand text-[41px] lg:text-[99px] font-bold leading-none text-crimson block">{data.serviceProviderCount}</span>
              <p className="font-lato text-[17px] lg:text-[29px] font-bold text-royal-blue leading-[20px] lg:leading-[34px] mt-1">Service Providers</p>
            </div>
          </div>
        </div>

        {/* ═══ INTERACTIVE TEAM CIRCLE (Desktop) ═══ */}
        {teamMembers.length > 0 && (
          <div className="hidden lg:flex my-[5vh] justify-center items-center overflow-visible">
            <ul className="team-circle">
              {/* Center: selected member details */}
              {selectedMember && (
                <div className="absolute inset-0 flex items-center justify-center w-full">
                  <div className="text-center px-[15%] max-h-[85%] mt-[-15%]">
                    <div className="flex justify-center mb-3">
                      <div className="relative">
                        <img
                          src={getImageUrl(selectedMember.image)}
                          alt={selectedMember.name}
                          className="center-member-img"
                        />
                        {selectedMember.linkedin_url && (
                          <a href={selectedMember.linkedin_url} target="_blank" rel="noopener noreferrer" className="linkedin-icon-badge">
                            <img src={linkedinIcon2} alt="LinkedIn" />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="font-lato text-[29px] font-bold text-crimson">{selectedMember.name}</h3>
                    <p className="font-lato text-[23px] font-semibold text-tundora mt-1">{selectedMember.position}</p>
                    <p className="font-lato text-[21px] font-light text-crimson leading-[29px] mt-4 italic">{selectedMember.quote}</p>
                    <p className="font-lato text-[19px] font-light text-tundora leading-[29px] mt-4 text-justify">
                      {selectedMember.description}
                    </p>
                    {selectedMember.description2 && (
                      <p className="font-lato text-[19px] font-light text-tundora leading-[29px] mt-3 text-justify">
                        {selectedMember.description2}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* All members positioned around the circle */}
              {otherMembers.map((member, i) => {
                const pos = getCirclePosition(i, otherMembers.length)
                return (
                  <li
                    key={member.id}
                    className="absolute cursor-pointer team-circle-member"
                    style={{ '--cx': `${pos.x}%`, '--cy': `${pos.y}%` }}
                    onClick={() => setSelectedMember(member)}
                    title={member.name}
                  >
                    <img
                      src={getImageUrl(member.image)}
                      alt={member.name}
                      className="team-member-avatar"
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* ═══ MOBILE TEAM CARDS ═══ */}
        <div className="lg:hidden my-[3vh] space-y-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-concrete rounded-[20px] p-5 cursor-pointer"
              onClick={() => setSelectedMember(selectedMember?.id === member.id ? null : member)}
            >
              <div className="flex items-center gap-4">
                <img src={getImageUrl(member.image)} alt={member.name} className="w-[60px] h-[60px] rounded-full object-cover bg-crimson-bg border-2 border-crimson-bg shrink-0" />
                <div>
                  <h4 className="font-lato text-[16px] font-medium text-crimson">{member.name}</h4>
                  <p className="font-lato text-[13px] text-tundora">{member.position}</p>
                </div>
                {member.linkedin_url && (
                  <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="ml-auto shrink-0" onClick={(e) => e.stopPropagation()}>
                    <img src={linkedinIcon2} alt="LinkedIn" className="w-[28px] h-[28px]" />
                  </a>
                )}
              </div>
              {selectedMember?.id === member.id && (
                <div className="mt-4 pt-4 border-t border-crimson-bg">
                  <p className="font-lato text-[13px] font-light text-crimson leading-[22px] italic mb-3">{member.quote}</p>
                  <p className="font-lato text-[13px] font-light text-tundora leading-[22px]">{member.description}</p>
                  {member.description2 && <p className="font-lato text-[13px] font-light text-tundora leading-[22px] mt-2">{member.description2}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ SERVICE PROVIDERS ═══════ */}
      <section className="bg-white pb-[3%] w-full pr-[10%]">
        <h3 className="font-lato text-[27px] font-bold text-royal-blue leading-[30px] text-center pb-[3%]">Our Service Providers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto w-[70%] pb-[3%]">
          {data.serviceProviders.map((sp, idx) => {
            const logoSrc = sp.logo ? getImageUrl(sp.logo) : ''
            const imgSize = (idx === 2 || idx === 3) ? 'max-h-[225px] max-w-[225px]' : 'max-h-[150px] max-w-[150px]'
            const imgSrc = idx === 3 ? hitmediaLogo : logoSrc
            return (
              <div key={sp.id || sp.name} className="flex items-center justify-center h-[100px]">
                {imgSrc ? (
                  <img src={imgSrc} alt={sp.name} className={`${imgSize} object-contain`} loading="lazy" />
                ) : (
                  <span className="font-lato text-[14px] font-bold text-ebony-clay text-center">{sp.name}</span>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
