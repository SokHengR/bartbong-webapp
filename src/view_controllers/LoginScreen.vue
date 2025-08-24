<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import usFlag from "../assets/icon/us_flag.svg";
import khFlag from "../assets/icon/kh_flag.svg";
import CustomAlertDialog from "../view_controllers/pop_up_dialog/CustomAlertDialog.vue";
import LoadingIndicator from "../view_controllers/pop_up_dialog/LoadingIndicator.vue";

const { proxy } = getCurrentInstance();
const languageState = proxy.$language;

const emailInput = ref("");
const passwordInput = ref("");
const showCustomDialog = ref(false);
const showLoadingDialog = ref(false);

const titleLabel = ref("");
const messageLabel = ref("");
const buttonLabel = ref("Okay");

const router = useRouter();

// No need for onMounted to read from localStorage here, as main.js handles initial state

var signinKhmer = "ចូលគណនី";
var signinEnglish = "Sign In";

var toContinueKhmer = "ដើម្បីបន្តទៅកាន់កម្មវិធីបាទបង";
var toContinueEnglish = "to continue to Bart Bong";

var emailKhmer = "អ៊ីមែល";
var emailEnglish = "Email";

var passwordKhmer = "ពាក្យសម្ងាត់";
var passwordEnglish = "Password";

var noAccountKhmer = "មិនមានគណនីមែនទេ?";
var noAccountEnglish = "Don't have an account?";

var registerKhmer = "ចុះឈ្មោះ";
var registerEnglish = "Register";

function toggleLanguage() {
  languageState.isKhmer = !languageState.isKhmer;
  localStorage.setItem("is_khmer", languageState.isKhmer.toString());
}

async function loginWithEmail() {
  if (!emailInput.value || !passwordInput.value) {
    console.warn("Email and password are required.");
    titleLabel.value = "Input Error";
    messageLabel.value = "Please enter both email and password.";
    showCustomDialog.value = true;
    return;
  }

  showLoadingDialog.value = true;
  try {
    // Simulate API call for login
    // In a real application, you would replace this with an actual API call
    const response = await new Promise(resolve => setTimeout(() => {
      if (emailInput.value === "test@example.com" && passwordInput.value === "password123") {
        resolve({ success: true });
      } else {
        resolve({ success: false, error: "Incorrect email or password." });
      }
    }, 1000)); // Simulate 1 second network delay

    if (response.success) {
      console.log("Email Login Successful:", emailInput.value);
      localStorage.setItem("is_signed_in", "true");
      router.push("/");
    } else {
      titleLabel.value = "Login Failed";
      messageLabel.value = response.error;
      showCustomDialog.value = true;
    }
  } catch (error) {
    console.error("Email Login Error:", error);
    titleLabel.value = "Login Failed";
    messageLabel.value = "An unexpected error occurred. Please try again.";
    showCustomDialog.value = true;
  }
  finally {
    showLoadingDialog.value = false;
  }
}

function closeCustomDialog() {
  showCustomDialog.value = false;
}

function goToRegister() {
  router.push("/register");
}
</script>

