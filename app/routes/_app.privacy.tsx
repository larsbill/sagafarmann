import { MetaFunction } from "@remix-run/react";
import PageHeader from "~/components/nav/PageHeader";

export const meta: MetaFunction = () => {
  return [
    { title: "Saga Farmann - Privacy Policy" },
    { name: "description", content: "Saga Farman follow the vikings" },
  ];
};

export default function Privacy() {
  return (
    <div className="container mx-auto p-6">
      <PageHeader title="Privacy Policy" />
      <div className="max-w-screen-lg mx-auto space-y-12 mb-24">
        <section>
          <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="mb-6">
            <strong>Effective Date:</strong> 28/01/2025 <br />
            <strong>Last Updated:</strong> 28/01/2025
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">Who We Are</h2>
          <p className="mb-6">
            The organisation{" "}
            <strong>Stiftelsen Oseberg Vikingnarv</strong>, established in 2005 in
            Tønsberg, Norway, is the data controller of the personal data
            processed via its websites{" "}
            <a
              href="https://osebergvikingarv.no"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              osebergvikingarv.no
            </a>{" "}
            and{" "}
            <a
              href="https://sagafarmann.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              sagafarmann.com
            </a>
            . To receive any information on its data processing, please contact us
            at{" "}
            <a
              href="mailto:contact@sagafarmann.com"
              className="text-primary underline"
            >
              contact@sagafarmann.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">
            What Personal Data We Collect and Why
          </h2>
          <p className="mb-6">
            We value your privacy and are committed to protecting your personal
            data. This Privacy Policy explains how we collect, use, store, and
            protect the information you provide through the join form on our
            website. We adhere to applicable data protection laws, including the
            General Data Protection Regulation (GDPR) of the European Union.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">1. Information We Collect</h3>
          <p className="mb-4">When you fill out the join form on our website, we collect:</p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>
              <strong>First and Last Name</strong>
            </li>
            <li>
              <strong>Email Address</strong>
            </li>
            <li>
              <strong>Gender</strong> <span>(Male, Female, Non-binary, Other)</span>
            </li>
            <li>
              <strong>Message</strong> <span>(Your reason for joining)</span>
            </li>
          </ul>
          <p className="mb-6">
            Additionally, our website uses <strong>Cloudflare Turnstile</strong> for
            security purposes. This service may collect anonymized data to verify
            that form submissions are made by humans, not bots. Please refer to{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Cloudflare&apos;s Privacy Policy
            </a>{" "}
            for more details.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">2. Purpose of Collection</h3>
          <p className="mb-4">We collect your data solely to:</p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Process your request to join a specific trip or smaller trip on our boat.</li>
            <li>Manage participation in the trip(s).</li>
            <li>Communicate relevant updates about the trip you have requested to join.</li>
          </ul>
          <p className="mb-6">
            We will not use your personal data for any other purpose, such as
            marketing or sharing with third parties, unless required by law.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">3. Data Retention</h3>
          <p className="mb-4">Your personal data will be retained only for as long as necessary to:</p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>
              Manage your participation in our trips.
            </li>
            <li>
              If your request is approved, your data will be stored until the{" "}
              <strong>trip concludes</strong>, then deleted permanently.
            </li>
            <li>
              If the trip is full, your data will be stored for the{" "}
              <strong>next year&apos;s trip</strong> and deleted after that.
            </li>
            <li>
              If you withdraw your request or membership, your data will be
              deleted immediately.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">4. How We Protect Your Data</h3>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>
              <strong>Data Encryption</strong> - All personally identifiable
              information (PII) is stored safely on Cloudflare servers according to
              Cloudflare Privacy Policy. The information is not encrypted, but stored security.
            </li>
            <li>
              <strong>Secure Transmission</strong> - Data transmitted between your
              browser and our servers are encrypted using industry-standard
              protocols (e.g., HTTPS).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
          <div className="space-y-4">
            <p>
              <strong>Email</strong>{" "}
              <a
                href="mailto:contact@sagafarmann.com"
                className="text-primary underline"
              >
                contact@sagafarmann.com
              </a>
            </p>
            <p>
              <strong>Address</strong>{" "}
              <span>Ollebukta 3, 3126 Tønsberg</span>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">Consent</h2>
          <p className="mb-6">
            By submitting the join form, you acknowledge that you have read,
            understood, and agree to this Privacy Policy.
          </p>
          <p>
            This Privacy Policy complies with GDPR and ensures your data is used
            exclusively to manage your participation in our trips. If you have
            further questions, please contact us.
          </p>
        </section>
      </div>
    </div>
  );
}
