<script>
	let time = "00:00";
	const timer = () => {
		let hour = new Date().getHours().toString().padStart(2, "0");
		let min = new Date().getMinutes().toString().padStart(2, "0");
		time = hour + ":" + min;
	};
	timer();
	setInterval(timer, 60000);
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
	<a class="write-btn" href="#/write">+글쓰기</a>
</main>

<footer>
	<div class="footer-block">
		<div class="footer-icons">
			<div class="footer-icons__img">
				<img src="assets/home.svg" alt="" />
			</div>
			<div class="footer-icons__desc">홈</div>
		</div>
		<div class="footer-icons">
			<div class="footer-icons__img">
				<img src="assets/doc.svg" alt="" />
			</div>
			<div class="footer-icons__desc">동네생활</div>
		</div>
		<div class="footer-icons">
			<div class="footer-icons__img">
				<img src="assets/location.svg" alt="" />
			</div>
			<div class="footer-icons__desc">내 근처</div>
		</div>
		<div class="footer-icons">
			<div class="footer-icons__img">
				<img src="assets/chat.svg" alt="" />
			</div>
			<div class="footer-icons__desc">채팅</div>
		</div>
		<div class="footer-icons">
			<div class="footer-icons__img">
				<img src="assets/user.svg" alt="" />
			</div>
			<div class="footer-icons__desc">나의 당근</div>
		</div>
	</div>
</footer>
<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>
