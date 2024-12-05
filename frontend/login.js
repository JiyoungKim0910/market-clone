const form = document.querySelector("#login-form");
// let access_token = null;
const checkPassword = () => {
    const formData = new FormData(form);
    return formData.get('password') === formData.get('password2') ? true : false
}
const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const sha256Password = sha256(formData.get('password'));
    formData.set('password', sha256Password);
    console.log(formData.get('password'));
    const div = document.querySelector('#info');

    const res = await fetch('/login', {
        method: 'post',
        body: formData
    });

    if (res.status === 200) {
        const data = await res.json();
        const access_token = data.access_token;
        console.log(access_token);
        // 로컬 스토리지 : 브라우저가 닫혔다 열려도 저장
        window.localStorage.setItem("token", access_token);
        // 세션 스토리지 : 브라우저가 닫히면 정보 없어짐
        // window.sessionStorage.setItem("token", access_token)
        alert("Success Login");
        window.location.pathname = "/";
    } else {
        alert("Wrong ID or Password");
        form.reset();
    }


    // const btn = document.createElement("button");
    // btn.innerText = "load items";
    // btn.addEventListener("click", async () => {
    //     const res = await fetch("/items", {
    //         headers: {
    //             'Authorization': `Bearer ${access_token}`
    //         }
    //     });
    //     const data = await res.json();
    //     console.log(data);
    // });
    // infoDiv.appendChild(btn);

    // if (res.status === 200) {
    //     alert("Success Login");
    //     window.location.pathname = "/";
    //     console.log(res.status);
    // } else if (res.status === 401) {
    //     alert("Wrong ID or Password");
    // }

    // if (!checkPassword()) {

    //     div.innerText = '비밀번호가 일치하지 않습니다.';
    //     div.style.color = 'red';
    //     // alert('비밀번호가 일치하지 않습니다.');

    //     return;
    // } else {

    //     const res = await fetch('/signup', {
    //         method: 'POST',
    //         body: formData
    //     });
    //     const data = await res.json();
    //     if (data === 200) {
    //         // div.innerText = '회원가입에 성공했습니다.';
    //         // div.style.color = 'blue';
    //         alert('회원가입에 성공했습니다.');
    //         // alert 는 요즘 잘 사용하지 않음
    //         // 토스트 메시지 사용
    //         window.location.pathname = "login.html";
    //     }
    // }

    // console.log()
}

form.addEventListener("submit", handleSubmit);