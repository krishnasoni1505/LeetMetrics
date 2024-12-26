document.addEventListener("DOMContentLoaded", function() {

    const searchbtn=document.querySelector("#searchbtn");
    const usernameinput=document.querySelector("#user");
    const easy=document.querySelector("#easy");
    const medium=document.querySelector("#medium");
    const hard=document.querySelector("#hard");
    const easy_label=document.querySelector(".easy-label");
    const medium_label=document.querySelector(".medium-label");
    const hard_label=document.querySelector(".hard-label");

    function validateUsername(username) {
        if(username.trim() === ""){
            alert("Username cannot be empty.");
            return false;
        }
        // Regular expression for LeetCode-style usernames
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}(?<![_-])$/;

        // Test the username against the regex
        const isMatching=usernameRegex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    function updateStats(data){
        const easyDone=data.easySolved;
        const totalEasy=data.totalEasy;
        const mediumDone=data.mediumSolved;
        const totalMedium=data.totalMedium;
        const hardDone=data.hardSolved;
        const totalHard=data.totalHard;
        console.log("Easy solved: ", easyDone);
        console.log("Medium solved: ", mediumDone);
        console.log("Hard solved: ", hardDone);
        const easyPercent= easyDone/totalEasy*100;
        const mediumPercent= mediumDone/totalMedium*100;
        const hardPercent= hardDone/totalHard*100;
        easy.style.setProperty('--progress-degree', `${easyPercent}%`);
        medium.style.setProperty('--progress-degree', `${mediumPercent}%`);
        hard.style.setProperty('--progress-degree', `${hardPercent}%`);
        easy_label.innerHTML= `<span>${easyDone}/${totalEasy}</span>`;
        medium_label.innerHTML=`<span>${mediumDone}/${totalMedium}</span>`;
        hard_label.innerHTML=`<span>${hardDone}/${totalHard}</span>`;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try{
            searchbtn.textContent="Searching...";
            searchbtn.disabled = true;

            const response= await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch User details.")
            }
            const data = await response.json(); 
            console.log("Loggin Details: ", data);
            updateStats(data);
        }
        catch(error){
            alert("No data Found.");
        }
        finally {
            searchbtn.textContent="Search";
            searchbtn.disabled = false;
        }
    }

    searchbtn.addEventListener("click", function() {
        const username=usernameinput.value;
        console.log("Loggin username: ", username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})