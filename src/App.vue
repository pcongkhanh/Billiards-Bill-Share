<script>
import HeaderBar from '@/components/HeaderBar.vue';
import PlayerSection from '@/components/PlayerSection.vue';
import PriceRateSection from "@/components/PriceRateSection.vue";
import ResultSection from "@/components/ResultSection.vue";

export default {
	name: 'App',

	components: {
		HeaderBar,
		PlayerSection,
		PriceRateSection,
		ResultSection
	},

	data: () => ({
		players: []
	}),

	computed: {
		isAnyPlayer() {
			return this.players.length > 0;
		},

		isAnyInvalidPlayer() {
			return this.players.find(player => !(player.name && player.startTime && player.endTime)) && this.isAnyPlayer;
		},

		isAnyPlayerUseIceTea() {
			return (this.players || []).some(player => player.iceTea);
		}
	},

	methods: {
		onPriceRateUpdated() {

		}
	}
}
</script>

<template>
	<v-app>
		<v-main>
			<HeaderBar></HeaderBar>
			<PlayerSection ref="playerSection" :players="players" :is-add-player-disabled="isAnyInvalidPlayer">
			</PlayerSection>
			<PriceRateSection
				v-show="isAnyPlayer"
				:is-any-player-use-ice-tea="isAnyPlayerUseIceTea"
				:is-any-invalid-player="isAnyInvalidPlayer"
			></PriceRateSection>
			<ResultSection :players="players"></ResultSection>
		</v-main>
	</v-app>
</template>

<style lang="scss">
@import "@/styles/main.scss";
</style>
