<script>
export default {
	name: 'ResultSection',

	props: {
		players: {
			type: Array,
			default: () => ([])
		}
	},

	data() {
		return {
			resultHeaders: [
				{ value: 'name', align: 'start' },
				{ value: 'charge', align: 'end' }
			]
		};
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

		totalCost() {
			return (this.players || []).reduce((sum, player) => {
				return sum + (player?.charge || 0);
			}, 0);
		},

		formatedTotalCost() {
			return this.formatCurrencyVND(this.totalCost)
		},

		resultTableData() {
			return this.playersTableData.concat({ name: 'Tổng', charge: this.formatedTotalCost });
		}
	},

	methods: {
		formatCurrencyVND(number) {
			return (number * 1000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
		}
	}
};
</script>

<template>
	<v-container class="pa-0 pb-4">
		<v-data-table
			v-if="totalCost"
			class="result-table background--transparent"
			:headers="resultHeaders"
			:items="resultTableData"
			:items-per-page="tableData?.length"
		>
			<template #headers></template>
			<template #bottom></template>
		</v-data-table>
	</v-container>
</template>

<style lang="scss">
@import "@/styles/main.scss";

.result-table {
	.v-table__wrapper {
		.v-data-table__tr:not(:last-child) {
			.v-data-table__td,
			.v-data-table__th {
				border-bottom: 1px solid $primary-color !important;
			}
		}
	}
}
</style>
