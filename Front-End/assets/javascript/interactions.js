document.addEventListener("DOMContentLoaded", () => {

    document
      .getElementById("contact-form")
      .addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    const response = await axios.post("http://localhost:3000/form", data);
        console.log(response.data);
    });

});