<template>
  <a class="float_logo_top" href="/home">
    <img style="width: 50px; height: 50px; object-fit: cover" src="../assets/bart_bong_short.png" />
  </a>

  <div class="login_container">
    <div class="vertical_container login_form_container" style="gap: 0px">
      <label style="font-size: 30px; font-weight: bold">{{
        languageState.isKhmer ? signinKhmer : signinEnglish
      }}</label>
      <label style="font-size: 15px">{{
        languageState.isKhmer ? toContinueKhmer : toContinueEnglish
      }}</label>

      <form @submit.prevent="loginWithEmail" style="width: 100%">
        <input class="custom_input_style margin_top_ten" v-model="emailInput" type="email"
          :placeholder="languageState.isKhmer ? emailKhmer : emailEnglish" autocomplete="email" />
        <input class="custom_input_style margin_top_ten" v-model="passwordInput" type="password"
          :placeholder="languageState.isKhmer ? passwordKhmer : passwordEnglish" autocomplete="current-password" />
        <button class="custom_button_style margin_top_ten" type="submit">
          {{ languageState.isKhmer ? signinKhmer : signinEnglish }}
        </button>
      </form>

      <div class="horizontal_container margin_top_ten">
        <label style="font-size: 15px">{{
          languageState.isKhmer ? noAccountKhmer : noAccountEnglish
        }}</label>
        <label class="point_over_bold" style="font-size: 15px; color: #1384ff" @click="goToRegister">{{ languageState.isKhmer ? registerKhmer :
          registerEnglish }}</label>
      </div>
    </div>
  </div>

  <div class="language_button_container">
    <div class="language_button point_over" @click="toggleLanguage()">
      <img style="width: 25px; object-fit: cover" :src="languageState.isKhmer ? khFlag : usFlag" />
      {{ languageState.isKhmer ? "ភាសាខ្មែរ" : "English" }}
    </div>
  </div>

  <CustomAlertDialog v-if="showCustomDialog" :titleLabel="titleLabel" :messageLabel="messageLabel"
    :buttonLabel="buttonLabel" @close_custom_dialog="closeCustomDialog" />
  <LoadingIndicator v-if="showLoadingDialog" :isKhmer="languageState.isKhmer" />

</template>

<style scoped>
.login_container {
  height: 100vh; /* Use 100vh to ensure it covers the full viewport height */
  width: 100vw; /* Use 100vw for full viewport width */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000; /* Fallback black background color */
}

@media (min-width: 900px) {
  .login_container {
    background-image: url("/src/assets/cover.svg"); /* Background image */
    background-size: cover; /* Cover the entire container */
    background-position: center; /* Center the background image */
  }
}

.login_form_container {
  padding: 20px; /* Default padding for mobile */
  width: 90%; /* Default full width for mobile */
  background-color: transparent; /* No background color for mobile */
  color: white;
  display: flex;
  flex-direction: column; /* Ensure vertical layout */
  align-items: center; /* Center items within the form */
  border-radius: 0; /* No border-radius for mobile */
  box-shadow: none; /* No shadow for mobile */
}

@media (min-width: 900px) {
  .login_form_container {
    padding: 40px;
    width: 350px; /* Card width for desktop */
    background-color: rgba(26, 26, 26, 0.5); /* Transparent card background for desktop */
    border-radius: 15px; /* Card border-radius for desktop */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6); /* Card shadow for desktop */
    backdrop-filter: blur(10px); /* Blur effect for desktop card */
    -webkit-backdrop-filter: blur(10px); /* Safari support for blur */
  }
}

.float_logo_top {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10; /* Ensure logo is above other elements */
}

.custom_input_style {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  font-size: 16px;
  background-color: #222222; /* Input background, darker */
  color: white;
  border: 1px solid #333333; /* Input border, darker */
  border-radius: 8px;
  outline: none;
}

.custom_input_style:focus {
  border-color: #1384ff; /* Highlight border on focus */
}

.custom_button_style {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  font-size: 16px;
  background-color: #1384ff;
  color: white;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition */
}

.custom_button_style:hover {
  background-color: #0d6efd; /* Darker blue on hover */
}

.margin_top_ten {
  margin-top: 15px; /* Increased margin for better spacing */
}

.horizontal_container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.vertical_container {
  display: flex;
  flex-direction: column;
}

.point_over_bold {
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s ease; /* Smooth transition */
}

.point_over_bold:hover {
  color: #5ac4ff !important; /* Lighter blue on hover */
}

.language_button_container {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.language_button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
  border: 1px solid #333333; /* Darker border for language button */
  border-radius: 10px;
  padding: 5px;
  gap: 10px;
}

.point_over {
  cursor: pointer;
}

.point_over:hover {
  background-color: #ffffff20;
}

/* Removed old media query and related styles */
</style>