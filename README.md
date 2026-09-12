# PinStack

This is a API to generate a svg card for your Github repositories that you can embed in your readme files of websites.

> [!NOTE]
> Github profile card and support for more platforms will be added in future updates

Below is a example of this API:

![PinStack Repo](https://pinstack.matheesha.workers.dev/github/repo/m4theesha/pinstack)

## Usage

### Api

Replace ```<username>``` and ```<repoName>``` with the Github username and repository name:

```xml
https://pinstack.matheesha.workers.dev/github/repo/<username>/<repoName>
```

For example:

```text
https://pinstack.matheesha.workers.dev/github/repo/matheesha/pinstack
```

### Add it to a readme file

```md
![PinStack Repo](https://pinstack.matheesha.workers.dev/github/repo/<username>/<repoName>)
```

### Add it to a html file

```html
<object
  type="image/svg+xml"
  data="https://pinstack.matheesha.workers.dev/github/repo/<username>/<repoName>">
</object>
```

or

```html
<img alt="repo" src="https://pinstack.matheesha.workers.dev/github/repo/<username>/<repoName>">
```
