const calcTime = (timestamp) => {
    // 한국시간 UTC+9
    // 9시간 빼주기 밀리세컨즈
    const now = new Date().getTime() - 9 * 60 * 60 * 1000;
    const diff = new Date(now - timestamp);
    const hour = diff.getHours();
    const min = diff.getMinutes();
    const sec = diff.getSeconds();

    if (hour > 0) {
        return `${hour}시간 전`;
    } else if (min > 0) {
        return `${min}분 전`;
    } else if (sec > 0) {
        return `${sec}초 전`;
    } else {
        return '방금 전';
    }
}
const renderData = (data) => {
    // data = [ {id:1,title:'aaaa'....},{}]
    const main = document.querySelector("main");
    // array.reverse() : 배열을 뒤집는다.
    // array.sort() : 
    data.reverse().forEach(async (obj) => {
        const div = document.createElement("div");
        div.classList.add("item-list");

        const imgDiv = document.createElement("div");
        imgDiv.classList.add("item-list__img");

        const img = document.createElement("img");
        const res = await fetch('/images/' + obj.id);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        img.src = url;

        const InfoDiv = document.createElement("div");
        InfoDiv.classList.add("item-list__info");

        const InfoTitleDiv = document.createElement("div");
        InfoTitleDiv.classList.add("item-list__info-title");
        InfoTitleDiv.innerText = obj.title;

        const InfoMetaDiv = document.createElement("div");
        InfoMetaDiv.classList.add("item-list__info-meta");
        InfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

        const InfoPriceDiv = document.createElement("div");
        InfoPriceDiv.classList.add("item-list__info-price");
        InfoPriceDiv.innerText = obj.price;

        imgDiv.appendChild(img);
        InfoDiv.appendChild(InfoTitleDiv);
        InfoDiv.appendChild(InfoMetaDiv);
        InfoDiv.appendChild(InfoPriceDiv);

        div.appendChild(imgDiv);
        div.appendChild(InfoDiv);

        main.appendChild(div);

        // const htmlText = `<div class="item-list">
        // 		<div class="item-list__img">
        // 			<img src="${url}" alt="" />
        // 		</div>
        // 		<div class="item-list__info">
        // 			<div class="item-list__info-title">${obj.title}</div>
        // 			<div class="item-list__info-meta">${obj.place + " " + calcTime(obj.insertAt)}</div>
        // 			<div class="item-list__info-price">${obj.price}</div>
        // 		</div>
        // 	</div>`;
        // main.innerHTML += htmlText;

    });
}
const fetchList = async () => {
    const access_token = window.localStorage.getItem('token');

    const res = await fetch('/items', {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    if (res.status === 401) {
        alert("로그인이 필요합니다.");
        window.location.pathname = "login.html";
        return;
    }
    const data = await res.json();
    console.log(data);
    renderData(data);
};
fetchList();