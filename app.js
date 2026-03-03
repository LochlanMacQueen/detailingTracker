import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://xhwndgksrcfwdnveuudm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhod25kZ2tzcmNmd2RudmV1dWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MDA3NjgsImV4cCI6MjA4NDI3Njc2OH0.U_xhdc4j8jQQK2D9L0qB45IrofBTBbnpTpA7AJjaxdw";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const app = document.getElementById("app");
let currentUser = null;
let jobsCache = [];
let expensesCache = [];

// ============================================================
// AUTH RENDERS
// ============================================================
function renderLoggedOut() {
  app.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="min-height:100vh;padding:1rem">
      <div class="card p-4 w-100" style="max-width:400px">
        <h4 class="fw-bold mb-1">Welcome back</h4>
        <p class="text-muted small mb-4">Sign in to manage your business</p>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input class="form-control" id="email" type="email" placeholder="you@example.com">
        </div>
        <div class="mb-4">
          <label class="form-label">Password</label>
          <input class="form-control" id="password" type="password" placeholder="••••••••">
        </div>
        <button class="btn btn-primary w-100 mb-3" id="login-btn">Sign In</button>
        <p class="text-center text-muted small mb-0">
          No account? <a href="#" id="show-signup">Create one</a>
        </p>
        <p id="auth-error" class="text-danger small mt-2 mb-0"></p>
      </div>
    </div>
  `;
  document.getElementById("login-btn").onclick = signIn;
  document.getElementById("show-signup").onclick = (e) => {
    e.preventDefault();
    renderSignUp();
  };
}

function renderSignUp() {
  app.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="min-height:100vh;padding:1rem">
      <div class="card p-4 w-100" style="max-width:400px">
        <h4 class="fw-bold mb-1">Create account</h4>
        <p class="text-muted small mb-4">Get started for free</p>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input class="form-control" id="email" type="email" placeholder="you@example.com">
        </div>
        <div class="mb-4">
          <label class="form-label">Password</label>
          <input class="form-control" id="password" type="password" placeholder="••••••••">
        </div>
        <button class="btn btn-primary w-100 mb-3" id="signup-btn">Create Account</button>
        <p class="text-center text-muted small mb-0">
          Have an account? <a href="#" id="show-login">Sign in</a>
        </p>
        <p id="auth-error" class="text-danger small mt-2 mb-0"></p>
      </div>
    </div>
  `;
  document.getElementById("signup-btn").onclick = signUp;
  document.getElementById("show-login").onclick = (e) => {
    e.preventDefault();
    renderLoggedOut();
  };
}

