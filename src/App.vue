<template>
  <v-app>
    <v-main>
      <HeaderBar></HeaderBar>
      <PlayerSection></PlayerSection>
    </v-main>
  </v-app>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue';
import PlayerSection from '@/components/PlayerSection.vue';

export default {
  name: 'App',

  components: {
    HeaderBar,
    PlayerSection
  },

  data: () => ({
    //
  }),
}
</script>

<style lang="scss">
  @import "@/styles/main.scss";
</style>
