const navbar = document.querySelector('#navbar');

const createNavHome = () => {

  const createNvLogin = () => {}
    navbar.innerHTML = `
    <div class="max-w-7xl bg-green-400  h-16 mx-auto flex items-center px-4 justify-between">
        <p class="font-bold text-xl text-white">TodoAppp</p>

        <!--version movil-->
        
        <svg xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        stroke-width="1.5" 
        stroke="currentColor" 
        id="navBtn"
        class="w-10 h-10 md:hidden cursor-pointer p-2 rounded-lg">
          <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" 
          />
        </svg>


        <!-- version de escritorio -->
         <div class="hidden md:flex flex-row gap-4">
          <a href="/signup/" class="transition ease-in-out text-white font-bold bg-green-400 hover:bg-green-500 py-2 px-4 rounded-lg">Sign Up</a>         </div>

        <!-- menu movil -->

          <div id="menuMobile" class="bg-slate-900 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden md:hidden">
          <a href="/signup/" class="transition ease-in-out text-white font-bold bg-green-400 hover:bg-green-500 py-2 px-4 rounded-lg">Sign Up</a>
          </div>
      </div>
    `;
};

if (window.location.pathname === '/') {
  createNavHome();
} else if (window.location.pathname === '/signup/'){
  createNavSignup();
} else if (window.location.pathname === '/login/'){
  createNavLogin();
}

  const navBtn = document.querySelector('#navBtn');
  const menuMobile = document.querySelector('#menuMobile');

  if (navBtn && menuMobile) {
    navBtn.addEventListener('click', e => {
      if (!navBtn.classList.contains('active')) {
        navBtn.classList.add('active');
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />';
        menuMobile.classList.remove('hidden');
        menuMobile.classList.add('flex');
      } else {
        navBtn.classList.remove('active');
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />';
        menuMobile.classList.add('hidden');
        menuMobile.classList.remove('flex');
      }
    });
  }



