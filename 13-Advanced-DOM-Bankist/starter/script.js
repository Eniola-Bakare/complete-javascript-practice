'use strict';

///////////////////////////////////////
// Modal window
const header = document.querySelector('.header')
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav')
const logo = document.querySelector('#logo')
const allSections = document.querySelectorAll('.section')
const imgTarget = document.querySelectorAll('img[data-src]')

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
});


const message = document.createElement('div')
message.classList.add('cookie-message')
message.innerHTML = 'We use cookies to improve functionality and analytics. <button class="btn btn--close-cookie">Got it! </button>'

// header.prepend(message)
// header.append(message)

header.before(message)
// header.after(message)
document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove()
})


const learMoreBtn = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

learMoreBtn.addEventListener('click', function(e){
  const s1cords = section1.getBoundingClientRect()
  section1.scrollIntoView({behavior: 'smooth'})
})

// handling multiple events traditionally
// document.querySelectorAll('.nav__link').forEach(function(eachItem) {
//   eachItem.addEventListener('click', function (e){
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     console.log(id)
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
//   })


// using event delegation
// 1. attach the event listener to the parent element of such concerned els
// 2. Define a matching strategy
// 3. Determine what element originated the event and mke it receive the function
  document.querySelector('.nav__links').addEventListener('click', (e)=>{
    e.preventDefault()
    // console.log(e.target)

    if(e.target.classList.contains('nav__link')){
      const id = e.target.getAttribute('href')
      // console.log(id)
      document.querySelector(id).scrollIntoView({behavior: 'smooth'})
    }
  })

  // traversing the dom - walking through the dom. selecting element relative to other elements
  // for child elements/nodes; parentElement&& grandParent elements too; for sibling elements

  // implementing faded automation

  // refactoring to ensure DRY
  const handleHover = function(e){
    if(e.target.classList.contains('nav__link')){
      const currLink = e.target

      const siblings = currLink.closest('nav').querySelectorAll('.nav__link')
      siblings.forEach(sib => {
        if (sib !== currLink) {
          sib.style.opacity = this;
        }
      })
      logo.style.opacity = this;

    }
  }

  nav.addEventListener('mouseover', handleHover.bind(0.5))

  nav.addEventListener('mouseout', handleHover.bind(1))

  const initialCords = section1.getBoundingClientRect().top
  // console.log(initialCords)

  // window.addEventListener('scroll', function(e){
  //   console.log(initialCords, 'initialCords')
  //   console.log(this.window.scrollY, 'scroll Y')

  //   if (this.window.scrollY > initialCords) nav.classList.add('sticky')
  //   else nav.classList.remove('sticky')
  // })

  const navHeight = nav.getBoundingClientRect().height

  const observerCallBack = function(entries, headerObserver){
    const [entry] = entries
    // console.log(entry)
    if (!entry.isIntersecting) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
  }

  const headerObserver = new IntersectionObserver (observerCallBack, {
    root:null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
  })

  headerObserver.observe(header)



  // reveal sections observer

  const revealSection = function(entries, observer){
    const [entry] = entries
    // console.log(entry.target.id)
    if (!entry.isIntersecting) return;
    else entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
  }

  const sectionObserver = new IntersectionObserver (revealSection, {
    root: null,
    threshold: 0.15,
  })

  allSections.forEach(section =>{
    // section.classList.add('section--hidden')
    sectionObserver.observe(section)
  })

  // intersection observer for the images
  const loadImg = function(entries, oberver){
    const [entry] = entries
    const dataSetSrc = entry.target.getAttribute('data-src')

    if(!entry.isIntersecting) return;
    entry.target.src = dataSetSrc
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img')
    })

    oberver.unobserve(entry.target)
  }
  const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
  })

  imgTarget.forEach(img => {
    imgObserver.observe(img)
  })

  // building the tabbed component
  const tabs = document.querySelectorAll('.operations__tab')
  const tabContent = document.querySelectorAll('.operations__content')
  const tabContainer = document.querySelector('.operations__tab-container')

  tabContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab')

    // removing the selection
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
    tabContent.forEach(tabC => tabC.classList.remove('operations__content--active'))

    if(!clicked)return;

    clicked.classList.add('operations__tab--active')
    document.querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active')
  })


  // for slider
  
  const sliderFunc = function(){
    
      const slides = document.querySelectorAll('.slide')
      const slider = document.querySelector('.slider')
      const btnLeft = document.querySelector('.slider__btn--left')
      const btnRight = document.querySelector('.slider__btn--right')
      const dotsContainer = document.querySelector('.dots')
    
      let currSlide = 0;
      let maxSlide = slides.length

  // functions
    const createDots = function(){
      slides.forEach((_, i) => {
        dotsContainer.insertAdjacentHTML('beforeend', 
        `<button class="dots__dot" data-slide="${i}"></button>`)
      })
    }
    
    const activateDot = function(slideNo){
      document.querySelectorAll('.dots__dot').forEach(dot => {
        dot.classList.remove('dots__dot--active')
      })
      document.querySelector(`.dots__dot[data-slide="${slideNo}"]`).classList.add('dots__dot--active')
    }
    
    const goToSlide = function(s){
        slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - s)}%)`
    })
    }
    

    const nextSlide = function(){
      if (currSlide === maxSlide - 1) {
        currSlide = 0; 
      } else{
        currSlide++;
      }
    goToSlide(currSlide)
    activateDot(currSlide)
    }
    const prevSlide = function(){
      if (currSlide === 0) {
        currSlide = maxSlide - 1
      }else{
        currSlide--;
      }
      goToSlide(currSlide)
      activateDot(currSlide)
    }

    const init = function(){
      createDots()
      activateDot(0)
      goToSlide(0)
    }
    init()

  // event handlers
    btnRight.addEventListener('click', nextSlide)
    btnLeft.addEventListener('click', prevSlide)

    // the arrow keys for control
    document.addEventListener('keydown', function(e){
      if (e.key === 'ArrowRight')   nextSlide()  
      if (e.key === 'ArrowLeft')  prevSlide()  
    })

  // the control dots for the slider
  dotsContainer.addEventListener('click', function(e){ 
    const slide = e.target.dataset.slide
    if(!e.target.classList.contains('dots__dot')) return;
    goToSlide(slide)
    activateDot(slide)
  })
}

sliderFunc()