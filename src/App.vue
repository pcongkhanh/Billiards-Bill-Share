<script>
import HeaderBar from '@/components/HeaderBar.vue';
import PlayerSection from '@/components/PlayerSection.vue';
import PriceRateSection from "@/components/PriceRateSection.vue";

export default {
	name: 'App',

	components: {
		HeaderBar,
		PlayerSection,
		PriceRateSection
	},

	data: () => ({
		isAnyPlayer: false,
		isAnyPlayerUseIceTea: false
	}),

	methods: {
		onPlayerListChange(playerCount) {
			this.isAnyPlayer = playerCount > 0;
		},

		onIceTeaUsageChange(isUse) {
			this.isAnyPlayerUseIceTea = isUse;
		}
	}
}
</script>

<template>
	<v-app>
		<v-main>
			<HeaderBar></HeaderBar>
			<PlayerSection
				@on-player-list-change="onPlayerListChange"
				@on-ice-tea-usage-change="onIceTeaUsageChange"
			></PlayerSection>
			<PriceRateSection
				:is-any-player="isAnyPlayer"
				:is-any-player-use-ice-tea="isAnyPlayerUseIceTea"
			></PriceRateSection>
		</v-main>
	</v-app>
</template>

<style lang="scss">
@import "@/styles/main.scss";
</style>
