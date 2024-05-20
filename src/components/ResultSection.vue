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
		tableData() {
			return this.players.map(player => ({
				name: player.name,
				charge: this.formatCurrencyVND(player.charge || 0)
			}))

		}
	},

	methods: {
		formatCurrencyVND(number) {
			return (number * 1000).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
		}
	}
}
</script>

<template>
	<v-container>
		<v-data-table
			:items="tableData"
			:items-per-page="tableData?.length"
			hide-default-footer
			hide-default-header
		>
			<template #headers></template>
			<template #bottom></template>
		</v-data-table>
	</v-container>
</template>

<style scoped lang="scss">

</style>
