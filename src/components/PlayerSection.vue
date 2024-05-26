<script>
const NEW_PLAYER = {
	id: 0,
	name: '',
	startTime: null,
	endTime: null,
	food: null,
	iceTea: false
};

export default {
	name: 'PlayerSection',

	props: {
		players: {
			type: Array,
			default: () => []
		},

		isAddPlayerDisabled: {
			type: Boolean,
			default: false
		}
	},

	data: () => ({
		rules: {
			required: (value) => !!value || 'Thiếu kìa'
		}
	}),

	computed: {
		previousPlayerTime() {
			const previousPlayer = this.players[this.players.length - 1];
			const { startTime, endTime } = previousPlayer || NEW_PLAYER;
			return { startTime, endTime };
		}
	},

	methods: {
		addPlayer() {
			this.players.push({
				...NEW_PLAYER,
				id: Math.random().toString(16).slice(2),
				...this.previousPlayerTime
			});
		},

		removePlayer(index) {
			this.players.splice(index, 1);
		}
	}
};
</script>

<template>
	<v-sheet class="background--primary pa-0">
		<v-form v-for="(player, index) in players" class="pb-2" :key="player.id">
			<v-container>
				<v-row>
					<v-col cols="12">
						<v-text-field
							v-model="player.name"
							class="text-input-field mb-1"
							:rules="[rules.required]"
							autofocus
							label="Tên người chơi"
							prepend-icon="mdi-account"
							variant="plain"
						>
							<template #append-inner>
								<v-icon
									icon="mdi-close-circle-multiple"
									color="error"
									@click="removePlayer(index)"
								></v-icon>
							</template>
						</v-text-field>

						<v-divider class="mb-2" thickness="2" color="secondary"></v-divider>
					</v-col>

					<v-col cols="5" offset="1">
						<v-text-field
							v-model="player.startTime"
							class="text-input-field"
							:rules="[rules.required]"
							label="Giờ đến"
							prepend-icon="mdi-clock-start"
							type="time"
						></v-text-field>
					</v-col>

					<v-col cols="5">
						<v-text-field
							v-model="player.endTime"
							class="text-input-field"
							:rules="[rules.required]"
							label="Giờ đi"
							prepend-icon="mdi-clock-end"
							type="time"
						></v-text-field>
					</v-col>

					<v-col cols="5" offset="1">
						<v-text-field
							v-model="player.food"
							class="text-input-field text-input-field--right text-right"
							label="Đồ ăn"
							prepend-icon="mdi-food"
							suffix=".000 ₫"
							type="number"
							@focus="$event.target.select()"
						></v-text-field>
					</v-col>

					<v-col cols="5">
						<v-checkbox v-model="player.iceTea" prepend-icon="mdi-beer-outline">
							<template #label>
								<span class="text-no-wrap">Trà đá: {{ player.iceTea ? 'Có' : 'Không' }}</span>
							</template>
						</v-checkbox>
					</v-col>
				</v-row>
			</v-container>
		</v-form>
	</v-sheet>

	<div class="add-new-player py-2 pb-4">
		<v-btn
			:disabled="isAddPlayerDisabled"
			color="primary"
			prepend-icon="mdi-plus"
			variant="text"
			@click="addPlayer"
		>
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
</style>
