# jBox

jBox is a jQuery plugin that makes it easy to create customizable tooltips, modal windows, image galleries and more.

Demo: https://stephanwagner.me/jBox

Docs: https://stephanwagner.me/jBox/documentation


## Tooltips

Create a new instance of jBox Tooltip and attach it to elements:

```javascript
new jBox('Tooltip', {
  attach: '.tooltip'
});
```

Now elements with `class="tooltip"` will open tooltips:

```html
<span class="tooltip" title="My first tooltip">Hover me!</span>
<span class="tooltip" title="My second tooltip">Hover me!</span>
```

## Modal windows

You can set up modal windows the same way as tooltips.
But most of times you'd want more variety, like a title or HTML content:

```javascript
new jBox('Modal', {
  width: 300,
  height: 200,
  attach: '#myModal',
  title: 'My Modal Window',
  content: '<i>Hello there!</i>'
});
```
```html
<div id="myModal">Click me to open a modal window!</div>
```


## Confirm windows

Confirm windows are modal windows which requires the user to confirm a click action on an element.
Give an element the attribute data-confirm to attach it:

```javascript
new jBox('Confirm', {
  confirmButton: 'Do it!',
  cancelButton: 'Nope'
});
```
```html
<div onclick="alert('Yay! You did it!')" data-confirm="Do you really want to do this?">Click me!</div>
<a href="https://stephanwagner.me/jBox" data-confirm="Do you really want to leave this page?">Click me!</a>
```

## Notices

A notice will open automatically and destroy itself after some time:

```javascript
new jBox('Notice', {
 content: 'Hurray! A notice!'
});
```

## Images

To create image windows you only need following few lines:

```javascript
new jBox('Image');
```
```html
<a href="/image-large.jpg" data-jbox-image="gallery1" title="My image"><img src="/image.jpg" alt=""></a>
```

## Learn more

These few examples are very basic.
The jBox library is quite powerful and offers a vast variety of options to customize appearance and behavior.
Learn more in the documentation: https://stephanwagner.me/jBox/documentation
