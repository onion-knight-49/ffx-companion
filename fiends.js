var allAreas = document.querySelectorAll('.area')
var allFiends = document.querySelectorAll('.fiend')

const checkComplete = () => {
  for (let i = 0; i < allAreas.length; i++) {
    var fiendsForArea = allAreas[i].querySelectorAll('.fiend')
    var completed = true
    for (let j = 0; j < fiendsForArea.length; j++) {
      const count = fiendsForArea[j].querySelector('.count')
      if (count.value < 1) completed = false
    }
    var areaStatus = allAreas[i].querySelector('.conquest-complete')
    const wasCompleted = areaStatus.innerHTML === 'Complete!'
    const checkInner = allAreas[i].querySelector('.check-inner')
    if (completed) {
      areaStatus.innerHTML = 'Complete!'
      if (!wasCompleted) {
        checkInner.classList.add('check-inner-animate-in')
        checkInner.classList.remove('check-inner-animate-out')
      }
    } else {
      areaStatus.innerHTML = 'Incomplete'
      if (wasCompleted) {
        checkInner.classList.remove('check-inner-animate-in')
        checkInner.classList.add('check-inner-animate-out')
      }
    }
  }
}

allFiends.forEach(fiend => {
  const reqdSpeciesCount = +fiend.dataset.count
  const container = fiend.querySelector('.container')
  let bar
  if (container) {
    bar = new ProgressBar.Circle(container, {
      strokeWidth: 8,
      easing: 'easeInOut',
      duration: 100,
      color: '#c1272d',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: null
    })
  }
  const count = fiend.querySelector('.count')
  const decrement = fiend.querySelector('.decrement')
  const increment = fiend.querySelector('.increment')
  decrement.onclick = () => {
    if (count.value > 0) {
      count.value--
      if (bar && count.value <= reqdSpeciesCount) {
        bar.animate(count.value / reqdSpeciesCount)
      }
      checkComplete()
    }
  }
  increment.onclick = () => {
    if (count.value < 10) {
      count.value++
      if (bar && count.value <= reqdSpeciesCount) {
        bar.animate(count.value / reqdSpeciesCount)
      }
      checkComplete()
    }
  }
})
