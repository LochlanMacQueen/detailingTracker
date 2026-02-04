import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const SUPABASE_URL = "https://xhwndgksrcfwdnveuudm.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhod25kZ2tzcmNmd2RudmV1dWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MDA3NjgsImV4cCI6MjA4NDI3Njc2OH0.U_xhdc4j8jQQK2D9L0qB45IrofBTBbnpTpA7AJjaxdw";

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const app = document.getElementById("app");

let currentUser = null;

// UI Renders
async function renderLoading() {
  app.innerHTML = `
    <p>Loading...</p>
    `;
}
async function renderLoggedOut() {
  app.innerHTML = `
    <div class='d-flex justify-content-center align-items-center' style="min-height: 100vh;">
    <div class='card shadow-lg' style="width: 400px;">
    <div class='card-body p-4' id='login-body'>
    <div class='text-center mb-4' id='login-wrapper'>
    <h2 class='card-title fw-bold'>Login</h2>
    <p class='text-muted'>Manage your business operations in one place</p>
    </div>
    <div classa='mb-3' id='email-wrapper'>
    <label class='form-label'>Email</label>
    <input class='form-control' id="email" type="email" placeholder="your@email.com" />
    </div>
    <div class='mb-3' id='password-wrapper'>
    <label class='form-label'>Password</label>
    <input class='form-control' id="password" type="password" placeholder="Enter password" />
    </div>
    <div class='' id='login-button-wrapper'>
    <button class='btn btn-primary w-100 mb-3' id="login">Log In</button>
    </div>
    <p class='text-center small ' id='show-sign-up'>No Account? Create one here.</p>
    <p id="error" style="color:red;"></p>
    </div>
    </div>
    </div>
    
    `;
  document.getElementById("show-sign-up").onclick = showSignUp;
  async function showSignUp() {
    const login_wrapper = document.getElementById("login-body");
    login_wrapper.innerHTML = `
        <div class='text-center mb-4'>
            <h2 class='card-title fw-bold'>Create Account</h2>
            <p class='text-muted'></p>
        </div>
        <div class='mb-3' id='email-wrapper'>
            <label class='form-label'>Email</label>
            <input class='form-control' id="email" type="email" placeholder="your@email.com" />
        </div>

        <div class='mb-3' id='password-wrapper'>
            <label class='form-label'>Password</label>
            <div class='input-group'>
                <input class='form-control' id="password" type="password" placeholder="Enter password" />
                <span class='input-group-text'>
                    <i class='bi bi-eye' id='toggle-password''></i>
                </span>
            </div>
        </div>

        <div class='' id='login-button-wrapper'>
            <button class='btn btn-primary w-100 mb-3' id="signup">Create Account</button>
        </div>
        <p id="error" style="color:red;"></p>
        `;
    document
      .getElementById("toggle-password")
      .addEventListener("click", showToggle);
  }
  // would be cool to use only one button for login, detect if account and if ! then create, ask to verify

  // document.getElementById('').onclick = signUp;
  document.getElementById("login").onclick = signIn;
}
async function showToggle() {
  const toggle_btn = document.getElementById("toggle-password");
  const password_input = document.getElementById("password");
  if (password_input.type == "password") {
    password_input.type = "text";
    toggle_btn.classList = "bi bi-eye-slash";
  } else {
    password_input.type = "password";
    toggle_btn.classList = "bi bi-eye";
  }

}

