import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL ="https://xhwndgksrcfwdnveuudm.supabase.co"
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhod25kZ2tzcmNmd2RudmV1dWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MDA3NjgsImV4cCI6MjA4NDI3Njc2OH0.U_xhdc4j8jQQK2D9L0qB45IrofBTBbnpTpA7AJjaxdw"

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const app = document.getElementById("app");

let currentUser = null;

// UI Renders
async function renderLoading() {
    app.innerHTML = `
    <p>Loading...</p>
    `
}
async function renderLoggedOut() {
    app.innerHTML = `
    <div class='is-flex is-justify-content-center is-align-items-center is-full-height'>
    <div class='box' style='width: 360px;'>
    <div id='top-text'>
    <h2 class='is-size-4 has-text-light has-text-weight-bold'>Login</h2>
    <p class='is-size-6 has-text-light'>Manage your business operations in one place</p>
    </div>
    <div class='pt-2' id='email-wrapper'>
    <input class='input is-normal'id="email" type="email" placeholder="Email" />
    </div>
    <div class='py-2' id='password-wrapper'>
    <input class='input is-normal' id="password" type="password" placeholder="Password" />
    </div>
    <div class='pb-2' id='login-button-wrapper'>
    <button class='button is-primary is-full-width' id="login">Log In</button>
    </div>
    <p class='is-size-7 has-text-white' id='signup'>No Account? Create one here.</p>
    <p id="error" style="color:red;"></p>
    </div>
    </div>
    
    `;
    // would be cool to use only one button for login, detect if account and if ! then create, ask to verify

    document.getElementById('signup').onclick = signUp;
    document.getElementById('login').onclick = signIn;
}
async function renderLoggedIn(user) {
    app.innerHTML = `

    <div class='columns is-gapless is-fullheight'>
    <aside id='sidebar' class="column is-2 has-background-dark is-full-height">
    <div class='menu p-4'>
    <div class='is-size-4 has-text-light has-text-weight-bold'>Biltmore Forest Detailing</div>

    <nav>
    <div id='overview' class='is-size-4 has-text-light has-text-weight-medium pt-3'>Overview</div>
    <div id='jobs' class='is-size-4 has-text-light has-text-weight-medium pt-3'>Jobs</div>
    <div id='calendar' class='is-size-4 has-text-light has-text-weight-medium pt-3'>Calendar</div>
    <div id='expenses' class='is-size-4 has-text-light has-text-weight-medium pt-3'>Expenses</div>
    <div id='settings' class='is-size-4 has-text-light has-text-weight-medium pt-3'>Settings</div>
    </nav>
    
    <div class='is-size-4 has-text-light has-text-weight-bold'>Lochlan MacQueen</div>
    </div>
    </aside>
    <main id='main' class='column'>


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
async function renderOverview () {
const main = document.getElementById('main')

main.innerHTML = `
    <div id='overview-top-card' class='container is-flex is-justify-content-space-evenly pt-5 pb-6'>

    <div class =''>
    <div class='card py-4 has-text-centered' style='width: 250px; height: 150px;'>
    <h2 class='is-size-3 has-text-light has-text-weight-bold'>$902</h2>
    <p>Revenue this month</p>
    </div>
    </div>

    <div class =''>
    <div class='card py-4 has-text-centered'style='width: 250px; height: 150px'>
    <h2 class='is-size-3 has-text-light has-text-weight-bold'>$404</h2>
    <p>Profit this month</p>
    </div>
    </div>

    <div class = ''>
    <div class='card py-4 has-text-centered' style='width: 250px; height: 150px;'>
    <h2 class='is-size-3 has-text-light has-text-weight-bold'>12</h2>
    <p>Jobs this week</p>
    </div>
    </div>

    </div>
    <div id='overview-middle-card' class='box' style='height: 250px;'>
    <h2>Next Job</h2>
    <p>Client Name, Date + Time, Address, Price, View Job, Mark Complete Button</p>
    </div>

    <div id='overview-bottom-card' class='box' style='height: 350px;'>
    <H2>Performance Graph</h2>
    <p>Month Graph analyzing profit week to week</p>
    </div>
`
}

// jobs data ref for render jobs table

// Data fetch
const { data, error } = await supabase
  .from('jobs')
  .select('client_name, services, date, phone, address, notes, start_time, status')
  .range(0,24)
  
  async function renderJobs () {
      const main = document.getElementById('main')
      // I need to put the column titles from database into the header row. Then I need to make it display rows that it has, up to 25 of them.
      // I need to make arrow buttons to go between pages. Need delete button and complete button.
      // Add pagnation when needed
      
  
    main.innerHTML = `
    <header>
    <h2 class='title'>Jobs</h2>
    </header>
    <div id='jobs-table-card'>
    <table class='table is-hoverable'>
    <tr class='tr'>
    <th class='th'>Client Name</th>
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
    <button id='add-job-btn' class='button is-primary'>Add Job</button>
    `
    document.getElementById('add-job-btn').onclick = getJobForm;
    // Row creation
    const tbody = document.getElementById('jobs-tbody');

    data.forEach(row => {
        const tr = document.createElement('tr');
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
        <button class='button'>✖</button>
        <button class='button'>✓</button>
        </td>
        `;
        tbody.appendChild(tr);
    });
}
//Job Modal Functions
async function closeModal () {
    document.getElementById('modal').classList.add('hidden');
}



