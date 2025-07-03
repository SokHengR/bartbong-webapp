<script setup>
import TitleBar from "../components/HomeView/TitleBarView.vue";
import FooterBar from "../components/HomeView/FooterBarView.vue";
</script>

<template>
  <div class="main_screen_container">
    <TitleBar :tabIndexNum="0" />
    <div class="main_scroll_view">
      <div class="description_container">
        <div class="description_style">
          <h1>Privacy Policy</h1>
          <p><strong>Effective Date:</strong> 27th May, 2025</p>
          <p>
            This Privacy Policy explains how Bart Bong ("we", "our", or "us")
            collects, uses, discloses, and protects your information when you use
            our web application.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            When you use Bart Bong, we may collect the following types of
            information:
          </p>
          <ul>
            <li>
              <strong>Account Information:</strong> If you register an account or
              log in with Google, we collect your name, email address, and profile
              photo (if available).
            </li>
            <li>
              <strong>Usage Data:</strong> We collect data on how you interact with
              the service, such as questions asked and timestamps, for improving the
              service.
            </li>
            <li>
              <strong>Cookies and Tracking:</strong> We may use cookies and similar
              technologies to improve functionality and analyze traffic.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and operate the Bart Bong service.</li>
            <li>Authenticate users via Google or manual registration.</li>
            <li>Improve and personalize your experience.</li>
            <li>Respond to user inquiries and support requests.</li>
            <li>Monitor and analyze usage and trends.</li>
          </ul>

          <h2>3. Sharing Your Information</h2>
          <p>
            We do not sell your personal information. We may share your data with
            trusted service providers who assist us in operating the platform, under
            strict confidentiality agreements.
          </p>
          <p>
            We may also disclose your information if required by law or to protect
            the rights and safety of our users or the public.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement reasonable technical and organizational measures to protect
            your personal data. However, no method of transmission over the Internet
            or electronic storage is 100% secure.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>
            Bart Bong may use third-party services (e.g., Google Sign-In). Your use
            of these services is subject to their respective privacy policies.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access, update, or delete your personal information.</li>
            <li>Withdraw consent to data collection where applicable.</li>
            <li>Request a copy of the data we hold about you.</li>
          </ul>
          <p>
            To exercise these rights, please contact us at
            <a href="mailto:[contact@bartbong.com]">contact@bartbong.com</a>.
          </p>

          <h2>7. Children's Privacy</h2>
          <p>
            Bart Bong is not intended for children under the age of 13. We do not
            knowingly collect personal information from children.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with a new effective date.
          </p>

          <h2>9. Contact Us</h2>
          <p style="padding-bottom: 50px">
            If you have any questions or concerns about this Privacy Policy, please
            contact us at:
            <a href="mailto:[contact@bartbong.com]">contact@bartbong.com</a>
          </p>
        </div>
      </div>
      <FooterBar />
    </div>
  </div>
</template>

<style scoped>
.main_screen_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main_scroll_view {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.description_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.description_style {
  color: white;
  width: 100%;
  max-width: 900px;
  padding: 20px;
  box-sizing: border-box;
  accent-color: green;
}
</style>