async function renderLoggedIn(user) {
  app.innerHTML = `

    <div class='row'>
    <aside id='sidebar' class="d-flex flex-column justify-content-between position-sticky top-0 col-2 sidebar border-end vh-100">
    <div>
    <div class='py-3'>
    <div class='sidebar-border border-bottom'>
    <h5 class='sidebar-brand fw-bold mb-2'>Biltmore Forest Detailing</h5>
    </div>
    <nav class='pt-4 sidebar-menu'>
    <div id='overview' class='sidebar-link  px-3 py-2 rounded mb-1 fs-6'><span class='bi bi-grid'></span>Overview</div>
    <div id='jobs' class='sidebar-link  px-3 py-2 rounded mb-1 fs-6'><span class='bi bi-list-check'></span>Jobs</div>
    <div id='calendar' class='sidebar-link  px-3 py-2 rounded mb-1 fs-6''><span class='bi bi-calendar-event'></span>Calendar</div>
    <div id='expenses' class='sidebar-link  px-3 py-2 rounded mb-1 fs-6''><span class='bi bi-receipt'></span>Expenses</div>
    <div id='settings' class='sidebar-link  px-3 py-2 rounded mb-1 fs-6''><span class='bi bi-gear'></span>Settings</div>
    </nav>
    </div>
    </div>
    
    <div class=' d-flex align-items-center border-top border-secondary'>
    <div class=' d-flex align-items-center justify-content-center rounded-circle bg-primary' style='width: 36px; height: 36px;'>
    <span class=' fw-bold'>LM</span>
    </div>
    <p class='mt-auto mb-auto fw-medium small fs-6'>Lochlan MacQueen</p>
    </div>
    </aside>
    <main id='main' class='main-content col p-4'>


    </main>
    </div>
    `;
  renderOverview();
  document.getElementById("overview").onclick = renderOverview;
  document.getElementById("jobs").onclick = renderJobs;
  document.getElementById("calendar").onclick = renderCalendar;
  document.getElementById("expenses").onclick = renderExpenses;
  document.getElementById("settings").onclick = renderSettings;
}
//main is where InnerHTML is changed around
// ------------- RENDER NAV SECTIONS --------------
async function renderOverview() {

  const revenue = await getRevenue();
  const profit = await getProfit();
  const jobs = await getJobKPI();

  const main = document.getElementById("main");
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
  })
  document.getElementById("overview").classList.add("active");
  // Quick Actions card
  // Mini charts in some places
  // maybe a goal creation feature would fit
  // Feature could have a set goal for revenue, and a progress bar for reaching it.
  main.innerHTML = `
    <div id='overview-top-card' class=' card d-flex flex-row mb-2 justify-content-between'>

    <div class ='py-3 mx-1 flex-fill'>
    <div class='stat-card card shadow-sm rounded p-3 d-flex justify-content-center align-items-center flex-column'>
    <h2 class='fw-bold mb-1'>$${revenue}</h2>
    <p class='text-muted text-uppercase small mb-0'>All time revenue</p>
    </div>
    </div>

    <div class ='py-3 mx-1 flex-fill'>
    <div class='stat-card card shadow-sm rounded p-3 d-flex justify-content-center align-items-center flex-column'>
    <h2 class='fw-bold'>$${profit}</h2>
    <p class='text-muted text-muted text-uppercase small mb-0'>All time profit</p>
    </div>
    </div>

    <div class = 'py-3 mx-1 flex-fill'>
    <div class='stat-card card shadow-sm rounded p-3 d-flex justify-content-center align-items-center flex-column'>
    <h2 class='fw-bold'>${jobs}</h2>
    <p class='text-muted text-muted text-uppercase small mb-0'>All time jobs</p>
    </div>
    </div>

    </div>
    <div id='overview-middle-card' class='row card shadow-sm border-0 mb-2'>
      <div class='card-body p-4 col-8'>
        <h4 class='card-title fw-bold'>Upcoming Job</h4>
        <div id='card-holder' class='d-flex justify-content-evenly'>
        </div>
        </div>
          <div id='sm-chart-holder' class='card col-4' style='width: 250px;'>
            <canvas id='small-chart'></div>
          </div>
    </div>

    <div id='overview-bottom-card' class='chart-card shadow-sm border-0 mb-2'>
      <div class='chart-header'>
        <h3 class='chart-title'>Revenue Chart</h3>
        <p class='chart-subtitle'>Monthly Trends</p>
      </div>
      <canvas id='big-chart'>
      
      </canvas>
      </div>
    </div>
`;

  const smCtx = document.getElementById('small-chart').getContext('2d');
  const mid_chart = new Chart(smCtx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [12,4,5],
        backgroundColor: [],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      radius: 100,
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              family: 'DM Sans',
              size: 11,
            },
            padding: 10,
            boxWidth: 12
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + ' jobs';
            }
          }
        }
      }
    }

  })

  const ctx = document.getElementById('big-chart').getContext('2d');
  const bot_chart  = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['week 1', 'week 2', 'week 3', 'week 4'],
      datasets: [{
        label: 'Weekly Revenue',
        data: [2900,2200,2700,2400],
        backgroundColor: 'rgba(84,159,242,0.2)',
        borderColor: '#5e9ff2',
        borderWidth: 2,
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 3,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#fff',
          titleColor: "#000",
          bodyColor: '#666',
          borderColor: '#ddd',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              return '$' + context.parsed.y;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12
            },
            color: '#8b96a5'
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#f5f7f9'
          },
          color: '#8b96a5'
        }
      }
    },
  })
  await upcomingJob();
}
// KPI Functions
async function getRevenue() {
  let sum = 0;
  const { data, error } = await supabase
  .from('jobs')
  .select('price')
  .eq('status', 'complete')
  data.forEach(job => {
    sum += job.price;
  })
  return sum;
}
async function getProfit() {
  const rev = await getRevenue();
  let sum = 0;
  const { data, error } = await supabase
  .from('expenses')
  .select('amount')

  data.forEach(expense => {
    sum += expense.amount;
  })

  return rev - sum;

}
async function getJobKPI() {
  const { data, error} = await supabase
  .from('jobs')
  .select('id')

  return data.length;
}
// Upcoming job function(s)
async function upcomingJob() {
  const today = new Date().toISOString().slice(0, 10);
  console.log(today);
  const { data, error } = await supabase
  .from('jobs')
  .select('client_name, date, address, price, start_time, services')
  .gte('date', today)
  .order('date', { ascending: true })
  .limit(2)

  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
  
  const card_holder = document.getElementById('card-holder');
  
  data.forEach(job => {
    const dateObj = new Date(job.date);
    const formatted = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    const timeSplit = job.start_time.split(':');
    let hour = parseInt(timeSplit[0]);
    let minutes = timeSplit[1];
    let period = 'am';
    if(hour >= 12){
      period = 'pm';
      hour = hour - 12;
    } else if(hour === 0){
      hour = 12;
    }
    let timeStr;
    if (minutes === "00") {
      timeStr = hour + period;
    } else {
      timeStr = hour + ":" + minutes + period;
    }
    

    const div = document.createElement('div');
    div.classList = 'card bg-light d-flex align-items-start flex-column rounded p-3 shadow-sm mb-3 mx-2'
    div.style.width = '100%';
    div.innerHTML = `
      
      <h5 class='fw-bold'><span class='bi bi-person-fill mx-1'></span>${job.client_name}</h5>
      <h6><span class=' fs-5 bi bi-calendar-event-fill mx-1'></span>${formatted} • ${timeStr}</h6>
      <h6><span class='bi bi-list-task mx-1 fs-5'></span>${job.services} • $${job.price}</h6>
      <h7 class='text-muted'><span class='bi bi-pin-map-fill mx-1 fs-5'></span>${job.address}</h7>

    `
    card_holder.appendChild(div);
  });


}

