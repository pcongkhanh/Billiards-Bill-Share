<script>
const NEW_PLAYER = {
	id: 0,
	name: '',
	startTime: null,
	endTime: null,
	food: null,
	iceTea: false
}
export default {
	name: 'PlayerSection',

	data: () => ({
		rules: {
			required: value => !!value || 'Không được để trống',
		},
		players: []
	}),

	computed: {
		isDisableAddButton() {
			return this.players.find(player => !(player.name && player.startTime && player.endTime)) && this.players.length;
		},

		playerCount() {
			return this.players.length;
		},

		isAnyPlayerUseIceTea() {
			return (this.players || []).some(player => player.iceTea);
		}
	},

	watch: {
		playerCount(value) {
			this.$emit('on-player-list-change', value);
		},

		isAnyPlayerUseIceTea(value) {
			this.$emit('on-ice-tea-usage-change', value);
		}
	},

	methods: {
		addPlayer() {
			this.players.push({
				...NEW_PLAYER,
				id: Math.random().toString(16).slice(2)
			})
		},
		removePlayer(index) {
			this.players.splice(index, 1);
		}
	}
};
</script>

<template>
	<v-sheet class="background--primary pa-0">
		<v-form
			v-for="(player, index) in players"
			class="player-details-wrapper"
			:key="player.id"
		>
			<v-container>
				<v-row>
					<v-col cols="11">
						<v-text-field
							v-model="player.name"
							class="text-input-field mb-3"
							:rules="[rules.required]"
							autofocus
							label="Tên người chơi"
							prepend-icon="mdi-account-tie"
							variant="plain"
						></v-text-field>

						<v-divider class="mb-4" thickness="2" color="secondary"></v-divider>
					</v-col>

					<v-col cols="1">
						<v-icon icon="mdi-minus" color="red" @click="removePlayer(index)"></v-icon>
					</v-col>

					<v-col cols="5" offset="1">
						<v-text-field
							v-model="player.startTime"
							class="text-input-field mb-3"
							:rules="[rules.required]"
							label="Giờ đến"
							prepend-icon="mdi-clock-start"
							type="time"
						></v-text-field>
					</v-col>

					<v-col cols="5">
						<v-text-field
							v-model="player.endTime"
							class="text-input-field mb-3"
							:rules="[rules.required]"
							label="Giờ đi"
							prepend-icon="mdi-clock-end"
							type="time"
						></v-text-field>
					</v-col>

					<v-col cols="5" offset="1">
						<v-text-field
							v-model="player.food"
							class="text-input-field text-input-field--right text-right mb-3"
							label="Đồ ăn"
							prepend-icon="mdi-food"
							suffix=".000 ₫"
							type="number"
							@focus="$event.target.select()"
						></v-text-field>
					</v-col>

					<v-col cols="5">
						<v-checkbox
							v-model="player.iceTea"
							prepend-icon="mdi-beer-outline"
						>
							<template #label>
								<span class="text-no-wrap">Trà đá: {{ player.iceTea ? 'Có' : 'Không' }}</span>
							</template>
						</v-checkbox>
					</v-col>
				</v-row>
			</v-container>
		</v-form>
	</v-sheet>

	<div class="add-new-player py-2">
		<v-btn variant="text" color="primary" @click="addPlayer" :disabled="isDisableAddButton">
			<v-icon left>mdi-plus</v-icon>
			Thêm người chơi
		</v-btn>
	</div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.add-new-player {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}

.player-details-wrapper {
	&:not(:last-child) {
		margin-bottom: 12px;
	}
}

.player-details {
	padding-left: 12px;
}
</style>
