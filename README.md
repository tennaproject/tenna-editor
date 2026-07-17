![Tenna Editor - An unofficial DELTARUNE Save Editor](/docs/images/banner.svg)

## Motivation

Harsh progression in Chapter 3 motivated me to look for a tool for editing saves.
There is a very popular Spamton Editor out there, which at the time when I wanted to use it, was unavailable. And after it got back online, it didn't have the features I needed.
I decided to work on an alternative that works like a modern web app that doesn't rely on external servers to function.

![Welcome Tab](/docs/images/promo-1.png)

## Features

Tenna Editor is a browser-based save editor for DELTARUNE.
It covers the main save data for Chapters 1-4, including inventory, party stats, equipment, Light World data, recruits, rooms, plot progress, and many story flags.
Some flag metadata is still incomplete and may change as it gets verified.

The main editor tabs are:

- Home (basic save options)
- Inventory
- Party
- Light World
- Story
- Recruits
- Flags (advanced flag editor)

Some of them have their own subtabs.
For example, in the Party tab, each character has their own subtab for managing their stats and equipment.

![Story Tab](/docs/images/promo-2.png)

![Party Tab](/docs/images/promo-3.png)

![Recruits Tab](/docs/images/promo-4.png)

## One Editor To Edit Everything

Tenna Editor automatically detects your save file Chapter when you upload it.
It is currently compatible with saves from Chapters 1 to 5.
Chapter 5 support includes editor data for the currently mapped weapons, armors, items, rooms, and other fields.
Dedicated Chapter 5 flags and plot points are not mapped yet.

_NOTE: Console versions are currently unsupported._

All the saves you make are saved in the memory of your browser.
You can use custom names to easily identify and switch between them seamlessly.
Editor adapts to your save, displaying only values and tabs that apply to the current chapter.
Settings also include backup and restore options for exporting or importing editor-managed saves.

![Saves Selector](/docs/images/promo-multiple-saves.png)

## All Inside Your Browser

Tenna Editor operates entirely within your browser. All data processing occurs on your device, ensuring that no information is sent elsewhere.

You can also choose to install Tenna Editor as a Progressive Web App (PWA) on compatible devices and browsers. This allows it to function like a traditional desktop or mobile app, complete with its own shortcut and offline access.

![PWA Window](/docs/images/promo-pwa.png)

## Works Everywhere (almost)

Although primarily designed for widescreen use, Tenna Editor functions well on mobile devices, offering full feature support.

![Tenna Editor on mobile](/docs/images/promo-mobile.png)

## Name And Design

I really enjoyed character of Tenna while playing Chapter 3.
This combined with existance of Spamton Editor caused instant decision to just name it after Tenna as Spamton and Tenna are very related characters that you probably know already.

**You can`t get this from an EGG!**

I put a lot of effort into making the layout look distinct and directly inspired by Tenna's colors. The design went through many iterations. I also tried to incorporate additional design elements inspired by Tenna, such as some yellow accents, but they didn’t quite fit well. I'm not particularly fan of designing user interfaces in general, so I welcome any suggestions!

## Special Thanks

- Toby Fox and whole Team behind DELTARUNE - for creating the game.
- [Spamton Editor](https://saveeditor.spamton.com) - for being direct inspiration.
- [Flowey's Time Machine](https://crumblingstatue.github.io) - for being another inspiration.
- [Jacky720's "Flowey's Time Machine" fork](https://github.com/Jacky720/FloweysTimeMachine/tree/deltarune) - for save data research and references that helped with a lot of Tenna Editor's data mapping.
- [DELTARUNE Wiki](https://deltarune.wiki) - for much useful information that sped up the process of building this project significantly.
- [Undertale Mod Tool](https://github.com/UnderminersTeam/UndertaleModTool) - for allowing me to mine through the game code and assets to understand how things work.

## Contributors

- [@afreetoplaynoob](https://github.com/afreetoplaynoob)
- [@Araraura](https://github.com/Araraura)
- [@jjezewski](https://github.com/jjezewski) - creator & maintainer
- [@krisgrant](https://github.com/krisgrant)
- [@Matojeje](https://github.com/Matojeje)
- [@MiaouKING](https://github.com/MiaouKING)
- [@newhajinyoon](https://github.com/newhajinyoon)
- [@soulware1](https://github.com/soulware1)
- [@wryyyong](https://github.com/wryyyong)
- [@xanderrock98](https://github.com/xanderrock98)

## Development

The project uses [Bun](https://bun.sh/) for dependency management, package scripts, and its JavaScript runtime.

> [!WARNING]
> Node.js/npm is not supported. It may currently work in some cases, but the
> project does not provide an npm lockfile or test Node-based workflows.

You can also open the repository in the provided [Dev Container](https://containers.dev/) for a preconfigured environment.

Install dependencies:

```bash
bun install --frozen-lockfile
```

### Running

Start a development server:

```bash
bun run dev
```

### Building

Create a production build:

```bash
bun run build
```

Preview the production build locally:

```bash
bun run preview
```

### Contributing

Run linting and formatting before submitting changes:

```bash
bun run check
```

## License

This project is licensed under the zlib License. See the [LICENSE](./LICENSE) file for details.

### Name And Branding Notice

The "Tenna Editor" name, logo, and branding assets are **not** covered by the zlib License and may not be used to brand other instances or derivatives of this project. If you fork or rehost this project, use your own name and branding. See [BRANDING.md](./BRANDING.md) for details.

### DELTARUNE™ Assets Notice

The assets under `src/assets/deltarune/` are from DELTARUNE™ and copyrighted by Toby Fox. They are used under fair use for this non-commercial, transformative project. No endorsement is implied. See [NOTICE.md](src/assets/deltarune/NOTICE.md) for full details.
