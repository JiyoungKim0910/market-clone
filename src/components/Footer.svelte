<script>
	export let location;
	const moveToHome = () => {
		window.location.hash = "/";
	};
</script>

<footer>
	<div class="footer-block">
		<button class="footer-icons" on:click={moveToHome}>
			<div class="footer-icons__img">
				{#if location === "home"}
					<img src="assets/home.svg" alt="" />
				{:else}
					<img src="assets/__home.svg" alt="" />
				{/if}
			</div>
			<div class="footer-icons__desc">홈</div>
		</button>
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
