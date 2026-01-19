import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL ="https://xhwndgksrcfwdnveuudm.supabase.co"
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhod25kZ2tzcmNmd2RudmV1dWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MDA3NjgsImV4cCI6MjA4NDI3Njc2OH0.U_xhdc4j8jQQK2D9L0qB45IrofBTBbnpTpA7AJjaxdw"


// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const app = document.getElementById("app");

let currentUser = null;
let currentProfile = null;
let calendarView = "month"; // "month" or "week"
let calendarAnchor = new Date();


async function loadProfile() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", currentUser.id)
      .maybeSingle(); // allows 0 rows without throwing
  
    if (error) {
      console.error("Failed to load profile:", error);
      return;
    }
  
    // If no profile exists (old user), create one
    if (!data) {
      const { error: insertErr } = await supabase.from("profiles").insert({
        user_id: currentUser.id,
        business_name: "My Business",
      });
  
      if (insertErr) {
        console.error("Failed to auto-create profile:", insertErr);
        return;
      }
  
      // Try again after creating
      return await loadProfile();
    }
  
    currentProfile = data;
  }
  
  

// UI Renders
async function renderLoading() {
    app.innerHTML = `
    <p>Loading...</p>
    `
}
async function renderLoggedOut() {
    app.innerHTML = `
    <h2>Login</h2>
    <input id="email" type="email" placeholder="Email" />
    <br />
    <input id="password" type="password" placeholder="Password" />
    <br />
    <button id="signup">Sign Up</button>
    <button id="login">Log In</button>
    <p id="error" style="color:red;"></p>
    `;

    document.getElementById('signup').onclick = signUp;
    document.getElementById('login').onclick = signIn;
}
async function renderLoggedIn(user) {
    app.innerHTML = `

    <div class='layout'>
    <aside class="sidebar">
    <div class="sidebar-header">
    ${currentProfile?.business_name || "Your Business"}
    </div>

    <nav>
    <div id='overview' class='nav-item'>Overview</div>
    <div id='jobs' class='nav-item'>Jobs</div>
    <div id='calendar' class='nav-item'>Calendar</div>
    <div id='expenses' class='nav-item'>Expenses</div>
    <div id='settings' class='nav-item'>Settings</div>
    </nav>
    
    <div class='sidebar-footer'>
    ${currentProfile?.owner_name || user.email}
    </div>

    </aside>
    <main id='main'>



    </main>
    </div>
    `
    renderOverview();
    document.getElementById('overview').onclick = renderOverview;
    document.getElementById('jobs').onclick = renderJobs;
    document.getElementById('calendar').onclick = renderCalendar;
    document.getElementById('expenses').onclick = renderExpenses;
    document.getElementById('settings').onclick = renderSettings;
}
//main is where InnerHTML is changed around
// ------------- RENDER NAV SECTIONS --------------
async function renderOverview() {
    const main = document.getElementById("main");
  
    main.innerHTML = `
      <div class="overview-grid">
        <div class="kpi-card">
          <div class="kpi-label">Revenue (This Month)</div>
          <div id="kpi-revenue" class="kpi-value">—</div>
        </div>
  
        <div class="kpi-card">
          <div class="kpi-label">Expenses (This Month)</div>
          <div id="kpi-expenses" class="kpi-value">—</div>
        </div>
  
        <div class="kpi-card">
          <div class="kpi-label">Profit (This Month)</div>
          <div id="kpi-profit" class="kpi-value">—</div>
        </div>
  
        <div class="kpi-card">
          <div class="kpi-label">Jobs (Next 7 Days)</div>
          <div id="kpi-upcoming" class="kpi-value">—</div>
        </div>
      </div>
  
      <div class="card">
        <h2>Next Job</h2>
        <div id="next-job">Loading…</div>
      </div>
      <div class="card">
  <h2>Revenue Trend (Last 6 Weeks)</h2>
  <div id="weekly-chart" class="weekly-chart"></div>
</div>

    `;
  
    await loadOverviewData();
  }

  async function loadOverviewData() {
    if (!currentUser) return;
  
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
    const startISO = monthStart.toISOString().slice(0, 10);
    const endISO = monthEnd.toISOString().slice(0, 10);
  
    // Completed jobs this month
    const { data: jobs, error: jobsErr } = await supabase
      .from("jobs")
      .select("price")
      .eq("status", "completed")
      .gte("date", startISO)
      .lte("date", endISO);
  
    if (jobsErr) console.error(jobsErr);
  
    const revenue = (jobs || []).reduce((sum, j) => sum + (j.price || 0), 0);
  
    // Expenses this month
    const { data: expenses, error: expErr } = await supabase
      .from("expenses")
      .select("amount")
      .gte("date", startISO)
      .lte("date", endISO);
  
    if (expErr) console.error(expErr);
  
    const expenseTotal = (expenses || []).reduce((sum, e) => sum + (e.amount || 0), 0);
  
    const profit = revenue - expenseTotal;
  
    document.getElementById("kpi-revenue").textContent = `$${revenue.toFixed(2)}`;
    document.getElementById("kpi-expenses").textContent = `$${expenseTotal.toFixed(2)}`;
    document.getElementById("kpi-profit").textContent = `$${profit.toFixed(2)}`;
  
    // Jobs in next 7 days
    const weekEnd = new Date();
    weekEnd.setDate(weekEnd.getDate() + 7);
    const weekISO = weekEnd.toISOString().slice(0, 10);
  
    const { data: upcoming } = await supabase
      .from("jobs")
      .select("*")
      .eq("status", "scheduled")
      .gte("date", startISO)
      .lte("date", weekISO);
  
    document.getElementById("kpi-upcoming").textContent = upcoming?.length ?? 0;
  
    // Next job
    const { data: nextJobs } = await supabase
      .from("jobs")
      .select("*")
      .eq("status", "scheduled")
      .gte("date", startISO)
      .order("date", { ascending: true })
      .limit(1);
  
    const next = nextJobs?.[0];
    const nextEl = document.getElementById("next-job");
  
    if (!next) {
      nextEl.textContent = "No upcoming jobs.";
    } else {
      nextEl.innerHTML = `
        <strong>${next.client_name}</strong><br>
        ${next.date} ${next.start_time ?? ""}<br>
        ${next.address}<br>
        $${next.price}
      `;
    }
      // Weekly revenue (last 6 weeks)
  const today = new Date();
  const weeks = [];

  for (let i = 5; i >= 0; i--) {
    const start = new Date(today);
    start.setDate(today.getDate() - (i * 7));
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    weeks.push({
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
      total: 0
    });
  }

  const { data: weeklyJobs } = await supabase
    .from("jobs")
    .select("price, date")
    .eq("status", "completed")
    .gte("date", weeks[0].start);

  if (weeklyJobs) {
    weeklyJobs.forEach(job => {
      const w = weeks.find(wk => job.date >= wk.start && job.date <= wk.end);
      if (w) w.total += job.price || 0;
    });
  }

  const chart = document.getElementById("weekly-chart");
  chart.innerHTML = "";

  const max = Math.max(...weeks.map(w => w.total), 1);

  weeks.forEach(w => {
    const bar = document.createElement("div");
    bar.className = "week-bar";
    bar.style.height = `${(w.total / max) * 100}%`;
    bar.title = `$${w.total.toFixed(0)}`;
    chart.appendChild(bar);
  });

  }
  



    

