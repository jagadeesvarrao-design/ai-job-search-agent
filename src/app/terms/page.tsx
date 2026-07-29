export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert prose-teal max-w-none space-y-6 text-slate-300">
        <p>Last Updated: July 29, 2026</p>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this Job Search Agent platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Use of Service</h2>
          <p>
            Our service provides AI-powered tools for job search automation. You agree to use these tools responsibly and not for any unlawful or prohibited purpose. You are solely responsible for the accuracy of the resume data you upload.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Third-Party Links & Ads</h2>
          <p>
            Our website displays advertisements provided by Google AdSense and contains links to third-party job postings (via SerpApi). We do not control these third-party sites and are not responsible for their content, privacy policies, or practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Limitation of Liability</h2>
          <p>
            This service is provided "as is" without any warranties, express or implied. We do not guarantee that you will receive job offers or interviews by using this platform. We shall not be liable for any damages arising from your use of the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Contact Information</h2>
          <p>
            If you have questions about these Terms, please contact us via our <a href="/contact" className="text-teal-400 hover:underline">Contact Page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
