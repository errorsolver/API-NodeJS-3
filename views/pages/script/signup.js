const form = document.querySelector("form")
alert(form)

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = form.username.value
    const password = form.password.value

    try {
        const res = await fetch('/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        return res
    } catch (err) {
        console.log('signup error: ', err);
    }
    console.log(username, password)
})