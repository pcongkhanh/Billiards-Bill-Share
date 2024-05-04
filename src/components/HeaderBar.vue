<script setup>
import logo from '../assets/logo.jpg'
</script>

<script>
export default {
	name: 'HeaderBar'
};
</script>

<template>
	<header class="header">
		<div class="logo-container">
			<img :src="logo" alt="Logo" class="logo">
		</div>
	</header>
</template>

<style scoped>
.header {
	display: flex;
	justify-content: center;
	padding: 24px;
}

.logo-container {
	text-align: center;
}

.logo {
	width: 126px;
	aspect-ratio: 1;
	border-radius: 21px;
}
</style>