// JOB LOGIC
// JOB PAGE RENDERER
let jobsPage = 0;
const JOBS_PAGE_SIZE = 25;

function renderJobs() {
    const content = document.getElementById("main");

  content.innerHTML = `
    <div class="page-header">
      <h1>Jobs</h1>
      <button id="add-job-btn" class="primary">+ Add Job</button>
    </div>

    <div class="table-wrap">
      <table class="jobs-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Client</th>
            <th>Service</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody id="jobs-body"></tbody>
      </table>
    </div>

    <div class="pagination">
      <button id="prev-jobs">Prev</button>
      <span id="jobs-range"></span>
      <button id="next-jobs">Next</button>
    </div>
  `;

  document.getElementById("add-job-btn").onclick = () => renderJobModal();
  document.getElementById("prev-jobs").onclick = () => {
    if (jobsPage > 0) {
      jobsPage--;
      loadJobs();
    }
  };
  document.getElementById("next-jobs").onclick = () => {
    jobsPage++;
    loadJobs();
  };

  jobsPage = 0;
  loadJobs();
}


// JOBS LOADER
async function loadJobs() {
    if (!currentUser) return;
  
    const start = jobsPage * JOBS_PAGE_SIZE;
    const end = start + JOBS_PAGE_SIZE - 1;
  
    const { data, error, count } = await supabase
      .from("jobs")
      .select("*", { count: "exact" })
      .order("date", { ascending: false })
      .range(start, end);
  
    if (error) {
      console.error(error);
      return;
    }
  
    const body = document.getElementById("jobs-body");
    body.innerHTML = "";
  
    if (data.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 5;
      td.textContent = "No jobs yet";
      tr.appendChild(td);
      body.appendChild(tr);
    } else {
        data.forEach(job => {
            const tr = document.createElement("tr");
          
            const statusCell = job.status === "completed"
              ? `<span style="color: #16a34a; font-weight: 600;">Completed</span>`
              : `<button class="complete-btn" data-id="${job.id}">Complete</button>`;
          
            tr.innerHTML = `
              <td>${job.date ?? ""}</td>
              <td>${job.client_name}</td>
              <td>${job.services ?? ""}</td>
              <td>$${job.price ?? ""}</td>
              <td>${statusCell}</td>
              <td>
                <button class="delete-btn" data-id="${job.id}">Delete</button>
              </td>
            `;
          
            body.appendChild(tr);
          });
          document.querySelectorAll(".complete-btn").forEach(btn => {
            btn.onclick = () => markJobCompleted(btn.dataset.id);
          });
          
          document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.onclick = () => confirmDeleteJob(btn.dataset.id);
          });
                    
    }
  
    const range = document.getElementById("jobs-range");
    const shownStart = Math.min(start + 1, count);
    const shownEnd = Math.min(end + 1, count);
    range.textContent = `${shownStart}-${shownEnd} of ${count}`;
  }



  async function loadExpenses() {
    if (!currentUser) return;
  
    const start = expensesPage * EXPENSES_PAGE_SIZE;
    const end = start + EXPENSES_PAGE_SIZE - 1;
  
    const { data, error, count } = await supabase
      .from("expenses")
      .select("*", { count: "exact" })
      .order("date", { ascending: false })
      .range(start, end);
  
    if (error) {
      console.error(error);
      return;
    }
  
    const body = document.getElementById("expenses-body");
    body.innerHTML = "";
  
    if (data.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 4;
      td.textContent = "No expenses yet";
      tr.appendChild(td);
      body.appendChild(tr);
    } else {
      data.forEach(exp => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${exp.date}</td>
          <td>${exp.category}</td>
          <td>${exp.description ?? ""}</td>
          <td>$${exp.amount}</td>
        `;
        body.appendChild(tr);
      });
    }
  
    const range = document.getElementById("expenses-range");
    const shownStart = Math.min(start + 1, count);
    const shownEnd = Math.min(end + 1, count);
    range.textContent = `${shownStart}-${shownEnd} of ${count}`;
  }

  


  async function markJobCompleted(jobId) {
    const { error } = await supabase
      .from("jobs")
      .update({ status: "completed" })
      .eq("id", jobId);
  
    if (error) {
      console.error(error);
      return;
    }
  
    loadJobs();
  }
  function confirmDeleteJob(jobId) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
  
    modal.classList.remove("hidden");
  
    modalContent.innerHTML = `
      <h2>Delete Job</h2>
      <p>This action cannot be undone.</p>
  
      <div class="modal-actions">
        <button id="cancel-delete">Cancel</button>
        <button id="confirm-delete" class="primary">Delete</button>
      </div>
    `;
  
    document.getElementById("cancel-delete").onclick = closeModal;
    document.getElementById("confirm-delete").onclick = async () => {
      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", jobId);
  
      if (error) {
        console.error(error);
        return;
      }
  
      closeModal();
      loadJobs();
    };
  }
    

  // JOB MODAL
  function renderJobModal(job = null) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
  
    modal.classList.remove("hidden");
  
    modalContent.innerHTML = `
      <h2>${job ? "Edit Job" : "Add Job"}</h2>
  
      <label>Client Name</label>
      <input id="job-client" value="${job?.client_name ?? ""}" />
  
      <label>Phone</label>
      <input id="job-phone" value="${job?.phone ?? ""}" />
  
      <label>Address</label>
      <input id="job-address" value="${job?.address ?? ""}" />
  
      <label>Date</label>
      <input type="date" id="job-date" value="${job?.date ?? ""}" />
  
      <label>Start Time</label>
      <input type="time" id="job-start" value="${job?.start_time ?? ""}" />
  
      <label>End Time</label>
      <input type="time" id="job-end" value="${job?.end_time ?? ""}" />
  
      <label>Services</label>
      <input id="job-services" value="${job?.services ?? ""}" />
  
      <label>Notes</label>
      <textarea id="job-notes">${job?.notes ?? ""}</textarea>
  
      <label>Price</label>
      <input id="job-price" type="number" value="${job?.price ?? ""}" />
  
      <div class="modal-actions">
        <button id="cancel-job">Cancel</button>
        <button id="save-job" class="primary">${job ? "Save" : "Create"}</button>
      </div>
    `;
  
    document.getElementById("cancel-job").onclick = closeModal;
    document.getElementById("save-job").onclick = saveJob;
  }



  function renderExpenseModal() {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
  
    modal.classList.remove("hidden");
  
    modalContent.innerHTML = `
      <h2>Add Expense</h2>
  
      <label>Date</label>
      <input type="date" id="exp-date" />
  
      <label>Category</label>
      <input id="exp-category" placeholder="Gas, Supplies, Tools..." />
  
      <label>Description</label>
      <input id="exp-desc" />
  
      <label>Amount</label>
      <input type="number" id="exp-amount" />
  
      <div class="modal-actions">
        <button id="cancel-expense">Cancel</button>
        <button id="save-expense" class="primary">Add</button>
      </div>
    `;
  
    document.getElementById("cancel-expense").onclick = closeModal;
    document.getElementById("save-expense").onclick = saveExpense;
  }
  async function saveExpense() {
    if (!currentUser) return;
  
    const payload = {
      user_id: currentUser.id,
      date: document.getElementById("exp-date").value,
      category: document.getElementById("exp-category").value,
      description: document.getElementById("exp-desc").value,
      amount: Number(document.getElementById("exp-amount").value)
    };
  
    const { error } = await supabase.from("expenses").insert(payload);
  
    if (error) {
      console.error(error);
      return;
    }
  
    closeModal();
    loadExpenses();
  }
  
  






  // HELPER FUNCTIONS 
  function closeModal() {
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("modal-content").innerHTML = "";
  }
  
  async function saveJob() {
    if (!currentUser) return;
  
    const payload = {
      user_id: currentUser.id,
      client_name: document.getElementById("job-client").value,
      phone: document.getElementById("job-phone").value,
      address: document.getElementById("job-address").value,
      date: document.getElementById("job-date").value,
      start_time: document.getElementById("job-start").value,
      end_time: document.getElementById("job-end").value,
      services: document.getElementById("job-services").value,
      notes: document.getElementById("job-notes").value,
      price: Number(document.getElementById("job-price").value),
      status: "scheduled"
    };
  
    const { error } = await supabase.from("jobs").insert(payload);
  
    if (error) {
      console.error(error);
      return;
    }
    
    closeModal();
    loadJobs();
  }
  document.getElementById("close-modal-btn").onclick = closeModal;


  async function renderCalendar() {
    const main = document.getElementById("main");
  
    main.innerHTML = `
      <div class="calendar-header">
        <div>
          <button id="cal-prev">◀</button>
          <button id="cal-today">Today</button>
          <button id="cal-next">▶</button>
        </div>
        <div class="calendar-title" id="cal-title"></div>
        <div>
          <button id="cal-week">Week</button>
          <button id="cal-month">Month</button>
        </div>
      </div>
  
      <div id="calendar-view"></div>
    `;
  
    document.getElementById("cal-prev").onclick = () => shiftCalendar(-1);
    document.getElementById("cal-next").onclick = () => shiftCalendar(1);
    document.getElementById("cal-today").onclick = () => {
      calendarAnchor = new Date();
      drawCalendar();
    };
  
    document.getElementById("cal-week").onclick = () => {
      calendarView = "week";
      drawCalendar();
    };
  
    document.getElementById("cal-month").onclick = () => {
      calendarView = "month";
      drawCalendar();
    };
  
    drawCalendar();
  }
  
  function drawCalendar() {
    const title = document.getElementById("cal-title");
  
    if (calendarView === "month") {
      title.textContent = calendarAnchor.toLocaleString("default", {
        month: "long",
        year: "numeric"
      });
      renderMonthView(calendarAnchor);
    } else {
      title.textContent = "Week of " + calendarAnchor.toDateString();
      renderWeekView(calendarAnchor);
    }
  }
  
  function shiftCalendar(dir) {
    if (calendarView === "month") {
      calendarAnchor = new Date(
        calendarAnchor.getFullYear(),
        calendarAnchor.getMonth() + dir,
        1
      );
    } else {
      calendarAnchor = new Date(calendarAnchor);
      calendarAnchor.setDate(calendarAnchor.getDate() + dir * 7);
    }
    drawCalendar();
  }
  
  async function renderMonthView(anchor) {
    const view = document.getElementById("calendar-view");
  
    const year = anchor.getFullYear();
    const month = anchor.getMonth();
  
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
  
    const start = new Date(first);
    start.setDate(first.getDate() - first.getDay());
  
    const end = new Date(last);
    end.setDate(last.getDate() + (6 - last.getDay()));
  
    const startISO = start.toISOString().slice(0, 10);
    const endISO = end.toISOString().slice(0, 10);
  
    const { data: jobs } = await supabase
      .from("jobs")
      .select("*")
      .gte("date", startISO)
      .lte("date", endISO);
  
    view.innerHTML = `<div class="month-grid"></div>`;
    const grid = view.querySelector(".month-grid");
  
    let cursor = new Date(start);
  
    while (cursor <= end) {
      const iso = cursor.toISOString().slice(0, 10);
      const dayJobs = (jobs || []).filter(j => j.date === iso);
  
      const cell = document.createElement("div");
      cell.className = "month-cell";
      cell.innerHTML = `
      <div class="month-date">${cursor.getDate()}</div>
      ${dayJobs.slice(0, 3).map(j => {
      const time = j.start_time ? j.start_time.slice(0, 5) : "";
      return `<div class="month-job">${time} ${j.client_name}</div>`;
      }).join("")}
      `;

  
      grid.appendChild(cell);
      cursor.setDate(cursor.getDate() + 1);
    }
  }
  
  async function renderWeekView(anchor) {
    const view = document.getElementById("calendar-view");
  
    const start = new Date(anchor);
    start.setDate(anchor.getDate() - anchor.getDay());
    start.setHours(0, 0, 0, 0);
  
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
  
    const startISO = start.toISOString().slice(0, 10);
    const endISO = end.toISOString().slice(0, 10);
  
    const { data: jobs } = await supabase
      .from("jobs")
      .select("*")
      .gte("date", startISO)
      .lte("date", endISO);
  
    view.innerHTML = `
      <div class="week-wrapper">
        <div class="time-col">
          ${Array.from({ length: 16 }, (_, i) => {
            const hour = i + 6;
            const label = hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
            return `<div class="time-slot">${label}</div>`;
          }).join("")}
        </div>
        ${Array.from({ length: 7 }, (_, i) => `<div class="week-day-col"><div class="week-day-header"></div><div class="week-day-body"></div></div>`).join("")}
      </div>
    `;
  
    const cols = view.querySelectorAll(".week-day-col");
  
    cols.forEach((col, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      col.querySelector(".week-day-header").textContent = day.toDateString();
  
      const body = col.querySelector(".week-day-body");
      const iso = day.toISOString().slice(0, 10);
      const dayJobs = (jobs || []).filter(j => j.date === iso);
  
      dayJobs.forEach(job => {
        if (!job.start_time || !job.end_time) return;
  
        const [sh, sm] = job.start_time.split(":").map(Number);
        const [eh, em] = job.end_time.split(":").map(Number);
  
        // Baseline is 6:00 AM, but our visual grid is slightly offset.
        // Subtract an extra 30 minutes to align perfectly.
        const startMin = (sh * 60 + sm) - 390;
        const endMin = (eh * 60 + em) - 390;

  
        const block = document.createElement("div");
        block.className = "week-job-block";
        block.style.top = `${startMin}px`;
        block.style.height = `${Math.max(endMin - startMin, 30)}px`;
        const startLabel = job.start_time?.slice(0, 5) ?? "";
        block.innerHTML = `
        <strong>${job.client_name}</strong><br>
        <span style="font-size:10px;">${startLabel} · ${job.services ?? ""}</span>
        `;

  
        body.appendChild(block);
      });
    });
  }
  
  
  




let expensesPage = 0;
const EXPENSES_PAGE_SIZE = 25;

function renderExpenses() {
  const main = document.getElementById("main");

  main.innerHTML = `
    <div class="page-header">
      <h1>Expenses</h1>
      <button id="add-expense-btn" class="primary">+ Add Expense</button>
    </div>

    <div class="table-wrap">
      <table class="jobs-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody id="expenses-body"></tbody>
      </table>
    </div>

    <div class="pagination">
      <button id="prev-expenses">Prev</button>
      <span id="expenses-range"></span>
      <button id="next-expenses">Next</button>
    </div>
  `;

  document.getElementById("add-expense-btn").onclick = renderExpenseModal;

  document.getElementById("prev-expenses").onclick = () => {
    if (expensesPage > 0) {
      expensesPage--;
      loadExpenses();
    }
  };

  document.getElementById("next-expenses").onclick = () => {
    expensesPage++;
    loadExpenses();
  };

  expensesPage = 0;
  loadExpenses();
}

function renderSettings() {
    const main = document.getElementById("main");
  
    main.innerHTML = `
      <div class="card">
        <h2>Business Settings</h2>
  
        <label>Business Name</label>
        <input id="biz-name" value="${currentProfile?.business_name ?? ""}" />
  
        <label>Your Name</label>
        <input id="owner-name" value="${currentProfile?.owner_name ?? ""}" />
  
        <label>Timezone</label>
        <select id="biz-timezone">
          ${[
            "America/New_York",
            "America/Chicago",
            "America/Denver",
            "America/Los_Angeles",
            "America/Phoenix",
            "America/Anchorage",
            "Pacific/Honolulu"
          ].map(tz => `
            <option value="${tz}" ${currentProfile?.timezone === tz ? "selected" : ""}>
              ${tz.replace("America/", "").replace("_", " ")}
            </option>
          `).join("")}
        </select>
  
        <label>Default Job Length (minutes)</label>
        <input id="biz-duration" type="number" value="${currentProfile?.default_job_minutes ?? 120}" />
  
        <div style="margin-top:16px;">
          <button id="save-settings" class="primary">Save</button>
        </div>
      </div>
    `;
  
    document.getElementById("save-settings").onclick = saveSettings;
  }
  

  
  async function saveSettings() {
    const payload = {
      business_name: document.getElementById("biz-name").value,
      owner_name: document.getElementById("owner-name").value,
      timezone: document.getElementById("biz-timezone").value,
      default_job_minutes: Number(document.getElementById("biz-duration").value)
    };
  
    const { error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("user_id", currentUser.id);
  
    if (error) {
      console.error(error);
      return;
    }
  
    await loadProfile();
    renderLoggedIn(currentUser);
  }
  
  




// ------------ Auth Functions ------------------------
async function signUp() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      document.getElementById("error").textContent = error.message;
      return;
    }
  
    if (data.user) {
      await supabase.from("profiles").insert({
        user_id: data.user.id,
        business_name: "My Business"
      });
    }
  }
  
async function signIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error){
        document.getElementById("error").textContent = error.message;
    }

}
async function signOut() {
    await supabase.auth.signOut();
}
// App bootsrap
async function bootstrap() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    if (session && session.user) {
      currentUser = session.user;
      await loadProfile();
      renderLoggedIn(session.user);
    } else {
      currentUser = null;
      currentProfile = null;
      renderLoggedOut();
    }
  
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session && session.user) {
        currentUser = session.user;
        await loadProfile();
        renderLoggedIn(session.user);
      } else {
        currentUser = null;
        currentProfile = null;
        renderLoggedOut();
      }
    });
  }
  
  bootstrap();
  
