/* global Audio */

const remote = require('electron').remote

var startSection = document.getElementById('start')
var endedSection = document.getElementById('ended')
var mainSection = document.getElementById('main')
var mins = 10
var seconds = 00
var alarm = new Audio('./../../assets/media/alarm.mp3')

alarm.addEventListener('ended', function () {
 this.currentTime = 0
 this.play()
}, false)

document.getElementById('close').addEventListener('click', function (e) {
 remote.app.quit()
})

function startTimer() {
 startSection.style.display = 'none'
 endedSection.style.display = 'none'

 mainSection.style.display = 'flex'
 countdown('counter', 10, 00)
 alarm.pause()
 alarm.currentTime = 0
}

function timerFinished() {
 endedSection.style.display = 'flex'
 mainSection.style.display = 'none'
 alarm.play()
}

function stopTimer() {
 alarm.pause()
 alarm.currentTime = 0
 startSection.style.display = 'flex'
 endedSection.style.display = 'none'
 mainSection.style.display = 'none'
}

function countdown(elementName, minutes, 00) {
 var element, endTime, hours, mins, msLeft, time

 function twoDigits(n) {
  return (n <= 9 ? '0' + n : n)
 }

 function updateTimer() {
  msLeft = endTime - (+new Date)
  if (msLeft < 1000) {
   element.innerHTML = '00:00'
   timerFinished()
  } else {
   time = new Date(msLeft)
   hours = time.getUTCHours()
   mins = time.getUTCMinutes()
   element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds())
   setTimeout(updateTimer, time.getUTCMilliseconds() + 500)
  }
 }

 element = document.getElementById(elementName)
 endTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500
 updateTimer()
}
