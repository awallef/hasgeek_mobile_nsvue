<template>
  <Page class="page" xmlns="http://schemas.nativescript.org/tns.xsd">
    <ActionBar android.systemIcon="ic_menu_back" class="action-bar" :title="appTitle">
      <NavigationButton
          v-if="$isAndroid"
          text="Menu"
          icon="res://ic_menu_white_24dp"
          @tap="$refs.drawer.nativeView.toggleDrawerState()">
      </NavigationButton>
      <ActionItem
          v-else
          text="Menu"
          ios.position="left"
          icon="res://ic_menu"
          @tap="$refs.drawer.nativeView.toggleDrawerState()">
      </ActionItem>
      <ActionItem
          v-show="$isIOS && showBack"
          @tap="goBack"
          ios.position="right"
          text="Back">
      </ActionItem>
    </ActionBar>


    <RadSideDrawer id="drawer" ref="drawer" showOverNavigation="true">
      <StackLayout class="drawer-content" ~drawerContent>
        <NavDrawerHeader @close-drawer="closeDrawer()"></NavDrawerHeader>
        <ListView for="item in topNavItems">
          <v-template>
            <StackLayout @tap="goToPage(item.page)" orientation="horizontal" class="sidedrawer-list-group">
              <Label class="mdi" :text="item.icon | fonticon" ></Label>
              <Label :text="item.text"></Label>
            </StackLayout>
          </v-template>
        </ListView>
      </StackLayout>
      <StackLayout class="main-container" ~mainContent>
        <router-view></router-view>
      </StackLayout>
    </RadSideDrawer>

  </Page>
</template>
<script>
  import NavDrawerHeader from './components/navdrawer/NavDrawerHeader.vue'
  export default {
    components: {NavDrawerHeader},
    data() {return {
      topNavItems: [
        {icon: 'mdi-home', text: 'Home', page: '/home'},
        {icon: 'mdi-calendar-multiselect', text: 'Events', page: '/events'},
        {icon: 'mdi-account-group', text: 'Conferences', page: '/conferences'}
      ]
    }},
    computed: {
      showBack () {
        return (this.$store.state.route.fullPath.split('/').length > 2)
      },
      appTitle() {
        return (this.$store.state.route && this.$store.state.route.meta && this.$store.state.route.meta.title) ||
            'HasGeek'

      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      goToPage(page) {
        this.$router.push(page)
        this.closeDrawer()
      },
      closeDrawer() {
        this.$refs.drawer.nativeView.closeDrawer()
      }
    },
    mounted () {
      // Add shadow to iOS Drawer
      let _drawer = this.$refs.drawer
      if(_drawer.nativeView.ios)  {
        const ios = _drawer.nativeView.ios
        // .. but if the menu is drawn 'above' the hostview, do this:
        ios.defaultSideDrawer.style.shadowMode = 2; // TKSideDrawerShadowMode.SideDrawer;
        // if you have shadowMode = 2, then you can add a little dim to the lower layer to add some depth. Keep it subtle though:
        ios.defaultSideDrawer.style.dimOpacity = 0.12;

        // then tweak the shadow to your liking:
        ios.defaultSideDrawer.style.shadowOpacity = 0.75; // 0-1, higher is darker
        ios.defaultSideDrawer.style.shadowRadius = 5; // higher is more spread

      }
    }
  }
</script>
<style lang="scss">
  @import "styles/hasgeek";
  ActionBar {
    background-color: $hg-purple;
  }
  .drawer-content {
    background-color: white;
    ListView {
      margin-left: -15;
    }
  }
  .sidedrawer-list-group {
    padding: 10;
    padding-left: 30;
    font-size: 16pt;
    color: #555555;
    .mdi {
      padding-right: 20;
    }
  }

</style>
