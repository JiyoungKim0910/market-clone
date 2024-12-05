const form = document.querySelector("#signup-form");

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
    if (!checkPassword()) {

        div.innerText = '비밀번호가 일치하지 않습니다.';
        div.style.color = 'red';
        // alert('비밀번호가 일치하지 않습니다.');

        return;
    } else {

        const res = await fetch('/signup', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data === 200) {
            // div.innerText = '회원가입에 성공했습니다.';
            // div.style.color = 'blue';
            alert('회원가입에 성공했습니다.');
            // alert 는 요즘 잘 사용하지 않음
            // 토스트 메시지 사용
            window.location.pathname = "login.html";
        }
    }

    console.log()
}

form.addEventListener("submit", handleSubmit);