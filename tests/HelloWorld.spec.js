import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import HelloWorld from "./src/components/HelloWorld.vue";

describe('HelloWorld.vue', () => {
  it('should display header text', () => {
    const msg = 'Hello Vue 3'
    const wrapper = mount(HelloWorld, { props: { msg } })
    expect(wrapper.find('h1').text()).toEqual(msg)
  })
})
