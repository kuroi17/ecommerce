
    let logButton = document.querySelector(".logout-btn");

    if (logButton){
        logButton.addEventListener("click", function(){

            window.location.href = "../htmlFolder/login.html";
            localStorage.removeItem("user");
            sessionStorage.removeItem("cart");
            

        });
    }