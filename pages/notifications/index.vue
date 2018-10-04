<template>
    <div>
        <div class="main">
            <v-card flat>
                <v-card-title>
                    <h3>Notifications</h3>
                </v-card-title>
                <v-card-text style="height: 80vh; overflow-y: auto;">
                    <v-list three-line>
                        <div v-for="(item, index) in notifications" :key="index">
                            <v-list-tile :to="item.link" :class="item.new ? 'cyan lighten-4': null">
                                <v-list-tile-action>
                                    <img :src="item.tumbnail" style="width: 70px; height: 70px;" />
                                </v-list-tile-action>
                                <v-list-tile-content class="pl-3 pr-3" id="list_content">
                                    {{item.message}}
                                </v-list-tile-content>
                                <v-list-tile-action id="list_content">
                                    <elapsed-time :dateVal="item.dateCreated" />
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider></v-divider>
                        </div>
                    </v-list>
                </v-card-text>
            </v-card>
        </div>
        <footer-comp />
    </div>
</template>

<script>
/* eslint-disable */
import ElapsedTime from '@/components/helpers/elapsedtime'
import FooterComp from '@/components/footer/footercomp'

export default {
    data: () => ({
        notifications: []
    }),
    mounted () {
        this.$store.watch(
            state => {
                this.notifications = state.notifications
            }
        )
    },
    components: {
        'elapsed-time': ElapsedTime,
        'footer-comp': FooterComp
    }
}
</script>


<style scoped>
    .main {
        padding: 20px 20% 20px 20%;
    }
    @media screen and (max-width: 770px) {
        .main {
            padding: 10px 5px 10px 5px;
        }
        #list_content {
            font-size: 12px;
        }
    }
</style>

