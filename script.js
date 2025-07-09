let shareCount = 0;
const shareBtn = document.getElementById("shareBtn");
const shareCountText = document.getElementById("shareCount");
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const successMsg = document.getElementById("successMsg");

// const submitted = localStorage.getItem("submitted");
// if (submitted === "true") {
//   disableForm();
//   successMsg.classList.remove("hidden");
// }

shareBtn.addEventListener("click", () => {
  if (shareCount < 5) {
    shareCount++;
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const url = `https://wa.me/?text=${message}`;
    window.open(url, "_blank");
    shareCountText.innerText = `Click count: ${shareCount}/5`;

    if (shareCount === 5) {
      alert("Sharing complete. Please continue.");
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("Please complete sharing 5 times before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const file = document.getElementById("screenshot").files[0];

  if (!file) {
    alert("Please upload a screenshot.");
    return;
  }

  // Upload file to Google Drive via Apps Script
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", file);

  const response = await fetch("https://script.google.com/macros/s/AKfycbww2iPVd47GrsoMbw4CsquWL-3iqKXeJDOoy0Sj9h8rXbpyaEgBtgb-_UDxWkKwNyu2/exec", {
    method: "POST",
    body: formData,
  });

  const result = await response.text();
  if (result === "Success") {
    // localStorage.setItem("submitted", "true");
    disableForm();
    successMsg.classList.remove("hidden");
  } else {
    alert("Error submitting form. Try again.");
  }
});

function disableForm() {
  document.querySelectorAll("input, button").forEach((el) => {
    el.disabled = true;
  });
}
