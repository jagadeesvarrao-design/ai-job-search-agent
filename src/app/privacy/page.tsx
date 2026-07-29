export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert prose-teal max-w-none space-y-6 text-slate-300">
        <p>Last Updated: July 29, 2026</p>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>
            When you use our Job Search Agent, we may collect the following information:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><strong>Usage Data:</strong> Information about how you interact with our website.</li>
            <li><strong>Local Data:</strong> Your resume and job preferences are processed locally in your browser and are not permanently stored on our servers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Google AdSense & Cookies</h2>
          <p>
            This website uses Google AdSense, a web advertising service provided by Google LLC. Google AdSense uses cookies to serve ads based on your prior visits to this website or other websites.
          </p>
          <p className="mt-4">
            Google uses the <strong>DoubleClick cookie</strong> to enable it and its partners to serve interest-based ads. You may opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">Google's Ads Settings</a>.
          </p>
          <p className="mt-4">
            For more information on how Google handles data, please review <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">Google's Privacy Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Data Security</h2>
          <p>
            We implement a strict "Zero-Backend" architecture. Your uploaded PDF resume is converted to Base64 strictly within your browser and passed statelessly to our API for processing. We do not retain, store, or sell your personal data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us via our <a href="/contact" className="text-teal-400 hover:underline">Contact Page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
