const form = document.getElementById('write-form');

const handleSubmitForm = async (e) => {
    // console.log('submit form');
    e.preventDefault();
    const body = new FormData(form);
    // 세계시간 기준
    body.append('insertAt', new Date().getTime());
    try {
        const res = await fetch('/items', {
            method: 'POST',
            body
        });
        const data = await res.json();
        if (data === 200)
            window.location.pathname = "/";
    } catch (error) {
        console.error(error)
    }

}


form.addEventListener('submit', handleSubmitForm);