// jobs data ref for render jobs table


async function renderJobs() {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      "client_name, services, date, phone, address, notes, start_time, status"
    )
    .range(0, 24);
  const main = document.getElementById("main");
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
  })
  document.getElementById("jobs").classList.add("active");
  // I need to put the column titles from database into the header row. Then I need to make it display rows that it has, up to 25 of them.
  // I need to make arrow buttons to go between pages. Need delete button and complete button.
  // Add pagnation when needed

  loadJobs();
  main.innerHTML = `
    <header>
      <h2 class=''>Jobs</h2>
    </header>
    <div id='jobs-table-card'>
      <table class='table table-hover table-responsive-sm'>
        <tr class=''>
          <th class=''>Client Name</th>
          <th>Service</th>
          <th>Date</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Notes</th>
          <th>Time</th>
          <th>Status</th>
          <th>func</th>
        </tr>
        <tbody id="jobs-tbody"></tbody>
      </table>
    </div>
    <button id='add-job-btn' data-bs-toggle='modal' data-bs-target='#modal' class='btn btn-primary'>Add Job</button>
    `;

  document
    .getElementById("add-job-btn")
    .addEventListener("click", populateJobModal);
  // Row creation
}
//Job Modal Functions

async function closeModal() {
  const modal = bootstrap.Modal.getInstance(document.getElementById("modal"));
  modal.hide();
}