// ============================================================
// MAIN APP LAYOUT
// ============================================================
async function renderLoggedIn() {
  app.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="min-height:100vh">
      <div class="spinner-border text-primary"></div>
    </div>
  `;

  const settings = await loadSettings();
  const businessName = settings?.business_name || "My Business";

  app.innerHTML = `
    <div class="app-wrapper">
      <aside class="sidebar">
        <div>
          <div class="sidebar-brand" id="sidebar-business-name">${businessName}</div>
          <nav>
            <div class="sidebar-link" data-section="overview">
              <i class="bi bi-grid"></i> Overview
            </div>
            <div class="sidebar-link" data-section="jobs">
              <i class="bi bi-list-check"></i> Jobs
            </div>
            <div class="sidebar-link" data-section="expenses">
              <i class="bi bi-receipt"></i> Expenses
            </div>
            <div class="sidebar-link" data-section="settings">
              <i class="bi bi-gear"></i> Settings
            </div>
          </nav>
        </div>
        <button class="btn btn-sm btn-outline-secondary w-100" id="logout-btn">
          <i class="bi bi-box-arrow-right me-1"></i> Sign Out
        </button>
      </aside>

      <div class="content-wrapper">
        <header class="top-bar">
          <span class="business-name" id="mobile-business-name">${businessName}</span>
          <button class="btn btn-sm btn-outline-secondary" id="logout-btn-mobile">
            <i class="bi bi-box-arrow-right"></i>
          </button>
        </header>
        <main id="main" class="main-content"></main>
      </div>
    </div>

    <nav class="bottom-nav">
      <div class="bottom-nav-item" data-section="overview">
        <i class="bi bi-grid"></i>
        <span>Overview</span>
      </div>
      <div class="bottom-nav-item" data-section="jobs">
        <i class="bi bi-list-check"></i>
        <span>Jobs</span>
      </div>
      <div class="bottom-nav-item" data-section="expenses">
        <i class="bi bi-receipt"></i>
        <span>Expenses</span>
      </div>
      <div class="bottom-nav-item" data-section="settings">
        <i class="bi bi-gear"></i>
        <span>Settings</span>
      </div>
    </nav>
  `;

  document.getElementById("logout-btn").onclick = signOut;
  document.getElementById("logout-btn-mobile").onclick = signOut;

  document.querySelectorAll(".sidebar-link, .bottom-nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      setActiveNav(item.dataset.section);
      navigate(item.dataset.section);
    });
  });

  setActiveNav("overview");
  renderOverview();
}

function navigate(section) {
  if (section === "overview") renderOverview();
  else if (section === "jobs") renderJobs();
  else if (section === "expenses") renderExpenses();
  else if (section === "settings") renderSettings();
}

function setActiveNav(section) {
  document.querySelectorAll(".sidebar-link, .bottom-nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.section === section);
  });
}

// ============================================================
// SECTION RENDERS
// ============================================================
async function renderOverview() {
  const main = document.getElementById("main");
  main.innerHTML = `<p class="text-muted">Loading...</p>`;

  const [revenue, profit, jobCount, thisMonth] = await Promise.all([
    getRevenue(),
    getProfit(),
    getJobs(),
    getThisMonthRevenue(),
  ]);

  main.innerHTML = `
    <h5 class="section-title mb-3">Overview</h5>

    <div class="row g-2 mb-3">
      <div class="col-6 col-lg-3">
        <div class="card p-3">
          <p class="stat-label">All-Time Revenue</p>
          <p class="stat-value">$${revenue}</p>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card p-3">
          <p class="stat-label">All-Time Profit</p>
          <p class="stat-value">$${profit}</p>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card p-3">
          <p class="stat-label">Total Jobs</p>
          <p class="stat-value">${jobCount}</p>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="card p-3">
          <p class="stat-label">This Month</p>
          <p class="stat-value">$${thisMonth}</p>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-lg-7">
        <div class="card p-3 h-100">
          <h6 class="fw-semibold mb-2">Upcoming Jobs</h6>
          <div id="upcoming-jobs-container"></div>
        </div>
      </div>
      <div class="col-12 col-lg-5">
        <div class="card p-3 h-100">
          <h6 class="fw-semibold mb-2">Job Status</h6>
          <canvas id="statusChart" style="max-height:180px"></canvas>
        </div>
      </div>
    </div>

    <div class="card p-3">
      <h6 class="fw-semibold mb-2">Revenue — Last 6 Months</h6>
      <div style="height:200px">
        <canvas id="revenueChart"></canvas>
      </div>
    </div>
  `;

  loadUpcomingJobs();
  createStatusChart();
  createRevenueChart();
}

async function renderJobs() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="section-title mb-0">Jobs</h5>
      <button class="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#modal"
              id="show-job-modal-btn">
        <i class="bi bi-plus"></i> Add Job
      </button>
    </div>
    <div class="card">
      <div class="table-responsive">
        <table class="table mb-0">
          <thead>
            <tr>
              <th>Client</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="jobs-tbody"></tbody>
        </table>
      </div>
    </div>
  `;
  document.getElementById("show-job-modal-btn").onclick = addJobModal;
  loadJobs();
}

