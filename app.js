import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

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
          <div id='expenses' class='sidebar-link  px-3 py-2 rounded mb-1 fs-6''><span class='bi bi-receipt'></span>Expenses</div>
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
    renderExpenses();
    document.getElementById('overview').onclick = renderOverview;
    document.getElementById('jobs').onclick = renderJobs;
    document.getElementById('expenses').onclick = renderExpenses;
}

// ------ Section Renders -------
async function renderOverview() {



}
async function renderJobs() {
  const main = document.getElementById('main')
  main.innerHTML = `
  <h5>Jobs go here</h5>
  <table class='table'>
    <th><tr>
      <td>Name</td>
      <td>address</td>
      <td>services</td>
      <td>Phone</td>
      <td>date</td>
      <td>time</td>
      <td>status</td>
    </tr></th>
    <tbody id='jobs-tbody'>

    </tbody>
  </table>
  <button class='btn btn-primary' 
        data-bs-toggle='modal' 
        data-bs-target='#modal' 
        id='show-job-modal-btn'>
  + Add Job
</button>
  `
  document.getElementById('show-job-modal-btn').onclick = addJobModal;
  loadJobs();
}
async function renderExpenses() {
  const main = document.getElementById('main');
  main.innerHTML = `
  <h5>Expenses go here</h5>
  <table class='table'>
    <th><tr>
      <td>Category</td>
      <td>Amount</td>
      <td>Date</td>
    </tr></th>
    <tbody id='expenses-tbody'>
    
    </tbody>
  </table>
  <button class='btn btn-primary' 
        data-bs-toggle='modal' 
        data-bs-target='#modal' 
        id='show-expense-modal-btn'>
  + Add Expense
</button>
  `;
  loadExpenses();
  document.getElementById('show-expense-modal-btn').onclick = addExpenseModal;
}
// ------ Render Helpers ------
async function loadJobs() {
  const tbody = document.getElementById('jobs-tbody');
  const td = document.createElement('td');
  const {data, error} = await supabase
  .from('jobs')
  .select("client_name, phone, date, services, address, start_time, status")
  .order('date', {ascending: false});
  console.log(data)
  
  // table insert
  data.forEach(job => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${job.client_name}</td>
    <td>${job.address}</td>
    <td>${job.services}</td>
    <td>${job.phone}</td>
    <td>${job.date}</td>
    <td>${job.start_time}</td>
    <td>${job.status}</td>
    <button>✅</button>
    <button>❌</button>
    `;
    tbody.appendChild(tr)
  })
  



  if(error) {
    console.log(error);
  }
}
async function loadExpenses() {
  const tbody = document.getElementById('expenses-tbody');
  const {data, error} = await supabase
  .from('expenses')
  .select('date, category, amount, description')
  .order('date', {ascending: false});

  data.forEach(expense => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${expense.category}</td>
    <td>${expense.amount}</td>
    <td>${expense.date}</td>
    <button>❌</button>
    `
    tbody.appendChild(tr);
  })

  if(error) {
    console.log(error)
  }
}
async function addJob() {
  const client_name = document.getElementById('client-name').value;
  const address = document.getElementById('address').value;
  const price = document.getElementById('price').value;
  const services = document.getElementById('services').value;
  const start = document.getElementById('start-time').value;
  const date = document.getElementById('job-date').value;
  const status = document.getElementById('job-status').value;
  const phone = document.getElementById('phone').value;
  const notes = document.getElementById('notes').value;

  if(!client_name || !address || !price || !services || !start || !date || !status || !phone){
    alert('Please fill in all required fields');
    return;
  }
  const {error} = await supabase
  .from('jobs')
  .insert({
    client_name: client_name,
    address: address,
    price: Number(price),
    services: services,
    start_time: start,
    status: status,
    date: date,
    user_id: currentUser.id,
    phone: phone,
    notes: notes
  });
  if(error){
    console.error(error)
  }
  // close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('modal'));
  modal.hide();
  // reload
  loadJobs();
}
async function addExpense() {
  const category = document.getElementById('category').value;
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const date = document.getElementById('expense-date').value;


  // validation
  if(!category || !amount || !description){
    alert('please fill in all required fields.');
    return;
  }

  const {error} = await supabase
  .from('expenses')
  .insert({
    category: category,
    amount: amount,
    description: description,
    user_id: currentUser.id,
    date: date
  });
  if(error){
    console.log(error);
  }
  // close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('modal'));
  modal.hide();
  // reload
  loadExpenses();
}
// ------ Modal Functions -----
async function addJobModal() {
  const modal_content = document.getElementById('modal-content');
  modal_content.innerHTML = `
  <div class='modal-header'>
    <h5 class='modal-title'>Add Job</h5>
  </div>
  <div id='job-form'>
    <div id='name-wrapper'>
      <label class='form-control'>Client Name</div>
      <input id='client-name' type='text' placeholder='John Doe' />
    </div>
    <div id='address-wrapper'>
      <label class='form-control'>Address</label>
      <input id='address' type='text' />
    </div>
    <div id='phone-wrapper'>
      <label class='form-control'>Phone number</label>
      <input id='phone' type='text' placeholder='8281234567' />
    </div>
    <div id='price-wrapper'>
      <label class='form-control'>Price</label>
      <input id='price' type='number' placeholder='$100' />
    </div>
    <div id='services-wrapper'>
      <label class='form-control'>Services</label>
      <input id='services' type='text' placeholder='interior detail' />
    </div>
    <div id='start-wrapper'>
    <label class='form-control'>Start Time</label>
    <input id='start-time' type='time' placeholder='11:00:AM' />
    </div>
    <div id='date-wrapper'>
      <label class='form-control'>Date</label>
      <input id='job-date' type='date' />
    </div>
    <div id='status-wrapper'>
      <label class='form-control'>status</label>
      <input id='job-status' type='text' placeholder='incomplete' />
    </div>
    <div id='notes-wrapper'>
      <label class='form-control'>Notes (optional)</label>
      <textarea id='notes' placeholder='give a description'></textarea>
    </div>
  </div>
  <button class='btn btn-primary' id='add-job-btn'>Submit</button>
  
  `;
  document.getElementById('add-job-btn').onclick = addJob;
}
async function addExpenseModal() {
  const modal_content = document.getElementById('modal-content');
  modal_content.innerHTML = `
  <div id='expense-modal-header'>
    <h5>Add Expense</h5>
    <button class='btn btn-danger'>X</button>
  </div>
  <div id='expense-date-wrapper'>
    <label class='form-control'>Date</labe>
    <input id='expense-date' type='date' />
  </div>
  <div id='category-wrapper'>
    <label class='form-control'>Category</label>
    <input id='category' type='text' placeholder='equipment' />
  </div>
  <div id='amount-wrapper'>
    <label class='form-control'>Amount</label>
    <input id='amount' type='number' placeholder='40' />
  </div>
  <div id='description-wrapper'>
    <label class='form-control'>Description<label>
    <textarea id='description' placeholder='Give a brief description'></textarea>
  </div>
  <button id='add-expense-btn' class='btn btn-primary'>Submit</button>
  `
  document.getElementById('add-expense-btn').onclick = addExpense;
}


// Data Fetch


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
