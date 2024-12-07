<script>
	import { onMount } from "svelte";
	import Footer from "../components/Footer.svelte";
	import { getDatabase, ref, onValue } from "firebase/database";

	let time = "00:00";
	const timer = () => {
		let hour = new Date().getHours().toString().padStart(2, "0");
		let min = new Date().getMinutes().toString().padStart(2, "0");
		time = hour + ":" + min;
	};
	timer();
	setInterval(timer, 60000);

	// 반응형 변수: 이 값이 변동되면 밑에서 랜더링 하는 태그에서 자동으로 업데이트
	// let을 써도 변경이 되긴 함
	$: items = [];

	const db = getDatabase();
	const itemsRef = ref(db, "items/");
	// onMount : 화면이 랜더링 될 때마다 함수 호출
	onMount(() => {
		onValue(itemsRef, (snapshot) => {
			const data = snapshot.val();
			items = Object.values(data).reverse();
			console.log(Object.values(data));
		});
	});
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
			return "방금 전";
		}
	};
</script>

<header>
	<div class="info-bar">
		<div class="info-bar__time">{time}</div>
		<div class="info-bar__icons">
			<img src="assets/chart-bar.svg" alt="chart-bar" />
			<img src="assets/wifi.svg" alt="wifi" />
			<img src="assets/battery.svg" alt="battery" />
		</div>
	</div>
	<div class="menu-bar">
		<div class="menu-bar__location">
			<div>역삼1동</div>
			<div class="menu-bar__location-icon">
				<img src="assets/arrow.svg" alt="arrow" />
			</div>
		</div>
		<div class="menu-bar__icons">
			<img src="assets/search.svg" alt="search" />
			<img src="assets/menu.svg" alt="menu" />
			<img src="assets/alert.svg" alt="alert" />
		</div>
	</div>
</header>

<main>
	{#each items as item}
		<div class="item-list">
			<div class="item-list__img">
				<img src={item.imgUrl} alt={item.title} />
			</div>
			<div class="item-list__info">
				<div class="item-list__info-title">{item.title}</div>
				<div class="item-list__info-meta">
					{item.place + " "}{calcTime(item.insertAt)}
				</div>
				<div class="item-list__info-price">{item.price}</div>
			</div>
		</div>
	{/each}
	<a class="write-btn" href="#/write">+글쓰기</a>
</main>
<Footer location="home" />
<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>