async function renderExpenses() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="section-title mb-0">Expenses</h5>
      <button class="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#modal"
              id="show-expense-modal-btn">
        <i class="bi bi-plus"></i> Add
      </button>
    </div>
    <div class="card">
      <div class="table-responsive">
        <table class="table mb-0">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="expenses-tbody"></tbody>
        </table>
      </div>
    </div>
  `;
  loadExpenses();
  document.getElementById("show-expense-modal-btn").onclick = addExpenseModal;
}

async function renderSettings() {
  const main = document.getElementById("main");
  main.innerHTML = `<p class="text-muted">Loading...</p>`;

  const settings = await loadSettings();

  main.innerHTML = `
    <h5 class="section-title mb-3">Settings</h5>
    <div class="card p-4">
      <h6 class="fw-semibold mb-3">Business Info</h6>
      <div class="mb-3">
        <label class="form-label">Business Name</label>
        <input class="form-control" id="business-name" type="text"
               value="${settings?.business_name || ''}"
               placeholder="e.g. Biltmore Forest Detailing">
      </div>
      <div class="mb-4">
        <label class="form-label">Business Type</label>
        <input class="form-control" id="business-type" type="text"
               value="${settings?.business_type || ''}"
               placeholder="e.g. Auto Detailing">
      </div>
      <button class="btn btn-primary" id="save-settings-btn">Save</button>
      <p id="settings-msg" class="small mt-2 mb-0"></p>
    </div>
  `;
  document.getElementById("save-settings-btn").onclick = saveSettings;
}

// ============================================================
// SETTINGS
// ============================================================
async function loadSettings() {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("user_id", currentUser.id)
    .single();
  if (error) return null;
  return data;
}

async function saveSettings() {
  const businessName = document.getElementById("business-name").value.trim();
  const businessType = document.getElementById("business-type").value.trim();
  const msg = document.getElementById("settings-msg");

  const { error } = await supabase.from("settings").upsert(
    {
      user_id: currentUser.id,
      business_name: businessName,
      business_type: businessType,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    msg.className = "small mt-2 mb-0 text-danger";
    msg.textContent = "Error saving settings.";
  } else {
    msg.className = "small mt-2 mb-0 text-success";
    msg.textContent = "Saved!";
    const name = businessName || "My Business";
    const sidebar = document.getElementById("sidebar-business-name");
    const mobile = document.getElementById("mobile-business-name");
    if (sidebar) sidebar.textContent = name;
    if (mobile) mobile.textContent = name;
  }
}

// ============================================================
// OVERVIEW HELPERS
// ============================================================
async function loadUpcomingJobs() {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .gte("date", today)
    .order("date", { ascending: true })
    .limit(3);

  const container = document.getElementById("upcoming-jobs-container");
  if (!container) return;

  if (error || !data || data.length === 0) {
    container.innerHTML = `<p class="text-muted small mb-0">No upcoming jobs.</p>`;
    return;
  }

  container.innerHTML = data
    .map(
      (job) => `
    <div class="job-card">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <div class="fw-semibold">${job.client_name}</div>
          <div class="text-muted small">${job.services}</div>
        </div>
        <div class="fw-bold" style="color:var(--primary)">$${job.price}</div>
      </div>
      <div class="text-muted small mt-1">
        <i class="bi bi-calendar me-1"></i>${formatJobDate(job.date)}
        &bull;
        <i class="bi bi-clock ms-1 me-1"></i>${formatTime(job.start_time)}
      </div>
    </div>
  `
    )
    .join("");
}

async function createStatusChart() {
  const { data, error } = await supabase.from("jobs").select("status");
  if (error) return;

  let complete = 0, pending = 0;
  data.forEach((job) => {
    if (job.status === "complete") complete++;
    else pending++;
  });

  const ctx = document.getElementById("statusChart")?.getContext("2d");
  if (!ctx) return;

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Complete", "Pending"],
      datasets: [{
        data: [complete, pending],
        backgroundColor: ["#34d399", "#fbbf24"],
        borderWidth: 2,
        borderColor: "#fff",
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
      cutout: "65%",
    },
  });
}

async function createRevenueChart() {
  const { labels, data } = await getMonthlyRevenue();
  const ctx = document.getElementById("revenueChart")?.getContext("2d");
  if (!ctx) return;

  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, "rgba(94, 159, 242, 0.25)");
  gradient.addColorStop(1, "rgba(94, 159, 242, 0)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        data,
        borderColor: "#5e9ff2",
        backgroundColor: gradient,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#5e9ff2",
        pointRadius: 4,
        pointHoverRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (c) => "$" + c.parsed.y } },
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
          ticks: { callback: (v) => "$" + v },
        },
      },
    },
  });
}

// ============================================================
// DATA HELPERS
// ============================================================
async function getRevenue() {
  const { data, error } = await supabase
    .from("jobs")
    .select("price")
    .eq("status", "complete");
  if (error) return 0;
  return data.reduce((sum, job) => sum + Number(job.price), 0);
}

async function getProfit() {
  const revenue = await getRevenue();
  const { data, error } = await supabase.from("expenses").select("amount");
  if (error) return revenue;
  const expenses = data.reduce((sum, e) => sum + Number(e.amount), 0);
  return revenue - expenses;
}

async function getJobs() {
  const { data, error } = await supabase.from("jobs").select("id");
  if (error) return 0;
  return data.length;
}

async function getThisMonthRevenue() {
  const now = new Date();
  const start = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  const { data, error } = await supabase
    .from("jobs")
    .select("price")
    .eq("status", "complete")
    .gte("date", start);
  if (error) return 0;
  return data.reduce((sum, job) => sum + Number(job.price), 0);
}

async function getMonthlyRevenue() {
  const now = new Date();
  const labels = [];
  const monthKeys = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(d.toLocaleString("default", { month: "short", year: "2-digit" }));
    monthKeys.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    );
  }

  const sixMonthsAgo = monthKeys[0] + "-01";
  const { data, error } = await supabase
    .from("jobs")
    .select("date, price")
    .eq("status", "complete")
    .gte("date", sixMonthsAgo);

  if (error) return { labels, data: new Array(6).fill(0) };

  const revenueMap = Object.fromEntries(monthKeys.map((k) => [k, 0]));
  data.forEach((job) => {
    const key = job.date.slice(0, 7);
    if (key in revenueMap) revenueMap[key] += Number(job.price);
  });

  return { labels, data: monthKeys.map((k) => revenueMap[k]) };
}

// ============================================================
// JOBS
// ============================================================
async function loadJobs() {
  const tbody = document.getElementById("jobs-tbody");
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("date", { ascending: false });

  if (error) { console.log(error); return; }

  jobsCache = data;

  tbody.innerHTML = data
    .map(
      (job) => `
    <tr>
      <td>
        <div class="fw-semibold">${job.client_name}</div>
        <div class="text-muted small">${job.phone}</div>
      </td>
      <td>
        <div>${formatJobDate(job.date)}</div>
        <div class="text-muted small">${formatTime(job.start_time)}</div>
      </td>
      <td class="fw-semibold">$${job.price}</td>
      <td>
        <span class="${job.status === "complete" ? "badge-complete" : "badge-pending"}">
          ${job.status}
        </span>
      </td>
      <td class="text-nowrap">
        ${job.status !== "complete" ? `
          <button class="btn-icon complete-btn" data-id="${job.id}" title="Mark complete">
            <i class="bi bi-check-lg text-success"></i>
          </button>
        ` : ""}
        <button class="btn-icon edit-job-btn" data-id="${job.id}" title="Edit">
          <i class="bi bi-pencil text-secondary"></i>
        </button>
        <button class="btn-icon delete-btn" data-id="${job.id}" title="Delete">
          <i class="bi bi-trash text-danger"></i>
        </button>
      </td>
    </tr>
  `
    )
    .join("");

  document.querySelectorAll(".complete-btn").forEach((btn) => {
    btn.addEventListener("click", () => completeJob(btn.dataset.id));
  });
  document.querySelectorAll(".edit-job-btn").forEach((btn) => {
    btn.addEventListener("click", () => editJobModal(btn.dataset.id));
  });
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => deleteJob(btn.dataset.id));
  });
}

function addJobModal() {
  document.getElementById("modal-content").innerHTML = `
    <div class="modal-header">
      <h5 class="modal-title">Add Job</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
      <div class="mb-3">
        <label class="form-label">Client Name *</label>
        <input class="form-control" id="client-name" type="text" placeholder="John Doe">
      </div>
      <div class="mb-3">
        <label class="form-label">Phone *</label>
        <input class="form-control" id="phone" type="tel" placeholder="828-123-4567">
      </div>
      <div class="mb-3">
        <label class="form-label">Address *</label>
        <input class="form-control" id="address" type="text">
      </div>
      <div class="mb-3">
        <label class="form-label">Services *</label>
        <input class="form-control" id="services" type="text" placeholder="Interior detail">
      </div>
      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label">Date *</label>
          <input class="form-control" id="job-date" type="date">
        </div>
        <div class="col-6">
          <label class="form-label">Start Time *</label>
          <input class="form-control" id="start-time" type="time">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Price *</label>
        <div class="input-group">
          <span class="input-group-text">$</span>
          <input class="form-control" id="price" type="number" placeholder="100">
        </div>
      </div>
      <div class="mb-1">
        <label class="form-label">Notes</label>
        <textarea class="form-control" id="notes" rows="2" placeholder="Optional"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button class="btn btn-primary" id="add-job-btn">Add Job</button>
    </div>
  `;
  document.getElementById("add-job-btn").onclick = addJob;
}

function editJobModal(jobId) {
  const job = jobsCache.find((j) => j.id === jobId);
  if (!job) return;

  document.getElementById("modal-content").innerHTML = `
    <div class="modal-header">
      <h5 class="modal-title">Edit Job</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
      <div class="mb-3">
        <label class="form-label">Client Name *</label>
        <input class="form-control" id="client-name" type="text" value="${job.client_name}">
      </div>
      <div class="mb-3">
        <label class="form-label">Phone *</label>
        <input class="form-control" id="phone" type="tel" value="${job.phone}">
      </div>
      <div class="mb-3">
        <label class="form-label">Address *</label>
        <input class="form-control" id="address" type="text" value="${job.address}">
      </div>
      <div class="mb-3">
        <label class="form-label">Services *</label>
        <input class="form-control" id="services" type="text" value="${job.services}">
      </div>
      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label">Date *</label>
          <input class="form-control" id="job-date" type="date" value="${job.date}">
        </div>
        <div class="col-6">
          <label class="form-label">Start Time *</label>
          <input class="form-control" id="start-time" type="time" value="${job.start_time}">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Price *</label>
        <div class="input-group">
          <span class="input-group-text">$</span>
          <input class="form-control" id="price" type="number" value="${job.price}">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Status</label>
        <select class="form-select" id="job-status">
          <option value="incomplete" ${job.status === "incomplete" ? "selected" : ""}>Incomplete</option>
          <option value="complete" ${job.status === "complete" ? "selected" : ""}>Complete</option>
        </select>
      </div>
      <div class="mb-1">
        <label class="form-label">Notes</label>
        <textarea class="form-control" id="notes" rows="2">${job.notes || ""}</textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button class="btn btn-primary" id="update-job-btn">Save Changes</button>
    </div>
  `;

  bootstrap.Modal.getOrCreateInstance(document.getElementById("modal")).show();
  document.getElementById("update-job-btn").onclick = () => updateJob(jobId);
}

async function addJob() {
  const fields = {
    client_name: document.getElementById("client-name").value,
    address: document.getElementById("address").value,
    price: Number(document.getElementById("price").value),
    services: document.getElementById("services").value,
    start_time: document.getElementById("start-time").value,
    date: document.getElementById("job-date").value,
    phone: document.getElementById("phone").value,
    notes: document.getElementById("notes").value,
    status: "incomplete",
    user_id: currentUser.id,
  };

  if (!fields.client_name || !fields.address || !fields.price ||
      !fields.services || !fields.start_time || !fields.date || !fields.phone) {
    alert("Please fill in all required fields.");
    return;
  }

  const { error } = await supabase.from("jobs").insert(fields);
  if (error) { console.error(error); return; }

  bootstrap.Modal.getInstance(document.getElementById("modal")).hide();
  loadJobs();
}

async function updateJob(jobId) {
  const fields = {
    client_name: document.getElementById("client-name").value,
    address: document.getElementById("address").value,
    price: Number(document.getElementById("price").value),
    services: document.getElementById("services").value,
    start_time: document.getElementById("start-time").value,
    date: document.getElementById("job-date").value,
    phone: document.getElementById("phone").value,
    notes: document.getElementById("notes").value,
    status: document.getElementById("job-status").value,
  };

  if (!fields.client_name || !fields.address || !fields.price ||
      !fields.services || !fields.start_time || !fields.date || !fields.phone) {
    alert("Please fill in all required fields.");
    return;
  }

  const { error } = await supabase.from("jobs").update(fields).eq("id", jobId);
  if (error) { console.error(error); return; }

  bootstrap.Modal.getInstance(document.getElementById("modal")).hide();
  loadJobs();
}

async function completeJob(jobId) {
  await supabase.from("jobs").update({ status: "complete" }).eq("id", jobId);
  loadJobs();
}

async function deleteJob(jobId) {
  await supabase.from("jobs").delete().eq("id", jobId);
  loadJobs();
}

// ============================================================
// EXPENSES
// ============================================================
async function loadExpenses() {
  const tbody = document.getElementById("expenses-tbody");
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });

  if (error) { console.log(error); return; }

  expensesCache = data;

  tbody.innerHTML = data
    .map(
      (expense) => `
    <tr>
      <td>${expense.category}</td>
      <td class="fw-semibold">$${expense.amount}</td>
      <td>${formatJobDate(expense.date)}</td>
      <td>${expense.description}</td>
      <td class="text-nowrap">
        <button class="btn-icon edit-expense-btn" data-id="${expense.id}" title="Edit">
          <i class="bi bi-pencil text-secondary"></i>
        </button>
        <button class="btn-icon delete-expense-btn" data-id="${expense.id}" title="Delete">
          <i class="bi bi-trash text-danger"></i>
        </button>
      </td>
    </tr>
  `
    )
    .join("");

  document.querySelectorAll(".edit-expense-btn").forEach((btn) => {
    btn.addEventListener("click", () => editExpenseModal(btn.dataset.id));
  });
  document.querySelectorAll(".delete-expense-btn").forEach((btn) => {
    btn.addEventListener("click", () => deleteExpense(btn.dataset.id));
  });
}

function addExpenseModal() {
  document.getElementById("modal-content").innerHTML = `
    <div class="modal-header">
      <h5 class="modal-title">Add Expense</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
      <div class="mb-3">
        <label class="form-label">Date</label>
        <input class="form-control" id="expense-date" type="date">
      </div>
      <div class="mb-3">
        <label class="form-label">Category *</label>
        <input class="form-control" id="category" type="text" placeholder="Equipment, Supplies...">
      </div>
      <div class="mb-3">
        <label class="form-label">Amount *</label>
        <div class="input-group">
          <span class="input-group-text">$</span>
          <input class="form-control" id="amount" type="number" placeholder="40">
        </div>
      </div>
      <div class="mb-1">
        <label class="form-label">Description *</label>
        <textarea class="form-control" id="description" rows="2" placeholder="Brief description"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button class="btn btn-primary" id="add-expense-btn">Add Expense</button>
    </div>
  `;
  document.getElementById("add-expense-btn").onclick = addExpense;
}

function editExpenseModal(expenseId) {
  const expense = expensesCache.find((e) => e.id === expenseId);
  if (!expense) return;

  document.getElementById("modal-content").innerHTML = `
    <div class="modal-header">
      <h5 class="modal-title">Edit Expense</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
      <div class="mb-3">
        <label class="form-label">Date</label>
        <input class="form-control" id="expense-date" type="date" value="${expense.date || ''}">
      </div>
      <div class="mb-3">
        <label class="form-label">Category *</label>
        <input class="form-control" id="category" type="text" value="${expense.category}">
      </div>
      <div class="mb-3">
        <label class="form-label">Amount *</label>
        <div class="input-group">
          <span class="input-group-text">$</span>
          <input class="form-control" id="amount" type="number" value="${expense.amount}">
        </div>
      </div>
      <div class="mb-1">
        <label class="form-label">Description *</label>
        <textarea class="form-control" id="description" rows="2">${expense.description}</textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button class="btn btn-primary" id="update-expense-btn">Save Changes</button>
    </div>
  `;

  bootstrap.Modal.getOrCreateInstance(document.getElementById("modal")).show();
  document.getElementById("update-expense-btn").onclick = () => updateExpense(expenseId);
}

async function addExpense() {
  const category = document.getElementById("category").value;
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("expense-date").value;

  if (!category || !amount || !description) {
    alert("Please fill in all required fields.");
    return;
  }

  const { error } = await supabase.from("expenses").insert({
    category, amount, description, date, user_id: currentUser.id,
  });
  if (error) { console.log(error); return; }

  bootstrap.Modal.getInstance(document.getElementById("modal")).hide();
  loadExpenses();
}

async function updateExpense(expenseId) {
  const category = document.getElementById("category").value;
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("expense-date").value;

  if (!category || !amount || !description) {
    alert("Please fill in all required fields.");
    return;
  }

  const { error } = await supabase
    .from("expenses")
    .update({ category, amount, description, date })
    .eq("id", expenseId);
  if (error) { console.log(error); return; }

  bootstrap.Modal.getInstance(document.getElementById("modal")).hide();
  loadExpenses();
}

async function deleteExpense(expenseId) {
  await supabase.from("expenses").delete().eq("id", expenseId);
  loadExpenses();
}

// ============================================================
// FORMATTING
// ============================================================
function formatTime(time) {
  if (!time) return "";
  const [h, m] = time.slice(0, 5).split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function formatJobDate(date) {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[Number(month) - 1]} ${Number(day)}, ${year}`;
}

// ============================================================
// AUTH
// ============================================================
async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) document.getElementById("auth-error").textContent = error.message;
}

async function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) document.getElementById("auth-error").textContent = error.message;
}

async function signOut() {
  await supabase.auth.signOut();
}

// ============================================================
// APP BOOTSTRAP
// ============================================================
const {
  data: { session },
} = await supabase.auth.getSession();

if (session?.user) {
  currentUser = session.user;
  renderLoggedIn();
} else {
  currentUser = null;
  renderLoggedOut();
}

supabase.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    currentUser = session.user;
    renderLoggedIn();
  } else {
    currentUser = null;
    renderLoggedOut();
  }
});