async function populateJobModal() {
  // inside modal need inputs to get all of job info. then need to call addjob function onclick of save button.
  const modal_content = document.getElementById("modal-content");
  modal_content.innerHTML = `
    <div class='d-flex justify-content-between mt-2' id='modal-header'>
        <div>
            <h5 class='title fw-bold mb-1'>Add New Job</h5>
            <p class='text-muted small mb-0'>Fill in job details below</p>
        </div>
        <button class='btn btn-close' id='close-modal-btn'></button>
    </div>
    <div id='header-seperation' class='border'></div>
    <div class='modal-body p-4'>
        <div class='mb-3' id='client_info'>
            <label class='form-label'>Client Name</label>
            <input type='text' class='form-control' id='name' placeholder='Enter Client Name'></input>
        </div>
        <div class='mb-3'>
        <label class='form-label'>Phone</label>
        <input type='tel' class='form-control' id='phone' placeholder='(828) 123-4567' />
        </div>
        <div class='mb-3'>
            <label class='form-label'>Address</label>
            <input type='text' class='form-control' id='address' placeholder='123 Main St. Asheville' />
        </div>
        <div class='mb-3'>
            <label class='form-label'>Price</label>
            <input type='num' class='form-control' id='price' placeholder='$123' />
        </div>
        <div class='mb-3'>
            <label class='form-label'>Date</label>
            <input type='date' class='form-control' id='date' placeholder='--/--/----' />
        </div>
        <div class='mb-3'>
            <label class='form-label'>Services</services>
            <input id='services' type='text' class='form-control' placeholder='Enter Service(s)' />
        </div>
        <div class='mb-3'>
            <label class='form-label'>Start & End Time</label>
            <div class='d-flex align-items-center gap-3'>
                <input type='time' id='start-time' class='form-control' style='flex: 1;'>
                <span class='text-muted'>to</span>
                <input type='time' id='end-time' class='form-control' style='flex: 1;'>
            </div>
        </div>
        <div class='mb-3'>
            <label class='form-label'>Notes</label>
            <textarea class='form-control' rows='3' placeholder='Add any additional notes or special instructions...' id='notes'></textarea>
        </div>
        <div id='button-wrapper' class='d-flex justify-content-between'>
        <button class='btn btn-cancel' id='hideJobModal'>Cancel</button>
          <button class='btn btn-primary' id='addJob'>Save</button>
        </div>
    </div>
    `;
  document.getElementById("addJob").onclick = addJob;
}

