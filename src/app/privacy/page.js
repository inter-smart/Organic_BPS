import Cta from "@/components/sections/privacy/cta";
import Hero from "@/components/sections/privacy/hero";
import Policy from "@/components/sections/privacy/policy";

export const metadata = {
  title: "Privacy — Organic BPS",
  description:
    "This policy explains what personal information Organic BPS collects, why we use it, and the choices available to you.",
};

/*
 * One object, one key per section — shaped like the future CMS response.
 * Rich copy uses segments: { t: text, accent?: red }.
 */
const local_data = {
  hero: {
    image: { src: "/images/privacy/hero.jpg", alt: "" },
    title: [[{ t: "Privacy, made" }], [{ t: "clear.", accent: true }]],
    paragraph:
      "This policy explains what personal information we collect, why we use it, and the choices available to you.",
    scroll: { label: "Scroll to the policy", href: "#policy" },
  },

  policy: {
    eyebrow: "Your information",
    title: "What this policy covers",
    lead: "We value straightforward relationships. That includes being clear about how personal information is handled when you visit our website or work with us.",
    copy: "This policy applies to Organic BPS websites, business enquiries, recruitment interactions, and related communications. It does not replace any more specific notice provided at the point information is collected.",
    contents: {
      title: "On this page",
      label: "Policy contents",
      toggle: {
        open: "Expand policy contents",
        close: "Collapse policy contents",
      },
      note: {
        title: "Need help?",
        text: "Email admin@organicbps.com with a privacy question or request.",
      },
    },
    content: `
      <h3 id="information-we-collect">Information we collect</h3>
      <p>We collect information you choose to provide when you contact us, submit an enquiry, apply for a role, subscribe to updates, or otherwise communicate with Organic BPS. This may include your name, work email, telephone number, organisation, job title, location, and the content of your message.</p>
      <p>We may also collect limited technical information when you use our website, such as IP address, browser and device type, pages viewed, referral source, and approximate location derived from your IP address.</p>
      <ul>
        <li>Contact and business enquiry details</li>
        <li>Website and device usage information</li>
        <li>Recruitment information you submit to us</li>
      </ul>

      <h3 id="how-information-is-used">How information is used</h3>
      <p>We use personal information to respond to enquiries, provide requested information, manage our business relationships, operate and improve our website, assess job applications, and protect our services from misuse.</p>
      <p>Where required, we rely on an appropriate legal basis, which may include your consent, steps requested before entering a contract, performance of a contract, compliance with law, or our legitimate interests where these are not overridden by your rights.</p>

      <h3 id="cookies-and-tracking">Cookies and tracking</h3>
      <p>Our website may use essential cookies needed for core functions and limited analytics technologies that help us understand how the site is used. Some technologies may be provided by third parties and may collect device or usage information.</p>
      <p>You can manage non-essential cookies through any consent controls we provide and through your browser settings. Blocking some cookies may affect how parts of the website work.</p>

      <h3 id="sharing-and-disclosure">Sharing and disclosure</h3>
      <p>We do not sell personal information. We may share it with trusted service providers that support hosting, analytics, communications, recruitment, or professional advice, subject to suitable contractual and confidentiality obligations.</p>
      <p>We may also disclose information where reasonably necessary to comply with law, respond to lawful requests, protect rights or safety, investigate misuse, or in connection with a merger, reorganisation, or transfer of part of our business.</p>

      <h3 id="data-retention">Data retention</h3>
      <p>We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including to meet legal, accounting, contractual, or reporting requirements. Retention periods vary according to the type of information and the context in which it was provided.</p>
      <p>When information is no longer needed, we take reasonable steps to delete, anonymise, or securely isolate it, subject to applicable backup and record-keeping practices.</p>

      <h3 id="data-security">Data security</h3>
      <p>We use administrative, technical, and organisational measures intended to protect personal information against unauthorised access, alteration, disclosure, or loss. These measures are reviewed in light of the nature of the information and relevant risks.</p>
      <p>No method of transmission or storage is completely secure. While we work to protect personal information, we cannot guarantee absolute security.</p>

      <h3 id="international-transfers">International transfers</h3>
      <p>Organic BPS operates across India, the United Arab Emirates, and the United Kingdom, and some service providers may process information in other countries. As a result, personal information may be transferred to locations with different data protection laws.</p>
      <p>Where required, we use recognised safeguards for these transfers, such as contractual protections, and take reasonable steps to ensure information remains appropriately protected.</p>

      <h3 id="your-rights-and-choices">Your rights and choices</h3>
      <p>Depending on where you live, you may have rights to request access to, correction of, deletion of, or restriction on the use of your personal information. You may also have the right to object, request portability, withdraw consent, or complain to a data protection authority.</p>
      <p>These rights may be subject to legal conditions and exceptions. To make a request, contact us using the details below. We may need to verify your identity before responding.</p>
      <ul>
        <li>Update or correct your information</li>
        <li>Opt out of non-essential communications</li>
        <li>Ask a question or make a privacy request</li>
      </ul>

      <h3 id="childrens-privacy">Children’s privacy</h3>
      <p>Our website and services are intended for business audiences and are not directed to children. We do not knowingly collect personal information from children under the age at which parental consent is required in their jurisdiction.</p>
      <p>If you believe a child has provided personal information to us, please contact us so we can review and take appropriate action.</p>

      <h3 id="third-party-links">Third-party links</h3>
      <p>Our website may link to websites or services operated by other organisations. Their privacy practices are governed by their own policies, not this one. We encourage you to review those policies before providing personal information.</p>

      <h3 id="policy-updates">Policy updates</h3>
      <p>We may update this policy to reflect changes to our practices, services, or legal requirements. The revised version will be posted on this page with a new last-updated date. Where appropriate, we may provide an additional notice of significant changes.</p>

      <h3 id="contact-details">Contact details</h3>
      <p>If you have questions about this policy or how we handle personal information, or if you wish to exercise a privacy right, contact our team at admin@organicbps.com. You may also write to Organic BPS Pvt Ltd, GTWRA 31, Parthasarathy Temple Road, Changampuzha Park, Kochi – 682024, Kerala, India.</p>
      <p>We will review your request and respond within a reasonable period, taking account of applicable law and the nature of the request.</p>
    `,
  },
  cta: {
    title: "Have a privacy question?",
    text: "Our team can help with questions, choices, or requests about your personal information.",
    email: "admin@organicbps.com",
  },
};

export default function PrivacyPage() {
  return (
    <main>
      <Hero data={local_data.hero} />
      <Policy data={local_data.policy} />
      <Cta data={local_data.cta} />
    </main>
  );
}
