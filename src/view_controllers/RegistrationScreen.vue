<script setup>
import { ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import usFlag from "../assets/icon/us_flag.svg";
import khFlag from "../assets/icon/kh_flag.svg";
import CustomAlertDialog from "../view_controllers/pop_up_dialog/CustomAlertDialog.vue";
import LoadingIndicator from "../view_controllers/pop_up_dialog/LoadingIndicator.vue";

const { proxy } = getCurrentInstance();
const languageState = proxy.$language;

const fullNameInput = ref("");
const dobInput = ref("");
const nationalityInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");
const confirmPasswordInput = ref("");
const showCustomDialog = ref(false);
const showLoadingDialog = ref(false);

const titleLabel = ref("");
const messageLabel = ref("");
const buttonLabel = ref("Okay");

const router = useRouter();

var registerKhmer = "ចុះឈ្មោះ";
var registerEnglish = "Register";

var toContinueKhmer = "ដើម្បីបង្កើតគណនីបាទបង";
var toContinueEnglish = "to create a Bart Bong account";

var fullNameKhmer = "ឈ្មោះពេញ";
var fullNameEnglish = "Full Name";

var dobKhmer = "ថ្ងៃខែឆ្នាំកំណើត";
var dobEnglish = "Date of Birth";

var nationalityKhmer = "សញ្ជាតិ";
var nationalityEnglish = "Nationality";

var emailKhmer = "អ៊ីមែល";
var emailEnglish = "Email";

var passwordKhmer = "ពាក្យសម្ងាត់";
var passwordEnglish = "Password";

var confirmPasswordKhmer = "បញ្ជាក់ពាក្យសម្ងាត់";
var confirmPasswordEnglish = "Confirm Password";

var haveAccountKhmer = "មានគណនីរួចហើយមែនទេ?";
var haveAccountEnglish = "Already have an account?";

var signInKhmer = "ចូលគណនី";
var signInEnglish = "Sign In";

function toggleLanguage() {
  languageState.isKhmer = !languageState.isKhmer;
  localStorage.setItem("is_khmer", languageState.isKhmer.toString());
}

async function registerWithEmail() {
  if (!fullNameInput.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value) {
    titleLabel.value = "Input Error";
    messageLabel.value = "Please fill in all required fields (Full Name, Email, Password, Confirm Password).";
    showCustomDialog.value = true;
    return;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    titleLabel.value = "Password Mismatch";
    messageLabel.value = "Passwords do not match.";
    showCustomDialog.value = true;
    return;
  }

  showLoadingDialog.value = true;
  try {
    // Simulate API call for registration
    const response = await new Promise(resolve => setTimeout(() => {
      // Here you would typically call a backend API to register the user
      // For demonstration, we'll just simulate success after a delay
      if (emailInput.value === "existing@example.com") {
        resolve({ success: false, error: "Email already registered." });
      } else {
        resolve({ success: true });
      }
    }, 1000));

    if (response.success) {
      console.log("Registration Successful:", emailInput.value);
      // Redirect to login or home after successful registration
      router.push("/login");
    } else {
      titleLabel.value = "Registration Failed";
      messageLabel.value = response.error;
      showCustomDialog.value = true;
    }
  } catch (error) {
    console.error("Registration Error:", error);
    titleLabel.value = "Registration Failed";
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

function goToLogin() {
  router.push("/login");
}
</script>

<template>
  <a class="float_logo_top" href="/home">
    <img style="width: 50px; height: 50px; object-fit: cover" src="../assets/bart_bong_short.png" />
  </a>

  <div class="registration_container">
    <div class="vertical_container registration_form_container" style="gap: 0px">
      <label style="font-size: 30px; font-weight: bold">{{
        languageState.isKhmer ? registerKhmer : registerEnglish
      }}</label>
      <label style="font-size: 15px">{{
        languageState.isKhmer ? toContinueKhmer : toContinueEnglish
      }}</label>

      <form @submit.prevent="registerWithEmail" style="width: 100%">
        <input class="custom_input_style margin_top_ten" v-model="fullNameInput" type="text"
          :placeholder="languageState.isKhmer ? fullNameKhmer : fullNameEnglish" autocomplete="name" required />
        <input class="custom_input_style margin_top_ten" v-model="dobInput" type="date"
          :placeholder="languageState.isKhmer ? dobKhmer : dobEnglish" autocomplete="bday" />
        <input class="custom_input_style margin_top_ten" v-model="nationalityInput" type="text"
          :placeholder="languageState.isKhmer ? nationalityKhmer : nationalityEnglish" />
        
        <input class="custom_input_style margin_top_ten" v-model="emailInput" type="email"
          :placeholder="languageState.isKhmer ? emailKhmer : emailEnglish" autocomplete="email" required />
        <input class="custom_input_style margin_top_ten" v-model="passwordInput" type="password"
          :placeholder="languageState.isKhmer ? passwordKhmer : passwordEnglish" autocomplete="new-password" required />
        <input class="custom_input_style margin_top_ten" v-model="confirmPasswordInput" type="password"
          :placeholder="languageState.isKhmer ? confirmPasswordKhmer : confirmPasswordEnglish"
          autocomplete="new-password" required />
        <button class="custom_button_style margin_top_ten" type="submit">
          {{ languageState.isKhmer ? registerKhmer : registerEnglish }}
        </button>
      </form>

      <div class="horizontal_container margin_top_ten">
        <label style="font-size: 15px">{{
          languageState.isKhmer ? haveAccountKhmer : haveAccountEnglish
        }}</label>
        <label class="point_over_bold" style="font-size: 15px; color: #1384ff" @click="goToLogin">{{ languageState.isKhmer ? signInKhmer :
          signInEnglish }}</label>
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
.registration_container {
  height: 100vh; /* Use 100vh to ensure it covers the full viewport height */
  width: 100vw; /* Use 100vw for full viewport width */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000; /* Fallback black background color */
}

@media (min-width: 900px) {
  .registration_container {
    background-image: url("/src/assets/cover.svg"); /* Background image */
    background-size: cover; /* Cover the entire container */
    background-position: center; /* Center the background image */
  }
}

.registration_form_container {
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
  .registration_form_container {
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

/* Style for the date input to change the calendar icon color */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1); /* Invert the color to make it white */
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
</style>