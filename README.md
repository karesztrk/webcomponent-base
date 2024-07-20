# Web Component

My own Base class for all my Web Components. There are two versions: light and shadow.

## How to use

### Light component

Use if you want to encapsulate your logic within a special section of the HTML document.

```js
class YourComponent extends LightElement {
  static {
    this.register("your-component", YourComponent);
  }

  render() {
    // Regular DOM manipulation here here 😐
  }
}
```

### Shadow component

Useful if you want to encapsulate and completely detach your logic from the document. Neither the cascade, nor any other component will access it.

```js
class YourComponent extends ShadowElement {
  static {
    this.register("your-component", YourComponent);
  }

  render() {
    return "<div>👋 from the Shadow DOM</div>";
  }
}
```

## References

- https://developer.mozilla.org/en-US/docs/Web/API/Web_components