function getJobForm() {
    const modal = document.getElementById('modal');
    const Content = document.getElementById('modal-content');
   


// MODAL CODE V
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

modal.classList.remove('hidden');
Content.innerHTML = `
<h2>Job Create</h2>
<br />
<p>Customer Name</p>
<input id='clientName' placeholder='John Doe'></input>
<br />
<p>Address</p>
<input id='clientAddress' placeholder='1 peach street'></input>
<br />
<p>Price</p>
<input id='price' placeholder='100'></input>
<br />
<p>Phone</p>
<input id='phone' placeholder='8283921404'></input>
<br />
<p>Date</p>
<input id='date' type='date' placeholder='11/08/2007'></input>
<br />
<p>Services</p>
<input id='services' placeholder='Enter Services'></input>
<br />
<p>Start Time</p>
<input id='start-time' type='time'></input>
<br />
<p>End Time</p>
<input id='end-time' type='time'></input>
<br />
<p>Notes</p>
<input id='notes' type='text' placeholder='Enter Notes'></input>
<br />
<button id='submit-job'>Save</button>
<button id="close-modal-btn">Close</button>
`
document.getElementById('submit-job').onclick = addJob; 
const close = document.getElementById('close-modal-btn');
close.onclick = closeModal;

}
async function addJob() {
        
        const name = document.getElementById('clientName').value;
        const address = document.getElementById('clientAddress').value;
        const price = Number(document.getElementById('price').value);
        const phone = document.getElementById('phone').value
        const date = document.getElementById('date').value;
        const services = document.getElementById('services').value;
        const start = document.getElementById('start-time').value;
        const end = document.getElementById('end-time').value;
        const notes = document.getElementById('notes').value;

        const { error } = await supabase
        .from('jobs')
        .insert({ 
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
    
    });

    if (error) {
        console.error(error);
        return;
    }
    loadJobs();
}
// ----------------- Load Job Function -------------------
async function loadJobs() {
    const { data, error } = await supabase
    .from('jobs')
    .select()

    const tBody = document.querySelector('#jobTable tbody');
    tBody.innerHTML = "";
    data.forEach(job => {
        const tr = document.createElement('tr');

        const nameTd = document.createElement('td');
        nameTd.textContent = job.client_name;

        const addressTd = document.createElement('td');
        addressTd.textContent = job.address;

        const priceTd = document.createElement('td');
        priceTd.textContent = job.price;

        const phoneTd = document.createElement('td');
        phoneTd.textContent = job.phone;

        tr.appendChild(nameTd);
        tr.appendChild(addressTd);
        tr.appendChild(priceTd);
        tr.appendChild(phoneTd);
        tBody.appendChild(tr);
    });
    
}
async function renderCalendar () {
    const main = document.getElementById('main')

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
    `
}
// Data Fetch
async function renderExpenses () {
      const { data, error } = await supabase
        .from('expenses')
        .select('date, category, amount, description')
        .range(0,24)
    const main = document.getElementById('main')
    main.innerHTML = `
    <h1 class='title'>Expenses</h1>
    <div id='expenses-table-wrapper'>
    <table class='table is-hoverable'>
    <tr>
    <th class='th'>Date</th>
    <th class='th'>Type</th>
    <th class='th'>Amount</th>
    <th class='th'>Description</th>
    </tr>
    <tbody id='expenses-tbody'>
    
    </tbody>
    </table>
    </div>

    `
    const tbody = document.getElementById('expenses-tbody');
    const tr = document.createElement('tr');
    data.forEach(row => {
        tr.innerHTML =  `
        <td>${row.category}</td>
        <td>${row.amount}</td>
        <td>${row.description}</td>
        <td>${row.date}</td>
        <td>
        <button class='button'>❌</button>
        </td>
        `
        tbody.appendChild(tr);
    });
    // Add expense summary for each month
}
// ----------------- Add Expense Function  -------------------
// ----------------- Load Expense Function -------------------

async function renderSettings () {
    const main = document.getElementById('main')

    main.innerHTML = `
        <section class='section is-flex'>
        <h2>Business Name</h2>
        <input class='input'></input>
        </section>
    `
}



// ------------ Auth Functions ------------------------
async function signUp() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error){
        document.getElementById("error").textContent = error.message;
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
const {
    data: {session},
} = await supabase.auth.getSession();

if (session && session.user) {
    currentUser = session.user;
    renderLoggedIn(session.user);
} else {
    currentUser = null;
    renderLoggedOut();
}
supabase.auth.onAuthStateChange((_event, session) => {
    if (session && session.user)  {
        currentUser = session.user;
        renderLoggedIn(session.user);
    } else {
        currentUser = null;
        renderLoggedOut();
    }
});
