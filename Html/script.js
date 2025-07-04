const clock = document.getElementById("clock");
const date = document.getElementById("date");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const alarmSound = document.getElementById("alarm-sound");

const confirmBox = document.getElementById("confirm-box");
const confirmYes = document.getElementById("confirm-yes");
const confirmNo = document.getElementById("confirm-no");
const clearAll = document.getElementById("clear-all");

// Saat ve tarih
setInterval(() => {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("tr-TR");
  date.textContent = now.toLocaleDateString("tr-TR");
}, 1000);

// Görev ekleme
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const time = document.getElementById("task-time").value;
  const desc = document.getElementById("task-desc").value;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${time} - ${desc}</span>
    <div>
      <button onclick="markDone(this)">✔</button>
      <button onclick="deleteTask(this)">🗑</button>
    </div>
  `;
  taskList.appendChild(li);

  // Alarm zamanı kontrolü
  const now = new Date();
  const taskTime = new Date();
  const [hour, minute] = time.split(":");
  taskTime.setHours(hour);
  taskTime.setMinutes(minute);
  taskTime.setSeconds(0);

  const diff = taskTime.getTime() - now.getTime();
  if (diff > 0) {
    setTimeout(() => {
      alarmSound.play();
      alert(`🔔 Görev zamanı: ${desc}`);
    }, diff);
  }

  taskForm.reset();
});

// Tamamla
function markDone(btn) {
  btn.closest("li").classList.toggle("done");
}

// Sil
function deleteTask(btn) {
  btn.closest("li").remove();
}

// Tümünü silme işlemi
clearAll.addEventListener("click", () => {
  confirmBox.classList.remove("hidden");
});

confirmYes.addEventListener("click", () => {
  taskList.innerHTML = "";
  confirmBox.classList.add("hidden");
});

confirmNo.addEventListener("click", () => {
  confirmBox.classList.add("hidden");
});
