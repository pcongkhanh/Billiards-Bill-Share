<script>
import HeaderBar from '@/components/HeaderBar.vue';
import PlayerSection from '@/components/PlayerSection.vue';
import PriceRateSection from "@/components/PriceRateSection.vue";
import ResultSection from "@/components/ResultSection.vue";

import moment from 'moment';

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

	mounted() {
		this.players = [
			{
				id: Math.random().toString(16).slice(2),
				startTime: "13:00",
				endTime: "17:15",
				name: 'Khanh'
			},
			{
				id: Math.random().toString(16).slice(2),
				startTime: "15:00",
				endTime: "16:00",
				name: 'Hạnh'
			},
			{
				id: Math.random().toString(16).slice(2),
				startTime: "14:15",
				endTime: "17:15",
				name: 'Chung'
			},
			{
				id: Math.random().toString(16).slice(2),
				startTime: "14:15",
				endTime: "17:15",
				name: 'Linh'
			},
			{
				id: Math.random().toString(16).slice(2),
				startTime: "13:30",
				endTime: "17:15",
				name: 'Trường'
			}
		]
	},

	methods: {
		onCalculate(calculateInfo) {
			const periodPlayTime = this.dividePlayTime();
			console.log(periodPlayTime);
		},

		dividePlayTime() {
			const timeSlots = this.generateTimeSlots(this.players);
			return timeSlots.map(timeSlot => ({...timeSlot, players: this.findPlayersInTime(timeSlot)}));
		},

		generateTimeSlots(timeIntervals) {
			const timeMarks = this.getTimeMarks(timeIntervals);
			const distinctTimeMarks = this.getDistinctTimeMarks(timeMarks);
			const sortedTimeMarks = this.getSortedTimeMarks(distinctTimeMarks);

			return sortedTimeMarks.slice(0, -1).map((start, index) => {
				const end = sortedTimeMarks[index + 1];
				const duration = moment.duration(this.momentValue(end).diff(this.momentValue(start))).asHours();
				return {start, end, duration};
			});
		},

		getTimeMarks(timeIntervals) {
			return timeIntervals.reduce((acc, interval) => {
				return acc.concat([this.momentValue(interval.startTime), this.momentValue(interval.endTime)]);
			}, []);
		},

		getDistinctTimeMarks(timeMarks) {
			return timeMarks.filter((currentMoment, index, arr) =>
				!arr.some((prevMoment, prevIndex) =>
					prevIndex < index && prevMoment.isSame(currentMoment, 'minute')
				)
			);
		},

		getSortedTimeMarks(distinctTimeMarks) {
			return distinctTimeMarks.sort((a, b) => a - b).map(momentTime => moment(momentTime).format("HH:mm"));
		},

		findPlayersInTime(timeSlot) {
			return this.players.filter(player => {
				const playerStartTime = this.momentValue(player.startTime);
				const playerEndTime = this.momentValue(player.endTime);
				const startOfTimeSlot = this.momentValue(timeSlot.start);
				const endOfTimeSlot = this.momentValue(timeSlot.end);
				const isStartSameOfAfter = startOfTimeSlot.isSameOrAfter(playerStartTime);
				const isEndSameOfBefore = endOfTimeSlot.isSameOrBefore(playerEndTime);

				return isStartSameOfAfter && isEndSameOfBefore;
			})
		},

		momentValue(value) {
			return moment(value, "HH:mm");
		}
	}
}
</script>

<template>
	<v-app>
		<v-main>
			<HeaderBar></HeaderBar>
			<PlayerSection :players="players" :is-add-player-disabled="isAnyInvalidPlayer">
			</PlayerSection>
			<PriceRateSection
				v-show="isAnyPlayer"
				:is-any-player-use-ice-tea="isAnyPlayerUseIceTea"
				:is-any-invalid-player="isAnyInvalidPlayer"
				@on-calculate="onCalculate"
			></PriceRateSection>
			<ResultSection :players="players"></ResultSection>
		</v-main>
	</v-app>
</template>

<style lang="scss">
@import "@/styles/main.scss";
</style>
