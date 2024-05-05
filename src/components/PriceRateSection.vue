<script>
export default {
	name: 'PriceRateSection',

	props: {
		isAnyPlayerUseIceTea: {
			type: Boolean,
			default: false
		},

		isAnyInvalidPlayer: {
			type: Boolean,
			default: false
		}
	},

	data: () => ({
		rules: {
			required: value => !!value || 'Không được để trống',
			percentage: value => (value >= 0 && value <= 100) || 'Từ 0 - 100% thôi!',
		},
		rate: null,
		iceTeaPrice: null,
		discount: null,
		isDiscountHourOnly: false
	}),

	computed: {
		priceFullFilled() {
			return this.rate && ((this.isAnyPlayerUseIceTea && this.iceTeaPrice) || !this.isAnyPlayerUseIceTea);
		}
	}
};
</script>

<template>
	<v-sheet class="background--primary pa-0">
		<v-form>
			<v-container>
				<v-row>
					<v-col :cols="isAnyPlayerUseIceTea ? 6 : 12">
						<v-text-field
							v-model="rate"
							class="text-input-field text-input-field--right"
							label="Giá giờ chơi"
							prepend-icon="mdi-currency-usd"
							:rules="[rules.required]"
							suffix=".000 ₫"
							type="number"
						></v-text-field>
					</v-col>

					<v-col v-if="isAnyPlayerUseIceTea" cols="6">
						<v-text-field
							v-model="iceTeaPrice"
							class="text-input-field text-input-field--right"
							label="Giá trà đá"
							prepend-icon="mdi-cup-water"
							suffix=".000 ₫"
							type="number"
						></v-text-field>
					</v-col>

					<v-col :cols="discount > 0 ? 6 : 12">
						<v-text-field
							v-model="discount"
							class="text-input-field text-input-field--right"
							label="Giảm giá"
							prepend-icon="mdi-sale-outline"
							:rules="[rules.percentage]"
							suffix="%"
							type="number"
						></v-text-field>
					</v-col>

					<v-col v-if="discount > 0" cols="6">
						<v-switch
							v-model="isDiscountHourOnly"
							color="primary"
						>
							<template #label>
								<span class="text-no-wrap">Chỉ giờ chơi</span>
							</template>
						</v-switch>
					</v-col>
				</v-row>
			</v-container>

			<v-container>
				<v-row v-show="priceFullFilled && !isAnyInvalidPlayer" justify="center">
					<v-btn
						variant="tonal"
						@click="$emit('on-calculate', { rate, iceTeaPrice, discount, isDiscountHourOnly })"
					>
						Tính tiền
					</v-btn>
				</v-row>
			</v-container>
		</v-form>
	</v-sheet>
</template>

<style scoped lang="scss">

</style>
