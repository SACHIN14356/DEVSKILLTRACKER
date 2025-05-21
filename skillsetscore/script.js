let players = {};
let user;

function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;

  // Save user details in localStorage
  localStorage.setItem("skillUser", JSON.stringify({ username, password, score: 0, watched: [] }));

  // Alert and redirect to login page
  alert("Signup successful!");
  window.location.href = "index.html";
}

function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  // Get the stored user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("skillUser"));

  // Check if the credentials match
  if (storedUser && storedUser.username === username && storedUser.password === password) {
    // Store the logged-in user in sessionStorage
    sessionStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html";
  } else {
    alert("Incorrect username or password!");
  }
}

function logout() {
  // Remove user from sessionStorage and redirect to login page
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

function onYouTubeIframeAPIReady() {
  const ids = ['1', '2', '3','4','5', '6', '7','8','9', '10', '11','12','13','14','15','16','17','18','19','20','21',];  // Video player IDs
  ids.forEach((id, index) => {
    players[id] = new YT.Player(id, {
      events: {
        'onStateChange': (event) => handleVideoStateChange(event, id, index)
      }
    });
  });
}

function handleVideoStateChange(event, id, index) {
  // Check if video has ended (0 means the video has finished playing)
  if (event.data === YT.PlayerState.ENDED) {
    if (!user.watched.includes(id)) {
      // If the user hasn't already watched this video, update the score and watched list
      user.score += 1;
      user.watched.push(id);
      localStorage.setItem("skillUser", JSON.stringify(user)); // Save updated user info

      // Update the score on the dashboard
      document.getElementById("score").textContent = user.score;
      alert(`🎉 Video ${index + 1} completed! +1 points added!`);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const username = sessionStorage.getItem("loggedInUser");

  if (document.getElementById("userDisplay") && username) {
    // Load the user from localStorage and display their information
    user = JSON.parse(localStorage.getItem("skillUser"));
    document.getElementById("userDisplay").textContent = username;
    document.getElementById("score").textContent = user.score;
  }
});
