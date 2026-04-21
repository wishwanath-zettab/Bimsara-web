import { Link } from 'react-router-dom'
import safetynetLogo from '../assets/images/safetynet-logo.png'

// Each footer column contains up to two stacked groups, matching the screenshot's
// two-row arrangement: row 1 (For Sellers / For Buyers / For Landlords / For Tenants / Downloads),
// row 2 (Testimonials / About / Contact / — / Tools).
const footerColumns = [
  {
    key: 'sellers',
    groups: [
      { title: 'For Sellers', links: [
        { label: 'Our Services', href: '/services' },
        { label: "Seller's Guide", href: '/services' },
      ]},
      { title: 'Testimonials', links: [
        { label: 'Reviews', href: '/#testimonials' },
        { label: 'Video Testimonials', href: '/#testimonials' },
      ]},
    ],
  },
  {
    key: 'buyers',
    groups: [
      { title: 'For Buyers', links: [
        { label: 'What we offer', href: '/services' },
        { label: "Buyer's Guide", href: '/services' },
      ]},
      { title: 'About', links: [
        { label: 'Who we are', href: '/about' },
        { label: 'Our direction', href: '/about' },
        { label: 'ISO Certification', href: '/about' },
        { label: 'Company Overview', href: '/about' },
        { label: 'Our Team', href: '/about' },
      ]},
    ],
  },
  {
    key: 'landlords',
    groups: [
      { title: 'For Landlords', links: [
        { label: 'Our Services', href: '/services' },
        { label: "Landlord's Guide", href: '/services' },
      ]},
      { title: 'Contact', links: [
        { label: 'Contact Us', href: '/#contact' },
        { label: 'Our location', href: '/#contact' },
      ]},
    ],
  },
  {
    key: 'tenants',
    groups: [
      { title: 'For Tenants', links: [
        { label: 'What we offer', href: '/services' },
        { label: "Tenant's Guide", href: '/services' },
      ]},
    ],
  },
  {
    key: 'downloads',
    groups: [
      { title: 'Downloads', links: [
        { label: "Seller's Checklist", href: '#' },
        { label: "Buyer's Checklist", href: '#' },
        { label: "Landlord's Checklist", href: '#' },
        { label: "Tenant's Checklist", href: '#' },
      ]},
      { title: 'Tools', links: [
        { label: 'Land Grading Tool', href: '#' },
      ]},
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ebony text-white border-t-2 border-crimson-light">
      <div className="max-w-[1400px] mx-auto px-[5%] pt-[60px] pb-[30px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:w-[240px] shrink-0">
            <img src={safetynetLogo} alt="Safetynet" className="h-[54px] mb-8" />
            <p className="font-lato text-[14px] lg:text-[15px] text-nobel leading-[28px]">
              Safetynet (Private) Limited DBA Bimsara Real Estate is a licensed
              Real Estate Broker and an Auctioneer based in Sri Lanka.
            </p>
          </div>

          {/* Five link columns, two stacked groups per column */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 flex-1">
            {footerColumns.map((col) => (
              <div key={col.key} className="space-y-10">
                {col.groups.map((group) => (
                  <div key={group.title}>
                    <h4 className="font-lato text-[16px] lg:text-[17px] font-bold text-white mb-4">
                      {group.title}
                    </h4>
                    <ul className="space-y-2">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            to={link.href}
                            className="font-lato text-[14px] lg:text-[15px] text-nobel hover:text-white transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright — left-aligned, two lines */}
      <div className="max-w-[1400px] mx-auto px-[5%] pb-8">
        <p className="font-lato text-[13px] lg:text-[14px] text-nobel leading-[24px]">
          All rights reserved &copy; {new Date().getFullYear()} Safetynet (Private) Limited.
        </p>
      </div>
    </footer>
  )
}
