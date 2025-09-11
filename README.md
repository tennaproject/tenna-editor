![Tenna Editor - An unofficial Deltarune Save Editor](/public/banner.svg)

## Motivation

Harsh progression in Chapter 3 motivated me to look for a tool for editing saves.
There is a very popular Spamton Editor out there, which at the time when I wanted to use it, was unavailable. And after it got back online, it didn't have the features I needed.
I decided to work on an alternative that works like a modern web app that doesn't rely on external servers to function.

![Welcome Tab](/public/promo/promo-1.png)

## Features

At this point, I release this app as beta-quality software.
There are already more features than present in Spamton Editor, and there is a lot more to come.
Currently, most of the essential things that you might want to change are present, but there are hundreds of flags that I haven't covered yet.

There are five main tabs:

- Home (basic save options)
- Inventory
- Party
- Light World
- Story
- Recruits

Some of them have their own subtabs.
For example, in the Party tab, each character has their own subtab for managing their stats and equipment.

![Story Tab](/public/promo/promo-2.png)

![Party Tab](/public/promo/promo-3.png)

![Recruits Tab](/public/promo/promo-4.png)

## One Editor To Edit Everything

Tenna Editor automatically detects your save file Chapter when you upload it.
It is currently compatible with all saves from Chapters 1 to 4.

_NOTE: Demo and Console versions are currently unsupported._

All the saves you make are saved in the memory of your browser.
You can use custom names to easily identify and switch between them seamlessly.
Editor adapts to your save, displaying only values and tabs that apply to the current chapter.

![Saves Selector](/public/promo/promo-multiple-saves.png)

## All Inside Your Browser

Tenna Editor operates entirely within your browser. All data processing occurs on your device, ensuring that no information is sent elsewhere.

You can also choose to install Tenna Editor as a Progressive Web App (PWA) on compatible devices and browsers. This allows it to function like a traditional desktop or mobile app, complete with its own shortcut and offline access.

![PWA Window](/public/promo/promo-pwa.png)

## Works Everywhere (almost)

Although primarily designed for widescreen use, Tenna Editor functions well on mobile devices, offering full feature support.

![Tenna Editor on mobile](/public/promo/promo-mobile.png)

## Name And Design

I really enjoyed character of Tenna while playing Chapter 3.
This combined with existance of Spamton Editor caused instant decision to just name it after Tenna as Spamton and Tenna are very related characters that you probably know already.

**You can`t get this from an EGG!**

I put a lot of effort into making the layout look distinct and directly inspired by Tenna's colors. The design went through many iterations. I also tried to incorporate additional design elements inspired by Tenna, such as some yellow accents, but they didn’t quite fit well. I'm not particularly fan of designing user interfaces in general, so I welcome any suggestions!

## Special Thanks

- Toby Fox and whole Team behind Deltarune - for creating the game.
- [Spamton Editor](https://saveeditor.spamton.com) - for being direct inspiration.
- [Flowey's Time Machine](https://crumblingstatue.github.io) - for being another inspiration.
- [Deltarune Wiki][https://deltarune.wiki] - for much useful information that sped up the process of building this project significantly.

## Development

Ensure Node.js >=22.16.0 and npm >=10.9.2. A Node version manager like [nvm](https://github.com/nvm-sh/nvm) can use the version specified in `.nvmrc`.

You can also open the repository in the provided [Dev Container](https://containers.dev/) for a preconfigured environment.

Install dependencies:

```bash
npm install
```

### Running

Start a development server:

```bash
npm run dev
```

### Building

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Contributing

Run linting and formatting before submitting changes:

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

## License

This project is licensed under the zlib License. See the [LICENSE](./LICENSE) file for details.

### DELTARUNE™ Assets Notice

The assets under `src/assets/deltarune/` are from DELTARUNE™ and copyrighted by Toby Fox. They are used under fair use for this non-commercial, transformative project. No endorsement is implied. See [NOTICE.md](src/assets/deltarune/NOTICE.md) for full details.
