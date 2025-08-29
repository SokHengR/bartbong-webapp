<script setup>
import { ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import usFlag from "../assets/icon/us_flag.svg";
import khFlag from "../assets/icon/kh_flag.svg";
import ConfirmAlertDialog from "../view_controllers/pop_up_dialog/ConfirmAlertDialog.vue";
import CustomAlertDialog from "../view_controllers/pop_up_dialog/CustomAlertDialog.vue"; // Ensure CustomAlertDialog is imported
import LoadingIndicator from "../view_controllers/pop_up_dialog/LoadingIndicator.vue";

const { proxy } = getCurrentInstance();
const languageState = proxy.$language;

const usernameInput = ref("");
const dobInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");
const confirmPasswordInput = ref("");
const sexInput = ref(""); // Initialize with an empty string or default value
const phoneNumberInput = ref("");
const addressInput = ref("");
const showCustomDialog = ref(false);
const showLoadingDialog = ref(false);
const showConfirmDialog = ref(false);

const titleLabel = ref("");
const messageLabel = ref("");
const buttonLabel = ref("Okay");

const router = useRouter();

var registerKhmer = "ចុះឈ្មោះ";
var registerEnglish = "Register";

var toContinueKhmer = "ដើម្បីបង្កើតគណណីបាទបង";
var toContinueEnglish = "to create a Bart Bong account";

var usernameKhmer = "ឈ្មោះអ្នកប្រើប្រាស់";
var usernameEnglish = "Username";

var dobKhmer = "ថ្ងៃខែឆ្នាំកំណើត";
var dobEnglish = "Date of Birth";

var sexKhmer = "ភេទ";
var sexEnglish = "Sex";
var maleKhmer = "ប្រុស";
var maleEnglish = "Male";
var femaleKhmer = "ស្រី";
var femaleEnglish = "Female";
var preferNotToTellKhmer = "មិនប្រាប់";
var preferNotToTellEnglish = "Prefer not to tell";

var phoneNumberKhmer = "លេខទូរស័ព្ទ";
var phoneNumberEnglish = "Phone Number";

var addressKhmer = "អាសយដ្ឋាន";
var addressEnglish = "Address";

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
  // Client-side validation for all required fields
  if (
    !usernameInput.value ||
    !emailInput.value ||
    !passwordInput.value ||
    !confirmPasswordInput.value ||
    !dobInput.value ||
    !sexInput.value ||
    !phoneNumberInput.value ||
    !addressInput.value
  ) {
    titleLabel.value = "Input Error";
    messageLabel.value = "Please fill in all required fields.";
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
    const response = await fetch("https://server.bartbong.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
        username: usernameInput.value,
        date_of_birth: dobInput.value || undefined,
        sex: sexInput.value === 'Prefer not to tell' ? '' : sexInput.value || undefined,
        phone_number: phoneNumberInput.value || undefined,
        address: addressInput.value || undefined,
      }),
    });

    const data = await response.json();

    if (data.status == "success") {
      console.log("Registration Successful:", data);
      titleLabel.value = "Account Created";
      messageLabel.value = "Your account has been successfully created. Please log in.";
      showConfirmDialog.value = true;
    } else {
      titleLabel.value = "Registration Failed";
      messageLabel.value = data.message;
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

function acceptConfirmAlertDialog() {
  showConfirmDialog.value = false;
  router.push("/login");
}

function cancelConfirmAlertDialog() {
  showConfirmDialog.value = false;
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
        <input class="custom_input_style margin_top_ten" v-model="usernameInput" type="text"
          :placeholder="languageState.isKhmer ? usernameKhmer : usernameEnglish" autocomplete="username" required />
        
        <input class="custom_input_style margin_top_ten" v-model="emailInput" type="email"
          :placeholder="languageState.isKhmer ? emailKhmer : emailEnglish" autocomplete="email" required />

        <input class="custom_input_style margin_top_ten" v-model="dobInput" type="date"
          :placeholder="languageState.isKhmer ? dobKhmer : dobEnglish" autocomplete="bday" required />
        
        <select class="custom_input_style margin_top_ten" v-model="sexInput" required>
          <option value="" disabled selected>{{ languageState.isKhmer ? sexKhmer : sexEnglish }}</option>
          <option value="Male">{{ languageState.isKhmer ? maleKhmer : maleEnglish }}</option>
          <option value="Female">{{ languageState.isKhmer ? femaleKhmer : femaleEnglish }}</option>
          <option value="Prefer not to tell">{{ languageState.isKhmer ? preferNotToTellKhmer : preferNotToTellEnglish }}</option>
        </select>

        <input class="custom_input_style margin_top_ten" v-model="phoneNumberInput" type="tel"
          :placeholder="languageState.isKhmer ? phoneNumberKhmer : phoneNumberEnglish" autocomplete="tel" required />
        <input class="custom_input_style margin_top_ten" v-model="addressInput" type="text"
          :placeholder="languageState.isKhmer ? addressKhmer : addressEnglish" autocomplete="address" required />

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
        <label class="point_over_bold" style="font-size: 15px; color: #1384ff" @click="goToLogin">
          {{ languageState.isKhmer ? signInKhmer : signInEnglish }}
        </label>
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
  
  <ConfirmAlertDialog 
    v-if="showConfirmDialog" 
    :titleLabel="titleLabel" 
    :messageLabel="messageLabel"
    @accept_confirm_dialog="acceptConfirmAlertDialog"
    @cancel_confirm_dialog="cancelConfirmAlertDialog"
  />

  <LoadingIndicator v-if="showLoadingDialog" :isKhmer="languageState.isKhmer" />
</template>

<style scoped>
.registration_container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
}

@media (min-width: 900px) {
  .registration_container {
    background-image: url("/src/assets/cover.svg");
    background-size: cover;
    background-position: center;
  }
}

.registration_form_container {
  padding: 20px;
  width: 90%;
  background-color: transparent;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0;
  box-shadow: none;
}

@media (min-width: 900px) {
  .registration_form_container {
    padding: 40px;
    width: 350px;
    background-color: rgba(26, 26, 26, 0.5);
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}

.float_logo_top {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
}

.custom_input_style {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  font-size: 16px;
  background-color: #222222;
  color: white;
  border: 1px solid #333333;
  border-radius: 8px;
  outline: none;
}

.custom_input_style:focus {
  border-color: #1384ff;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
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
  transition: background-color 0.3s ease;
}

.custom_button_style:hover {
  background-color: #0d6efd;
}
.margin_top_ten {
  margin-top: 15px;
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
  transition: color 0.3s ease;
}

.point_over_bold:hover {
  color: #5ac4ff !important;
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
  border: 1px solid #333333;
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