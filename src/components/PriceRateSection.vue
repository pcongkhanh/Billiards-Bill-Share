<script>
import { ru } from 'vuetify/locale';

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
			required: value => !!value || 'Nhập giá vào',
			percentage: value => (value >= 0 && value <= 100) || 'Từ 0 - 100% thôi!'
		},
		rate: 75,
		iceTeaPrice: null,
		discount: null,
		foodDiscount: 0,
		isDiscountPrivatelyForFood: false
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
							:rules="[rules.required]"
							label="Giá giờ chơi"
							prepend-icon="mdi-currency-usd"
							suffix=".000 ₫"
							type="number"
						></v-text-field>
					</v-col>

					<v-col v-if="isAnyPlayerUseIceTea" cols="6">
						<v-text-field
							v-model="iceTeaPrice"
							class="text-input-field text-input-field--right"
							:rules="[rules.required]"
							label="Giá trà đá"
							prepend-icon="mdi-currency-usd"
							suffix=".000 ₫"
							type="number"
						></v-text-field>
					</v-col>

					<v-col :cols="isDiscountPrivatelyForFood ? 6 : 12">
						<v-text-field
							v-model="discount"
							class="text-input-field text-input-field--right"
							:label="isDiscountPrivatelyForFood ? 'Giờ chơi' : 'Khuyến mãi'"
							prepend-icon="mdi-sale-outline"
							:rules="[rules.percentage]"
							suffix="%"
							type="number"
						></v-text-field>
					</v-col>

					<v-col v-if="isDiscountPrivatelyForFood" cols="6">
						<v-text-field
							v-model="foodDiscount"
							class="text-input-field text-input-field--right"
							label="Đồ ăn / uống"
							prepend-icon="mdi-sale-outline"
							:rules="[rules.percentage]"
							suffix="%"
							type="number"
						></v-text-field>
					</v-col>

					<v-col cols="12">
						<v-switch
							v-model="isDiscountPrivatelyForFood"
							class="px-2"
							hide-details
							density="compact"
							color="primary"
						>
							<template #label>
								<span class="text-no-wrap">Khuyến mãi riêng đồ ăn / uống</span>
							</template>
						</v-switch>
					</v-col>
				</v-row>
			</v-container>

			<v-container>
				<v-row v-show="priceFullFilled && !isAnyInvalidPlayer" class="py-4" justify="center">
					<v-btn
						variant="tonal"
						@click="$emit('on-calculate', { rate, iceTeaPrice, discount, foodDiscount, isDiscountPrivatelyForFood })"
					>
						Tính tiền
					</v-btn>
				</v-row>
			</v-container>
		</v-form>
	</v-sheet>
</template>
