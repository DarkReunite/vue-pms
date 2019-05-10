<template lang="pug">
    v-navigation-drawer(permanent app)
        v-toolbar(flat)
            v-toolbar-side-icon
            v-toolbar-title PMS
        v-list
            template(v-for="item in nav")
                v-list-group(
                    v-if="item.children"
                    :key="item.title"
                    v-model="item.active"
                    :prepend-icon="item.icon"
                )
                    template(v-slot:activator)
                        v-list-tile
                            v-list-tile-content
                                v-list-tile-title {{ item.title}}
                    v-list-tile(
                        v-for="subItem in item.children"
                        :key="subItem.title"
                        @click=""
                        :to="subItem.to"
                    )
                        v-list-tile-action
                            v-icon {{subItem.icon}}
                        v-list-tile-content
                            v-list-tile-title {{ subItem.title}}
                v-list-tile(
                    v-else
                    :key="item.title"
                    :prepend-icon="item.icon"
                    @click=""
                    :to="item.to"
                )
                    v-list-tile-action
                        v-icon {{item.icon}}
                    v-list-tile-content
                        v-list-tile-title {{ item.title}}


</template>

<script>
	import nav from './nav.js';
	export default {
		data() {
			return {
				nav
			};
		}
	};
</script>
