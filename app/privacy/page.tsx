import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChat } from "@/components/floating-chat"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: January 2025</p>

            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Introduction</h2>
                <p>
                  Mindrupee ("we", "us", or "our") operates the website. This page informs you of our policies regarding
                  the collection, use, and disclosure of personal data when you use our service and the choices you have
                  associated with that data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Information Collection and Use</h2>
                <p>We collect various types of information in connection with the services we provide, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal identification information (name, email, phone number, etc.)</li>
                  <li>Financial information (investment preferences, portfolio details, etc.)</li>
                  <li>Demographic information (age, location, occupation, etc.)</li>
                  <li>Browsing activity and site usage data</li>
                  <li>Technical information (IP address, browser type, device information, etc.)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Use of Data</h2>
                <p>Mindrupee uses the collected data for various purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide and maintain our services</li>
                  <li>To notify you about changes to our services</li>
                  <li>To allow you to participate in interactive features</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information for service improvement</li>
                  <li>To monitor the usage of our services</li>
                  <li>To detect, prevent and address technical issues</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Security of Data</h2>
                <p>
                  The security of your data is important to us but remember that no method of transmission over the
                  internet or method of electronic storage is 100% secure. While we strive to use commercially
                  acceptable means to protect your personal data, we cannot guarantee its absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Sharing of Information</h2>
                <p>
                  We may share your information with third parties only in ways that are described in this Privacy
                  Policy, including with Asset Management Companies for fund administration, payment processors, service
                  providers, and as required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our service and hold certain
                  information. Cookies are files with small amount of data which may include an anonymous unique
                  identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                  sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Links to Other Sites</h2>
                <p>
                  Our service may contain links to other sites that are not operated by us. If you click on a third
                  party link, you will be directed to that third party's site. We strongly advise you to review the
                  Privacy Policy of every site you visit. We have no control over and assume no responsibility for the
                  content, privacy policies or practices of any third party sites or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Your Rights</h2>
                <p>
                  You have the right to access, correct, update, or request deletion of your personal information. You
                  also have the right to opt-out of certain communications. To exercise these rights, please contact us
                  at support@mindrupee.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p>
                  Email: support@mindrupee.com
                  <br />
                  Phone: +91 8765 6376XX
                  <br />
                  Address: 123 Financial Park, Tower B, Mumbai, India 400051
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingChat />
    </main>
  )
}
