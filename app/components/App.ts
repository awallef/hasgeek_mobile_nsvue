import Counter from './Counter'
import Vue, {ComponentOptions} from 'vue'
interface AppComponent extends Vue {
  surprise: boolean
}
export default <ComponentOptions<Vue>>{
  data() {
    return {
      surprise: false,
    }
  },
  template: `
    <Page class="page">
      <ActionBar class="action-bar" title="NativeScript-Vue"/>
  
      <StackLayout>
        <Counter />
      
        <Label class="p-20" textWrap=true text="This is a hello world application, tap the button if you dare"/>
      
        <Button class="btn btn-primary" @tap="surprise = !surprise" text="Tap me!"/>
        <Image v-if="surprise" class="m-20" src="~/images/NativeScript-Vue.png"/>
      </StackLayout>
    </Page>
  `,
  components: {
    Counter,
  },
}