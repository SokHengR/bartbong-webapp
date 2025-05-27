<script setup>
import { ref, onMounted } from "vue";
import usFlag from "../assets/icon/us_flag.svg";
import khFlag from "../assets/icon/kh_flag.svg";
import {
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  setPersistence, // Import setPersistence
  browserLocalPersistence // Import persistence type
} from "firebase/auth";
import { auth } from "../firebase";

const isKhmer = ref(false);
const emailInput = ref("");
const passwordInput = ref("");

onMounted(async () => {
  const isKhmerLang = localStorage.getItem("is_khmer");
  if (isKhmerLang !== null) {
    isKhmer.value = isKhmerLang === "true";
  }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Authenticated User:", user);
    } else {
      console.log("No user signed in");
    }
  });
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("Redirect result received:", result);
    }
  } catch (error) {
    console.error("Error getting redirect result:", error);
  }
});

var signinKhmer = "ចូលគណនី";
var signinEnglish = "Sign In";

var toContinueKhmer = "ដើម្បីបន្តទៅកាន់កម្មវិធីបាទបង";
var toContinueEnglish = "to continue to Bart Bong";

var phoneNumberKhmer = "លេខទូរស័ព្ទ";
var phoneNumberEnglish = "Phone Number";

var passwordKhmer = "ពាក្យសម្ងាត់";
var passwordEnglish = "Password";

var noAccountKhmer = "មិនមានគណនីមែនទេ?";
var noAccountEnglish = "Don't have an account?";

var registerKhmer = "ចុះឈ្មោះ";
var registerEnglish = "Register";

function toggleLanguage() {
  isKhmer.value = !isKhmer.value;
  localStorage.setItem("is_khmer", isKhmer.value.toString());
}

async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    await setPersistence(auth, browserLocalPersistence); // Set persistence before redirect
    signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("Error setting persistence or signing in with Google:", error);
  }
}

async function loginWithEmail() {
  if (!emailInput.value || !passwordInput.value) {
    console.warn("Email and password are required.");
    return;
  }

  try {
    await setPersistence(auth, browserLocalPersistence); // Set persistence before signing in
    const userCredential = await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );
    const user = userCredential.user;
    console.log("Email Login Successful:", user);
  } catch (error) {
    console.error("Email Login Error:", error);
  }
}
</script>

<template>
  <div class="float_logo_top">
    <img
      style="width: 50px; height: 50px; object-fit: cover"
      src="../assets/bart_bong_short.png"
    />
  </div>

  <div class="horizontal_container cover_background_container">
    <div class="the_cover">
      <img
        class="cover_image_background"
        src="../assets/login_flower_wallpaper.jpg"
      />
      <img class="water_logo_bottom" src="../assets/bart_bong_short.png" />
    </div>

    <div class="vertical_container login_form_container" style="gap: 0px">
      <label style="font-size: 30px; font-weight: bold">{{
        isKhmer ? signinKhmer : signinEnglish
      }}</label>
      <label style="font-size: 15px">{{
        isKhmer ? toContinueKhmer : toContinueEnglish
      }}</label>

      <form @submit.prevent="loginWithEmail" style="width: 100%">
        <input
          class="custom_input_style margin_top_ten"
          v-model="emailInput"
          type="tel"
          :placeholder="isKhmer ? phoneNumberKhmer : phoneNumberEnglish"
          autocomplete="tel"
        />
        <input
          class="custom_input_style margin_top_ten"
          v-model="passwordInput"
          type="password"
          :placeholder="isKhmer ? passwordKhmer : passwordEnglish"
          autocomplete="current-password"
        />
        <button class="custom_button_style margin_top_ten" type="submit">
          {{ isKhmer ? signinKhmer : signinEnglish }}
        </button>
      </form>

      <div class="horizontal_container margin_top_ten">
        <label style="font-size: 15px">{{
          isKhmer ? noAccountKhmer : noAccountEnglish
        }}</label>
        <label
          class="point_over_bold"
          style="font-size: 15px; color: #1384ff"
          >{{ isKhmer ? registerKhmer : registerEnglish }}</label
        >
      </div>

      <div class="or_separator">
        <div class="line"></div>
        <span class="or-text">or</span>
        <div class="line"></div>
      </div>

      <div class="custom_button_no_color point_over margin_top_ten">
        <img class="logo_icon_size" src="../assets/icon/apple_logo_white.svg" />
        <label>Apple</label>
      </div>
      <div
        class="custom_button_no_color point_over margin_top_ten"
        @click="loginWithGoogle()"
      >
        <img class="logo_icon_size" src="../assets/icon/google_logo.svg" />
        <label>Google</label>
      </div>
      <div class="custom_button_no_color point_over margin_top_ten">
        <img class="logo_icon_size" src="../assets/icon/facebook_logo.svg" />
        <label>Facebook</label>
      </div>
    </div>
  </div>

  <div class="language_button_container">
    <div class="language_button point_over" @click="toggleLanguage()">
      <img
        style="width: 25px; object-fit: cover"
        :src="isKhmer ? khFlag : usFlag"
      />
      {{ isKhmer ? "ភាសាខ្មែរ" : "English" }}
    </div>
  </div>
</template>

<style scoped>
.line {
  flex-grow: 1;
  height: 1px;
  background-color: gray;
}

.or_separator {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px 0;
  gap: 10px;
}

.logo_icon_size {
  width: 20px;
  height: 20px;
  object-fit: cover;
}

.water_logo_bottom {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.float_logo_top {
  position: absolute;
  top: 20px;
  left: 20px;
}

.cover_background_container {
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.cover_image_background {
  width: 450px;
  height: 630px;
  border-radius: 20px;
  object-fit: cover;
}

.login_form_container {
  padding: 20px;
  width: 300px;
  color: white;
  display: flex;
  align-items: start;
}

.custom_input_style {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 15px;
  background-color: transparent;
  color: white;
  border: 1px solid gray;
  border-radius: 10px;
  outline: none;
}

.custom_button_style {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 15px;
  background-color: #1384ff;
  color: white;
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
}

.custom_button_no_color {
  display: flex;
  overflow: hidden;
  justify-content: center;
  gap: 5px;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
  border: 1px solid gray;
  border-radius: 100px;
  outline: none;
}

.margin_top_ten {
  margin-top: 10px;
}

.the_cover {
  display: flex;
  position: relative;
}

.language_button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 5px;
  gap: 10px;
}

.point_over_bold {
  cursor: pointer;
}

.point_over_bold:hover {
  font-weight: bold;
}

.point_over {
  cursor: pointer;
}

.point_over:hover {
  background-color: #ffffff20;
}

.language_button_container {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 900px) {
  .the_cover {
    display: none;
  }
  .login_form_container {
    width: 100%;
  }
}
</style>