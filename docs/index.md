---
title: Wavevision Uploader
---

# Docs

<hr>

- [Installation](#installation)
- [Usage](#usage)
  - [Standard](#standard)
  - [React](#react)
- [Customization](#customization)
  - [Custom messages](#custom-messages)

## Installation

Via [Yarn](https://yarnpkg.com)

```bash
yarn add @wavevision/uploader
```

or [npm](https://npmjs.com)

```bash
npm install --save @wavevision/uploader
```

## Usage

There are a few ways you can integrate the uploader into your project.

### Standard

The most common way is to import the uploader initializer into your project's assets
and use it as follows:

```typescript
import WavevisionUploader from '@wavevision/uploader';

document.addEventListener('DOMContentLoaded', () =>
  WavevisionUploader.init(options),
);
```

The `init` function `options` argument is an object with these properties:

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>link</code>
</td>
<td>
<code>object</code>
</td>
<td>
Properties:
<ul>
<li><code>url: string</code> – your application upload endpoint</li>
<li><code>parameter?: string</code> – optional name of a <code>POST</code> request parameter which holds an uploaded file <em>(default <code>file</code>)</em></li>
</ul>
</td>
</tr>
<tr>
<td><code>messages</code></td>
<td><code>Messages | undefined</code></td>
<td>See <a href="#custom-messages">Custom messages</a> for more info</td>
</tr>
</tbody>
</table>

### React

## Customization

### Custom messages
