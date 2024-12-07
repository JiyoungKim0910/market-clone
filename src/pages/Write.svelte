<script>
	import { getDatabase, ref, push } from "firebase/database";
	import {
		getDownloadURL,
		getStorage,
		ref as refImg,
		uploadBytes,
	} from "firebase/storage";
	import Footer from "../components/Footer.svelte";

	let title;
	let price;
	let description;
	let place;
	let files;

	const db = getDatabase();
	const storage = getStorage();
	const storageRef = refImg(storage, "/imgs");

	const writeUserData = async (imgUrl) => {
		push(ref(db, "items/"), {
			title,
			price,
			description,
			place,
			insertAt: new Date().getTime(),
			imgUrl,
		});
		alert("글쓰기가 완료되었습니다.");
		// 요즘 alert은 잘 쓰지 않음. 사용자가 제출하기를 눌렀는데 확인버튼을 또 눌러야함
		window.location.hash = "/";

		// 식별자가 중복될 경우가 있으므로 목록읽기를 사용할것
		// set(ref(db, "items/" + userId), {
	};

	$: if (files) console.log(files);
	// files가 변동될 때 마다 log찍기

	const uploadFiles = async () => {
		const file = files[0];
		// uploadBytes(storageRef,file);
		// blob로 바꾸지 않으면 업로드는 되나 용량을 많이 차지함
		const f_name = file.name;
		const imgRef = refImg(storageRef, f_name);
		await uploadBytes(imgRef, file);
		const url = await getDownloadURL(imgRef);
		console.log(url);
		return url;
	};
	const handleSubmit = async () => {
		const url = await uploadFiles();
		writeUserData(url);
	};

	// 'file' comes from the Blob or File API
	// uploadBytes(storageRef, file).then((snapshot) => {
	// 	console.log("Uploaded a blob or file!");
	// });
</script>

<form id="write-form" on:submit|preventDefault={handleSubmit}>
	<div>
		<label for="image">이미지</label>
		<input type="file" bind:files id="image" name="image" />
	</div>
	<div>
		<label for="title">제목</label>
		<input type="text" id="title" name="title" bind:value={title} />
	</div>
	<div>
		<label for="price">가격</label>
		<input type="number" id="price" name="price" bind:value={price} />
	</div>
	<div>
		<label for="description">설명</label>
		<input
			type="text"
			id="description"
			name="description"
			bind:value={description}
		/>
	</div>
	<div>
		<label for="place">장소</label>
		<input type="text" id="place" name="place" bind:value={place} />
	</div>
	<div><button class="write-button" type="submit">작성 완료</button></div>
</form>

<Footer location="write" />

<style>
	.write-button {
		background-color: tomato;
		margin: 10px;
		border-radius: 10px;
		padding: 5px 12px;
		color: white;
		cursor: pointer;
	}
</style>