// Function needs repairs v
async function addJob() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const price = Number(document.getElementById("price").value);
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const services = document.getElementById("services").value;
  const start = document.getElementById("start-time").value;
  const end = document.getElementById("end-time").value;
  const notes = document.getElementById("notes").value;
  const { error } = await supabase.from("jobs").insert({
    client_name: name,
    address: address,
    price: price,
    phone: phone,
    user_id: currentUser.id,
    services: services,
    start_time: start,
    end_time: end,
    notes: notes,
    date: date,
    status: "incomplete",
  });

  if (error) {
    console.error(error);
    return;
  }
  loadJobs();
}
// ----------------- Load Job Function -------------------
async function loadJobs() {
  const { data, error } = await supabase.from("jobs").select();

  const tbody = document.getElementById("jobs-tbody");

  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${row.client_name}</td>
        <td>${row.services}</td>
        <td>${row.date}</td>
        <td>${row.phone}</td>
        <td>${row.address}</td>
        <td>${row.notes}</td>
        <td>${row.start_time}</td>
        <td>${row.status}</td>
        <td>
        <button class='btn'>✖</button>
        <button class='btn'>✓</button>
        </td>
        `;
    tbody.appendChild(tr);
  });
}
async function renderCalendar() {
  const main = document.getElementById("main");
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
  })
  document.getElementById("calendar").classList.add("active");

  main.innerHTML = `
    <h2>Calendar</h2>
    <div id='timeframe-toggle'>
    <button>Week</button>
    <button>Month</button>
    </div>
    <p>Insert Calendar Here</p>
    <div id='timespan-select'>
    <button>Previous</button>
    <button>Next</button>
    </div>
    `;
}
// Data Fetch
async function renderExpenses() {
  const main = document.getElementById("main");
  main.innerHTML = `
    <h1 class=''>Expenses</h1>
    <div id='expenses-table-wrapper'>
        <table class='table table-hover'>
            <tr>
            <th class=''>Date</th>
            <th class=''>Type</th>
            <th class=''>Amount</th>
            <th class=''>Description</th>
            </tr>
            <tbody id='expenses-tbody'>
    
            </tbody>
        </table>
    </div>
    <button class='btn btn-primary rounded' data-bs-toggle='modal' data-bs-target='#modal' id='add-expense-btn'>Add Expense</button>
    `;
  loadExpenses();
  document
    .getElementById("add-expense-btn")
    .addEventListener("click", populateExpenseModal);

  // Add expense summary for each month
}

async function populateExpenseModal() {
  const modal_content = document.getElementById("modal-content");
  modal_content.innerHTML = `
        <div id='expense-header' class='mb-4'>
            <h5 class='title fw-bold'>Add Expense</h5>
            <button class='btn btn-close' id='close-expense-modal-btn'></button>
        </div>
        <div class='border' id='head-seperation'></div>
        <div class='modal-body p-4'>
            <div class='mb-3'>
                <label class='form-label'>Date</label>
                <input type='date' class='form-control' id='exp-date' placeholder=''></input>
            </div>
            <div class='mb-3'>
                <label class='form-label'>Category</label>
                <input type='' class='form-control' id='exp-category' placeholder=''></input>
            </div>
            <div class='mb-3'>
                <label class='form-label'>Amount</label>
                <input type='' class='form-control' id='exp-amount' placeholder=''></input>
            </div>
            <div class='mb-3'>
                <label class='form-label'>Description</label>
                <textarea id='exp-description' class='form-control' rows='3' placeholder='Add a description for the expense'></textarea>
            </div>
            <button class='btn btn-primary' id='saveExpense'>Save</button>
        </div>
    
    `;
  document.getElementById("saveExpense").onclick = addExpense;
  loadExpenses();
}

// ----------------- Add Expense Function  -------------------
async function addExpense() {
  const date = document.getElementById("exp-date").value;
  const category = document.getElementById("exp-category").value;
  const amount = document.getElementById("exp-amount").value;
  const description = document.getElementById("exp-description").value;

  // Get data and insert constants
  const { error } = await supabase.from("expenses").insert({
    date: date,
    category: category,
    amount: amount,
    description: description,
  });

  if (error) {
    console.error(error);
    return;
  }
  loadExpenses();
}
// ----------------- Load Expense Function -------------------
async function loadExpenses() {
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
  })
  document.getElementById("expenses").classList.add("active");
  const { data, error } = await supabase
    .from("expenses")
    .select("date, category, amount, description")
    .range(0, 24);

  const tbody = document.getElementById("expenses-tbody");
  const tr = document.createElement("tr");
  tbody.innerHTML = "";
  data.forEach((row) => {
    tr.innerHTML = `
        <td>${row.category}</td>
        <td>${row.amount}</td>
        <td>${row.description}</td>
        <td>${row.date}</td>
        <td>
        <button class=''>❌</button>
        </td>
            `;
    tbody.appendChild(tr);
  });
}

async function renderSettings() {
  const main = document.getElementById("main");
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
  })
  document.getElementById("settings").classList.add("active");

  main.innerHTML = `
        <section class=''>
            <h2>Business Name</h2>
            <input class=''></input>
        </section>
    `;
}

// ------------ Auth Functions ------------------------
async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    document.getElementById("error").textContent = error.message;
  }
}
async function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    document.getElementById("error").textContent = error.message;
  }
}
async function signOut() {
  await supabase.auth.signOut();
}
// App bootsrap
const {
  data: { session },
} = await supabase.auth.getSession();

if (session && session.user) {
  currentUser = session.user;
} else {
  currentUser = null;
  renderLoggedOut();
}
supabase.auth.onAuthStateChange((_event, session) => {
  if (session && session.user) {
    currentUser = session.user;
    renderLoggedIn(session.user);
  } else {
    currentUser = null;
    renderLoggedOut();
  }
});
