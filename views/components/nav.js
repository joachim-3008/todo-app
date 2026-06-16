const navbar = document.querySelector('#navbar');

const createNavHome = () => {
    navbar.innerHTML = `<div class="max-w-7xl bg-gray-950 h-16 mx-auto flex items-center px-4 justify-between">
         <a href="/" class="font-bold text-xl text-orange-400">TodoApp</a>

                            <!-- version mobile -->
                            <svg id="menuMobile" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 rounded-lg">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <div class="bg-slate-800 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
                                <a href="/login" class="transition ease-in-out text-white font-bold bg-red-800 hover:bg-red-900 py-2 px-4 rounded-lg">Log In</a>
                                <a href="/signup" class="transition ease-in-out text-white font-bold bg-lime-700 hover:bg-lime-800 py-2 px-4 rounded-lg">Sign Up</a>
                            </div>
                                
                            <!-- version de escritorio -->
                            <div id="navBtn" class="hidden md:flex flex-row gap-4">
                                <a href="/login/" class="transition ease-in-out text-white font-bold bg-red-800 hover:bg-red-900 py-2 px-4 rounded-lg">Log In</a>
                                <a href="/signup/" class="transition ease-in-out text-white font-bold bg-lime-700 hover:bg-lime-800 py-2 px-4 rounded-lg">Sign Up</a>
                            </div>
                        </div>`;
};

const createNavSignup = () => {
       navbar.innerHTML = `<div class="max-w-7xl bg-gray-950  h-16 mx-auto flex items-center px-4 justify-between">
         <a href="/" class="font-bold text-xl text-orange-400">TodoApp</a>
                            <!-- version mobile -->
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 rounded-lg">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <div class="bg-gray-950 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
                                <a href="/login" class="transition ease-in-out text-white font-bold bg-lime-700 hover:bg-lime-800 py-2 px-4 rounded-lg">Log In</a>
                            </div>
                                
                            <!-- version de escritorio -->
                            <div class="hidden md:flex flex-row gap-4">
                                <a href="/login/" class="transition ease-in-out text-white font-bold bg-lime-700 hover:bg-lime-800 py-2 px-4 rounded-lg">Log In</a>
                            </div>
                        </div>`;
};

const createNavLogin = () => {
       navbar.innerHTML = `<div class="max-w-7xl bg-gray-950  h-16 mx-auto flex items-center px-4 justify-between">
         <a href="/" class="font-bold text-xl text-orange-400">TodoApp</a>

                            <!-- version mobile -->
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 rounded-lg">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <div class="bg-gray-950 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
                                <a href="/signup" class="transition ease-in-out text-white font-bold  bg-lime-700 hover:bg-lime-800 py-2 px-4 rounded-lg">Sign Up</a>
                            </div>
                                
                            <!-- version de escritorio -->
                            <div class="hidden md:flex flex-row gap-4">
                                <a href="/signup/" class="transition ease-in-out text-white font-bold  bg-lime-700 hover:bg-lime-800 py-2 px-4 rounded-lg">Sign Up</a>
                            </div>
                        </div>`;
};

const createNavTodos = () => {
        navbar.innerHTML = `<div class="max-w-7xl bg-gray-950 h-16 mx-auto flex items-center px-4 justify-between">
         <a href="/" class="font-bold text-xl text-orange-400">TodoApp</a>
                            <!-- version mobile -->
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 rounded-lg">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <div class="bg-gray-950 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 hidden">
                                <button id="close-btn" class="transition ease-in-out text-white font-bold bg-indigo-500 hover:bg-blue-600 py-2 px-4 rounded-lg">Close Session</button>
                            </div>
                                
                            <!-- version de escritorio -->
                            <div class="hidden md:flex flex-row gap-4">
                                <button id="close-btn" class="transition ease-in-out text-white font-bold bg-indigo-500 hover:bg-blue-600 py-2 px-4 rounded-lg">Close Session</button>
                            </div>
                        </div>`;
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
