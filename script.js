let isDOBOpen = false
let dateOfBirth;
const settingIconElement = document.getElementById("setting-icon")
const settingContentElement = document.getElementById("setting-content")
const initialTextElement = document.getElementById("initial-text")
const afterDOBButtonTextElement = document.getElementById("after-dob-button")
const dobButton = document.getElementById("dob-button")
const dobInput = document.getElementById("dob-input")

const makeTwoDigitNumber = (number) => {
    return (number > 9 ? number: `0${number}`) 
}

const toggleDateOfBirthSelector = () => {
    if (isDOBOpen) {
        settingContentElement.classList.add("hide")
    } else {
        settingContentElement.classList.remove("hide")
    }
    isDOBOpen = !isDOBOpen
    // console.log(isDOBOpen)
}

const yearElement = document.getElementById("years")
const monthElement = document.getElementById("months")
const dayElement = document.getElementById("days")
const hourElement = document.getElementById("hours")
const minuteElement = document.getElementById("minutes")
const secondElement = document.getElementById("seconds")

const updateAge = () => {
    const currentDate = new Date() 
    // console.log(currentDate)
    const dateDifference = currentDate - dateOfBirth
    const years = Math.floor(dateDifference/(1000*60*60*24*365))
    const months = Math.floor(dateDifference/(1000*60*60*24*365) % 12)
    const days = Math.floor(dateDifference/(1000*60*60*24) % 30)
    const hours = Math.floor(dateDifference/(1000*60*60) % 24)
    const minutes = Math.floor(dateDifference/(1000*60) % 60)
    const seconds = Math.floor(dateDifference/(1000) % 60)
    // console.log({
    //     years, months, days, hours, minutes, seconds
    // })

    yearElement.innerHTML = makeTwoDigitNumber(years)
    monthElement.innerHTML = makeTwoDigitNumber(months)
    dayElement.innerHTML = makeTwoDigitNumber(days)
    hourElement.innerHTML = makeTwoDigitNumber(hours)
    minuteElement.innerHTML = makeTwoDigitNumber(minutes)
    secondElement.innerHTML = makeTwoDigitNumber(seconds)
}

const localStorageGetter = () => {
    const years = localStorage.getItem("years")
    const months = localStorage.getItem("months")
    const date = localStorage.getItem("date")
    const hours = localStorage.getItem("hours")
    const minutes = localStorage.getItem("minutes")
    const seconds = localStorage.getItem("seconds")
    if (years && months && date && hours && minutes && seconds) {
        dateOfBirth = new Date(years, months, date, hours, minutes, seconds)
    } 
    updateAge()
}

const contentToggler = () => {
    updateAge()
    if (dateOfBirth) {
        initialTextElement.classList.add("hide")
        afterDOBButtonTextElement.classList.remove("hide")
    } else {
        afterDOBButtonTextElement.classList.add("hide")
        initialTextElement.classList.remove("hide")
    }
}

const setDOBHandler = () => {
    const dateString = dobInput.value
    dateOfBirth = dateString? new Date(dateString) : null

    console.log(dateOfBirth)

    if (dateOfBirth) {
        localStorage.setItem("years", dateOfBirth.getFullYear())
        localStorage.setItem("months", dateOfBirth.getMonth())
        localStorage.setItem("date", dateOfBirth.getDate())
        localStorage.setItem("hours", dateOfBirth.getHours())
        localStorage.setItem("minutes", dateOfBirth.getMinutes())
        localStorage.setItem("seconds", dateOfBirth.getSeconds())
        updateAge()
    }
    setInterval(() => updateAge(), 1000)
    contentToggler()
    // console.log(dateOfBirth)
}
localStorageGetter()
contentToggler()

settingIconElement.addEventListener("click", toggleDateOfBirthSelector)
dobButton.addEventListener("click", setDOBHandler)