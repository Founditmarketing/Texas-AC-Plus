import React, { useEffect } from 'react';
import { Logo } from './Logo';
import { Phone, Mail, ArrowLeft } from 'lucide-react';

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2
    style={{
      fontFamily: 'var(--font-barlow)',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontSize: 'clamp(0.85rem, 2vw, 1rem)',
      color: 'var(--color-gold)',
      marginBottom: '0.75rem',
      marginTop: '2.25rem',
      paddingBottom: '0.45rem',
      borderBottom: '1px solid oklch(68% 0.13 68 / 0.2)',
    }}
  >
    {children}
  </h2>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3
    style={{
      fontFamily: 'var(--font-barlow)',
      fontWeight: 700,
      fontSize: '0.9rem',
      color: 'rgba(255,255,255,0.85)',
      marginTop: '1.5rem',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    }}
  >
    {children}
  </h3>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontFamily: 'var(--font-barlow)',
      fontWeight: 400,
      fontSize: '0.925rem',
      lineHeight: 1.82,
      color: 'rgba(255,255,255,0.68)',
      marginBottom: '0.75rem',
    }}
  >
    {children}
  </p>
);

export const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Terms of Service | Texas AC Plus';
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-navy-dark)', minHeight: '100vh' }}>

      {/* Sticky nav */}
      <nav
        style={{
          backgroundColor: 'var(--color-navy)',
          borderBottom: '2px solid var(--color-gold)',
          padding: '1rem 0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Logo variant="white" />
          <a
            href="/"
            onClick={e => { e.preventDefault(); window.location.hash = ''; window.location.reload(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-barlow)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.75)',
              transition: 'color 150ms',
              textDecoration: 'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </nav>

      {/* Hero banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-navy) 0%, oklch(18% 0.04 250) 100%)',
          padding: 'clamp(3rem, 8vw, 6rem) 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid oklch(68% 0.13 68 / 0.15)',
        }}
      >
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-barlow)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontSize: '0.7rem',
            color: 'var(--color-gold)',
            marginBottom: '1rem',
          }}
        >
          Legal Information
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            color: 'white',
            marginBottom: '1.25rem',
          }}
        >
          Terms of Service
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.55)',
            fontSize: '0.9rem',
            maxWidth: '38rem',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          Full Terms and Conditions are below. Please read carefully before scheduling service
          or using our website. Questions? Call us at{' '}
          <a href="tel:9562253834" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>
            (956) 225-3834
          </a>
          .
        </p>
      </div>

      {/* Quick highlights */}
      <div
        style={{
          background: 'oklch(20% 0.04 250)',
          borderBottom: '1px solid oklch(68% 0.13 68 / 0.12)',
          padding: '2rem 1.5rem',
        }}
      >
        <div
          className="max-w-5xl mx-auto"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {[
            { title: 'Contactless Service', body: 'Review estimates, approve work, and pay from your own device at a safe distance.' },
            { title: 'On Time', body: "We'll arrive within the window provided and notify you when we're on the way." },
            { title: 'Payment Due at Completion', body: 'Payment in full is due at the end of the service call by card or approved financing.' },
            { title: 'Satisfaction Guarantee', body: "Your satisfaction is guaranteed. If you aren't happy, let us know before you pay." },
            { title: 'Respecting Your Home', body: 'We cover our shoes with floor savers, protect work surfaces, and clean the area when done.' },
          ].map(({ title, body }) => (
            <div
              key={title}
              style={{
                background: 'oklch(22% 0.045 250)',
                borderRadius: '8px',
                padding: '1.25rem',
                border: '1px solid oklch(68% 0.13 68 / 0.1)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontSize: '0.72rem',
                  color: 'var(--color-gold)',
                  marginBottom: '0.4rem',
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontSize: '0.85rem',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Full terms body */}
      <div
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          padding: 'clamp(2.5rem, 6vw, 5rem) 1.5rem',
        }}
      >

        <Body>
          Our goal is to be the best and most customer-responsive HVAC service provider in the Rio Grande Valley. We do this by communicating with you clearly, respecting your time and your home, standing behind our work, hiring the best technicians, and training them to deliver quality repairs, installations, and exceptional customer service.
        </Body>

        {/* ── Communicating With You ── */}
        <SectionHeading>Communicating With You Clearly</SectionHeading>
        <Body>
          Our HVAC service technicians will complete the diagnosis and clearly explain the repairs needed. Before we perform any work, we will communicate what needs to be done and the estimated cost. We will not proceed until we have your approval on the work order.
        </Body>
        <Body>
          The approved work order and these Terms and Conditions represent the complete and exclusive agreement between us. No verbal agreements shall be binding unless included in the written work order.
        </Body>

        {/* ── Satisfaction Guarantee ── */}
        <SectionHeading>Our Satisfaction Guarantee</SectionHeading>
        <Body>
          Texas AC Plus is committed to customer satisfaction with every service we deliver. The best time to address a concern is while our technician and truck are still on site — we have not collected payment, and we will not do so if you tell us you are not satisfied.
        </Body>
        <Body>
          On every service call, you have the opportunity to raise a concern before you pay by calling or texting us while we are on site. Texas AC Plus will immediately work to bring you to a satisfied status before our team departs. Texas AC Plus is not responsible for any satisfaction guarantee once we have left the initial service location.
        </Body>

        {/* ── On Time ── */}
        <SectionHeading>Respecting Your Time</SectionHeading>
        <Body>
          If Texas AC Plus does not arrive within the agreed appointment window and the work is completed, the trip fee will be waived for that visit. We must place reasonable restrictions on this On-Time guarantee for circumstances beyond our control — including severe weather such as flooding, heavy rain, wind, hail, road closures, and accidents.
        </Body>
        <Body>
          Any failure to meet the appointment window due to these conditions is excused and no On-Time guarantee applies. The On-Time guarantee applies only to service calls for which a trip fee is charged and not to calls designated as "stand-by" by Texas AC Plus. We reserve the right to cancel or reschedule any appointment without liability under this guarantee as long as we notify you before the start of the designated arrival window.
        </Body>

        {/* ── Respecting Your Home ── */}
        <SectionHeading>Respecting Your Home</SectionHeading>
        <Body>
          Texas AC Plus prides itself on leaving your home in the same or better condition than before the service call. Our technicians are trained to wear floor savers and to clean the work area upon completion.
        </Body>
        <Body>
          While we make every reasonable effort to protect your property, due to the nature of HVAC repairs, Texas AC Plus cannot be responsible for drywall, paint, trim, or other cosmetic damage caused by accessing, inspecting, diagnosing, or repairing HVAC equipment. For example, accessing an attic may require walking on ceiling joists, which can sometimes crack drywall below. As a condition of service, the Customer releases Texas AC Plus from such damages and understands that additional cosmetic repair work may be required after the HVAC repair is made — and that such cosmetic work is not the responsibility of Texas AC Plus.
        </Body>
        <Body>
          Texas AC Plus is also not responsible for any pre-existing defective conditions in the home or HVAC system. For example, an older breaker that is switched off during a repair may not reset and may need replacement — this is a pre-existing condition unrelated to the technician's work. Texas AC Plus is not responsible for the repair, removal, or replacement of non-HVAC items damaged or altered to perform a repair or gain access, including but not limited to: concrete, asphalt, paving, driveways, patios, pools, trees, shrubbery, underground sprinklers, plumbing, gas lines, fences, electrical wiring, painting, plastering, sheetrock, wall coverings, carpentry, flooring, siding, roofing, and other structural or cosmetic elements.
        </Body>

        {/* ── Warranty ── */}
        <SectionHeading>Our Warranty</SectionHeading>
        <Body>
          Texas AC Plus stands behind our work and offers what we believe is an industry-leading warranty. The warranty is extended to our Customer only and is not transferable. Our warranty begins from the date of service:
        </Body>
        <ul
          style={{
            fontFamily: 'var(--font-barlow)',
            fontSize: '0.925rem',
            lineHeight: 1.82,
            color: 'rgba(255,255,255,0.68)',
            paddingLeft: '1.5rem',
            marginBottom: '0.75rem',
          }}
        >
          <li>One (1) year parts and labor warranty on most parts and repairs, unless otherwise stated on the invoice.</li>
          <li>Two (2) year labor warranty on new equipment replacements.</li>
          <li>All applicable manufacturer warranties on parts and equipment are passed through to the Customer.</li>
        </ul>

        <SubHeading>Warranty Limitations</SubHeading>
        <Body>
          Texas AC Plus's obligation under this warranty is limited, at our option, to either (1) repair or replace any defective part, or (2) refund of the amount paid by the Customer for the defective parts and/or labor. No warranty is provided on any customer-supplied parts or equipment.
        </Body>
        <Body>
          No warranty is offered on any parts or repairs unless the work was paid in full to Texas AC Plus. Any alterations, additions, or repairs made by unauthorized third parties will void Texas AC Plus's warranty obligation.
        </Body>
        <Body>
          <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Condensate Drain Lines:</strong> Whenever an air-handling unit is located in an attic or upper story, the risk of water damage from drain stoppage and condensate overflow is inherent and unavoidable. Proper installation and consistent maintenance minimize this risk but cannot absolutely prevent it. Our warranties specifically exclude liability for water damage due to condensate overflow and any special, consequential, or incidental damage resulting from such overflow. We recommend you confirm that your homeowner's insurance includes coverage for water damage from condensate overflow.
        </Body>
        <Body>
          No warranty is provided for damage or failure due to: abuse, modification, misuse, relocation, electrical surges, lightning, flooding, or other weather-related issues; environmental conditions outside manufacturer specifications; fire, shifting soil, or other acts of God; cosmetic or appearance defects; air filters or consumable products; loss of efficiency from normal wear and tear; or changes in regulation or building code after the work is performed.
        </Body>
        <Body>
          If a warranty claim is suspected, you must notify Texas AC Plus and allow us to inspect the issue before any changes are made or equipment is removed. Failure to do so voids the warranty. If a technician is dispatched on a warranty call and the issue is determined not to be covered, the standard service charge plus a minimum labor fee will apply.
        </Body>
        <Body>
          THERE ARE NO WARRANTIES BEYOND THOSE EXPRESSLY GRANTED HEREIN. TEXAS AC PLUS DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. TEXAS AC PLUS'S TOTAL LIABILITY TO THE CUSTOMER FOR ANY REASON SHALL NOT EXCEED THE TOTAL AMOUNT CHARGED TO THE CUSTOMER FOR THE SPECIFIC SERVICE IN QUESTION.
        </Body>

        {/* ── Payment ── */}
        <SectionHeading>Payment Terms</SectionHeading>
        <Body>
          Payment in full is due upon completion of the HVAC repair or replacement. For larger jobs, Texas AC Plus may require an upfront deposit of up to one-half (1/2) of the estimated cost prior to job start. Accepted payment methods include major credit and debit cards and approved financing. If payment is not received within ten (10) days of completion, late fees and interest at the rate of 1.5% per month will be added to any outstanding balance.
        </Body>
        <Body>
          If Texas AC Plus must pursue legal action to collect payment, the Customer agrees to pay reasonable attorney's fees, court costs, and interest in addition to the amounts owed. The Customer accepts full responsibility for prompt payment even if they intend to seek reimbursement from a third party (such as a landlord, tenant, or insurance carrier). Payment constitutes the Customer's acknowledgment that the job was approved and completed satisfactorily.
        </Body>

        {/* ── Cancellation ── */}
        <SectionHeading>Cancellation Policy</SectionHeading>
        <Body>
          If you have scheduled HVAC work that requires a City Permit, Texas AC Plus will require a deposit of one-fifth (1/5) of the estimated project cost. If you cancel after the deposit is made, you agree that Texas AC Plus is owed for any work already performed plus twenty percent (20%) of the total estimated cost as liquidated damages to compensate for reserved labor, materials, and scheduling costs. Any permit fees, wire cuts, and associated permit costs are non-refundable. Upon cancellation, it is the Customer's responsibility to administratively close out any open permits.
        </Body>
        <Body>
          For non-permit service calls, we ask that you provide at least 24 hours' notice if you need to cancel or reschedule. Failure to provide adequate notice or failure to be present at the scheduled appointment time may result in a trip or diagnostic fee.
        </Body>

        {/* ── SMS ── */}
        <SectionHeading>SMS / Text Message Terms</SectionHeading>
        <Body>
          By providing your mobile phone number and scheduling service with Texas AC Plus, you consent to receive automated text messages regarding your appointment, including reminders, technician arrival notifications, and follow-up communications. Message and data rates may apply. Up to five (5) messages per month.
        </Body>
        <Body>
          Texas AC Plus is not liable for delays in the receipt of any SMS messages, as delivery is subject to effective transmission from your mobile service provider. SMS services are provided "as is" and without warranty of any kind.
        </Body>
        <Body>
          To opt out of text messages, reply STOP to any message you receive from us. For assistance, reply HELP. United States participating carriers include AT&amp;T, T-Mobile®, Verizon Wireless, and others. This program is available to U.S. residents only.
        </Body>

        {/* ── Website Use ── */}
        <SectionHeading>Website Use</SectionHeading>
        <Body>
          The content on this website — including text, images, logos, and design elements — is the intellectual property of Texas AC Plus and may not be copied, reproduced, or distributed without express written permission. The website is provided for informational purposes only and does not constitute a binding service agreement. We make reasonable efforts to keep information accurate and up to date, but make no warranties regarding completeness or accuracy.
        </Body>

        {/* ── Privacy ── */}
        <SectionHeading>Privacy</SectionHeading>
        <Body>
          Personal information submitted through our website or collected during service — such as your name, phone number, email address, and service address — is used solely to respond to your inquiry and facilitate service appointments. Texas AC Plus does not sell or share your personal information with third parties for marketing purposes. All information is handled in accordance with applicable Texas and federal privacy laws.
        </Body>

        {/* ── Mediation ── */}
        <SectionHeading>Limitation of Action / Mediation</SectionHeading>
        <Body>
          Any legal action relating to repairs or services provided by Texas AC Plus shall be commenced within one (1) year from the date the work was performed. Other than for a failure to pay by the Customer, the parties agree to first attempt to resolve any dispute through mediation with the local Better Business Bureau (BBB) prior to filing a lawsuit.
        </Body>

        {/* ── Governing Law ── */}
        <SectionHeading>Governing Law</SectionHeading>
        <Body>
          These Terms of Service shall be governed by the laws of the State of Texas and interpreted in a manner to be valid and enforceable. If any provision of this agreement is held invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect. Any disputes arising under or related to these Terms shall be subject to the exclusive jurisdiction of the courts located in Hidalgo County, Texas.
        </Body>

        {/* ── Contact ── */}
        <SectionHeading>Contact Us</SectionHeading>
        <Body>
          If you have questions about these Terms of Service, please contact us:
        </Body>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem', marginBottom: '3rem' }}>
          <a
            href="tel:9562253834"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-gold)',
              textDecoration: 'none',
              fontFamily: 'var(--font-barlow)',
              fontWeight: 700,
              fontSize: '1rem',
              transition: 'opacity 150ms',
            }}
          >
            <Phone className="w-4 h-4" /> (956) 225-3834
          </a>
          <a
            href="mailto:arnold@texasacplus.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              fontFamily: 'var(--font-barlow)',
              fontSize: '0.95rem',
              transition: 'color 150ms',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; }}
          >
            <Mail className="w-4 h-4" /> arnold@texasacplus.com
          </a>
          <p style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>
            Edinburgh, TX 78539 · Licensed &amp; Insured · TACLA License
          </p>
        </div>

        {/* Back to home */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="/"
            onClick={e => { e.preventDefault(); window.location.hash = ''; window.location.reload(); }}
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </div>

      {/* Mini footer */}
      <div style={{ borderTop: '1px solid oklch(68% 0.13 68 / 0.15)', padding: '1.5rem', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-barlow)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          © 2026 Texas AC Plus · Edinburgh, TX · Licensed &amp; Insured · TACLA License
        </p>
      </div>
    </div>
  );
};
