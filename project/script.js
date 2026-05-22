 

    document.querySelectorAll('.truck-button').forEach(button => {
      button.addEventListener('click', e => {

        e.preventDefault();

        let box = button.querySelector('.box'),
          truck = button.querySelector('.truck');

        if (!button.classList.contains('done')) {

          if (!button.classList.contains('animation')) {

            button.classList.add('animation');

            gsap.to(button, {
              '--box-s': 1,
              '--box-o': 1,
              duration: .3,
              delay: .5
            });

            gsap.to(box, {
              x: 0,
              duration: .4,
              delay: .7
            });

            gsap.to(button, {
              '--hx': -5,
              '--bx': 50,
              duration: .18,
              delay: .92
            });

            gsap.to(box, {
              y: 0,
              duration: .1,
              delay: 1.15
            });

            gsap.set(button, {
              '--truck-y': 0,
              '--truck-y-n': -26
            });

            gsap.to(button, {
              '--truck-y': 1,
              '--truck-y-n': -25,
              duration: .2,
              delay: 1.25,
              onComplete() {
                gsap.timeline({
                  onComplete() {
                    button.classList.add('done');
                  }
                }).to(truck, {
                  x: 0,
                  duration: .4
                }).to(truck, {
                  x: 40,
                  duration: 1
                }).to(truck, {
                  x: 20,
                  duration: .6
                }).to(truck, {
                  x: 96,
                  duration: .4
                });
                gsap.to(button, {
                  '--progress': 1,
                  duration: 2.4,
                  ease: "power2.in"
                });
              }
            });

          }

        } else {
          button.classList.remove('animation', 'done');
          gsap.set(truck, {
            x: 4
          });
          gsap.set(button, {
            '--progress': 0,
            '--hx': 0,
            '--bx': 0,
            '--box-s': .5,
            '--box-o': 0,
            '--truck-y': 0,
            '--truck-y-n': -26
          });
          gsap.set(box, {
            x: -24,
            y: -6
          });
        }

      });
    });
    document.addEventListener("DOMContentLoaded", () => {

      const text1 = "Bersama ";
      const text2 = "GoRavel...";
      let i = 0;
      let j = 0;

      const typing = document.getElementById("typing");

      function typeWebsite() {
        if (!typing) return;

        if (i < text1.length) {
          typing.innerHTML += text1.charAt(i);
          i++;
          setTimeout(typeWebsite, 80);
        } else {
          typing.innerHTML += '<span class="text-[#0062ff]" id="dev"></span>';
          typeDeveloper();
        }
      }

      function typeDeveloper() {
        const devSpan = document.getElementById("dev");
        if (!devSpan) return;

        if (j < text2.length) {
          devSpan.innerHTML += text2.charAt(j);
          j++;
          setTimeout(typeDeveloper, 80);
        }
      }

      typeWebsite();

      const searchInput = document.getElementById("searchInput");
      const searchBtn = document.getElementById("searchBtn");
      const categorySelect = document.getElementById("category");
      const items = document.querySelectorAll(".item");
      const notFound = document.getElementById("notFound");

      function filterData() {
        if (!searchInput || !categorySelect || !notFound) return;

        const keyword = searchInput.value.toLowerCase();
        const category = categorySelect.value;
        let found = false;

        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          const itemCategory = item.dataset.category;

          const matchText = text.includes(keyword);
          const matchCategory = category === "all" || itemCategory === category;

          if (matchText && matchCategory) {
            item.classList.remove("hidden");
            found = true;
          } else {
            item.classList.add("hidden");
          }
        });

        notFound.classList.toggle("hidden", found);
      }

      searchInput?.addEventListener("keyup", filterData);
      searchBtn?.addEventListener("click", filterData);
      categorySelect?.addEventListener("change", filterData);


      const navLinks = document.querySelectorAll(".nav-link");
      navLinks.forEach(link => {
        link.addEventListener("click", () => {
          navLinks.forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        });
      });

      const navbar = document.getElementById("navbar");

      window.addEventListener("scroll", () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
          navbar.classList.add("bg-white", "backdrop-blur", "pb-3", "transition");
          navbar.classList.remove("bg-transparent");
        } else {
          navbar.classList.remove("bg-white", "backdrop-blur", "transition");
          navbar.classList.add("bg-transparent");
        }
      });

      const grid = document.getElementById("bg-grid");
      const size = 32;
      let cols = 0;

      function createGrid() {
        if (!grid) return;

        grid.innerHTML = "";
        cols = Math.ceil(window.innerWidth / size);
        const rows = Math.ceil(window.innerHeight / size);

        for (let i = 0; i < cols * rows; i++) {
          const cell = document.createElement("div");
          cell.className = "cell";
          grid.appendChild(cell);
        }
      }

      createGrid();
      window.addEventListener("resize", createGrid);

      document.addEventListener("mousemove", (e) => {
        if (!grid) return;

        const col = Math.floor(e.clientX / size);
        const row = Math.floor(e.clientY / size);
        const index = row * cols + col;
        const cell = grid.children[index];
        if (!cell) return;

        cell.classList.add("active");
        clearTimeout(cell._fade);
        cell._fade = setTimeout(() => {
          cell.classList.remove("active");
        }, 700);
      });


      /* ================= LOADING TRANSITION ================= */
      const loading = document.getElementById("loading");

      document.querySelectorAll("a[href]:not([href^='#'])").forEach(link => {
        link.addEventListener("click", e => {
          if (!loading) return;

          e.preventDefault();
          loading.classList.remove("hidden");
          loading.classList.add("flex");

          setTimeout(() => {
            window.location.href = link.href;
          }, 1800);
        });
      });

      window.addEventListener("pageshow", () => {
        loading?.classList.add("hidden");
        loading?.classList.remove("flex");
      });

    });

    
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn")
  const drawer = document.getElementById("drawer")
  const overlay = document.getElementById("overlay")
  const items = document.querySelectorAll(".drawer-item")

  let open = false

  function resetItems() {
    items.forEach(item => {
      item.classList.add("opacity-0", "-translate-x-10", "scale-95")
    })
  }

  function animateIn() {
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 80}ms`
      item.classList.remove("opacity-0", "-translate-x-10", "scale-95")
    })
  }

  function animateOut() {
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 50}ms`
      item.classList.add("opacity-0", "-translate-x-10", "scale-95")
    })
  }

  const bottom = document.querySelector(".drawer-bottom")

function resetBottom() {
  bottom.classList.add("opacity-0", "translate-y-10")
}

function animateBottomIn() {
  bottom.classList.remove("opacity-0", "translate-y-10")
}

function animateBottomOut() {
  bottom.classList.add("opacity-0", "translate-y-10")
}

 menuBtn.addEventListener("click", () => {
  open = !open

  if (open) {
    drawer.classList.remove("translate-y-full")

    resetItems()
    resetBottom()

    setTimeout(() => {
      animateIn()

      // delay biar muncul terakhir (lebih smooth)
      setTimeout(() => {
        animateBottomIn()
      }, 300)

    }, 100)

  } else {
    animateOut()
    animateBottomOut()

    setTimeout(() => {
      drawer.classList.add("translate-y-full")
    }, 400)
  }
})


  overlay.addEventListener("click", () => {
    animateOut()

    setTimeout(() => {
      drawer.classList.add("translate-y-full")
      overlay.classList.add("opacity-0", "pointer-events-none")
      open = false
    }, 400)
  })

  resetItems()
})

