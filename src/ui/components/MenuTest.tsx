"use client";
import { Menu } from "@headlessui/react";

export default function MenuTest() {
  return (
    <Menu as="div">
      <Menu.Button>Click Me</Menu.Button>
      <Menu.Items>
        <Menu.Item>{() => <button>Item 1</button>}</Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
