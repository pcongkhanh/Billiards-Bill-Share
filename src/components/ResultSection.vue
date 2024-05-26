<script>
export default {
	name: 'ResultSection',

	props: {
		players: {
			type: Array,
			default: () => ([])
		}
	},

	computed: {
		playersTableData() {
			return (this.players || []).map(player => {
				return {
					name: player.name,
					charge: this.formatCurrencyVND(player.charge || 0)
				};
			});
		},

		resultTableData() {
			return this.playersTableData.concat({ name: 'Tổng', charge: this.calculateTotalCost() });
		}
	},

	methods: {
		formatCurrencyVND(number) {
			return (number * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
		},

		calculateTotalCost() {
			return this.formatCurrencyVND(this.players.reduce((sum, player) => {
				return sum + (player?.charge || 0);
			}, 0));
		}
	}
};
</script>

<template>
	<v-container>
		<v-data-table
			:items="resultTableData"
			:items-per-page="tableData?.length"
			hide-no-data
		>
			<template #headers></template>
			<template #bottom></template>
		</v-data-table>
	</v-container>
</template>

<style scoped lang="scss">

</style>
