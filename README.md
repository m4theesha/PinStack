# PinStack

PinStack is a lightweight API for generating dynamic SVG cards from developer and project data.

> [!NOTE]
> Documentation page & Support for more platforms will be added in future updates.

## Examples

GitHub profile API:

![PinStack Profile Demo](https://pinstack.matheesha.workers.dev/github/user/torvalds)

GitHub repository API:

![PinStack Repo Demo](https://pinstack.matheesha.workers.dev/github/repo/m4theesha/pinstack)

## Use cases

### Profile API
The GitHub profile card can be used in portfolio sites to showcase your GitHub statistics

### Repository API
The GitHub repository card be used to pin your work into your GitHub README.md or to showcase your projects in a portfolio site

## Usage

### GitHub Profile API

Replace ```<username>``` with the GitHub username:

```xml
https://pinstack.matheesha.workers.dev/github/user/<username>
```

For example:

```text
https://pinstack.matheesha.workers.dev/github/user/torvalds
```

### Add it to a readme file

```md
![PinStack Profile Demo](https://pinstack.matheesha.workers.dev/github/user/<username>)
```

### Add it to an HTML file

```html
<object
  type="image/svg+xml"
  data="https://pinstack.matheesha.workers.dev/github/user/<username>">
</object>
```

or

```html
<img alt="profile" src="https://pinstack.matheesha.workers.dev/github/user/<username>">
```


### GitHub Repository API

Replace ```<username>``` and ```<repoName>``` with the GitHub username and repository name:

```xml
https://pinstack.matheesha.workers.dev/github/repo/<username>/<repoName>
```

For example:

```text
https://pinstack.matheesha.workers.dev/github/repo/matheesha/pinstack
```

### Add it to a readme file

```md
![PinStack Repo Demo](https://pinstack.matheesha.workers.dev/github/repo/<username>/<repoName>)
```

### Add it to an HTML file

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
