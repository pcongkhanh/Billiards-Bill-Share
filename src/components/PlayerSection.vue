<script>
const NEW_PLAYER = {
	id: 0,
	name: '',
	startTime: null,
	endTime: null,
	food: 0,
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
		}
	},

	methods: {
		addPlayer() {
			this.players.push({
				...NEW_PLAYER,
				id: this.players.length + 1
			})
		}
	}
};
</script>

<template>
	<v-app>
		<v-sheet class="player-details-list pb-2">
			<v-form
					v-for="(player, index) in players"
					class="player-details-wrapper mb-6"
					:key="index"
			>
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

				<div class="player-details">
					<v-text-field
							v-model="player.startTime"
							class="text-input-field mb-3"
							:rules="[rules.required]"
							label="Giờ đến"
							prepend-icon="mdi-clock-start"
							type="time"
					></v-text-field>

					<v-text-field
							v-model="player.endTime"
							class="text-input-field mb-3"
							:rules="[rules.required]"
							label="Giờ đi"
							prepend-icon="mdi-clock-end"
							type="time"
					></v-text-field>

					<v-text-field
							v-model="player.food"
							class="text-input-field mb-3"
							label="Đồ ăn"
							prepend-icon="mdi-food"
							suffix="₫"
							type="number"
							@focus="$event.target.select()"
					></v-text-field>

					<v-checkbox
							v-model="player.iceTea"
							:label="`Trà đá: ${player.iceTea ? 'Có' : 'Không'}`"
							prepend-icon="mdi-beer-outline"
					></v-checkbox>
				</div>
			</v-form>
		</v-sheet>

		<div class="add-new-player py-2">
			<v-btn variant="text" color="primary" @click="addPlayer" :disabled="isDisableAddButton">
				<v-icon left>mdi-plus</v-icon>
				Thêm người chơi
			</v-btn>
		</div>
	</v-app>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.add-new-player {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}

.player-details-list {
	padding: 24px;
	background-color: $background-color;
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
