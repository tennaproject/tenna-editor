# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.0-beta] - 2026-06-22

This is the final feature release before Chapter 5. The Story tabs are now much more usable, accurate, and complete. I apologize for the previous low-quality and often misleading flag descriptions. The basic Chapter 5 data will most likely be added within a few hours of its release.

### Changed

- The flags metadata has been massively refactored to be more accurate and consistent. Thanks [Jacky720](https://github.com/Jacky720) and the contributors of [Flowey's Time Machine fork](https://github.com/Jacky720/FloweysTimeMachine) for providing high-quality source of metadata!
- Refactored Story tabs data to utilize the new flags metadata.
- Updated the Linux save path in the Welcome page. It now points to correct directory, instead of the one for demo version. Thanks [LenNerd42](https://github.com/LenNerd42) for reporting! ([Issue #56](https://github.com/tennaproject/tenna-editor/issues/56))

## [0.8.1-beta] - 2026-06-21

### Added

- Added support for Chapter 4 rhythm game score flags and a dedicated "Rhythm Games" section in the Story tab. Thanks [Ranoru24](https://github.com/Ranoru24) for reporting! ([Issue #55](https://github.com/tennaproject/tenna-editor/issues/55))

### Changed

- Refactored rhythm game flags, updating their names and descriptions for clarity.
- Updated the contributors generation script to dynamically render and sync the contributor list in `README.md`.

### Fixed

- Fixed the Story tab search logic to correctly filter story sections and flag clusters based on the search query. Thanks [Ranoru24](https://github.com/Ranoru24) for reporting! ([Issue #55](https://github.com/tennaproject/tenna-editor/issues/55))
- Fix a mistake in the description for Chapter 4's "Blood stain" flag. Author: [Wryyyong](https://github.com/Wryyyong) ([PR #51](https://github.com/tennaproject/tenna-editor/pull/51)).

## [0.8.0-beta] - 2026-06-20

### Added

- Added experimental Chapter 5 save detection and navigation. Dedicated Chapter 5 data is not mapped yet, so the editor still uses known Chapter 1-4 data where applicable.
- Added undo and redo for save edits.
- Added a change summary to the download dialog, comparing the current save with the last uploaded or downloaded version.
- Added search to Story chapter pages.
- Added party portraits to the party overview and character pages.

### Changed

- Reworked several common UI components and dialogs.
- Reorganized Story tabs into smaller sections and clusters.
- Updated Story flag metadata for older chapters. This is still beta-quality and may need corrections based on community feedback.
- Improved filtering and option generation for editor fields.
- Updated dependencies and deploy configuration.

### Fixed

- Corrected the Ralsei room visit Story flag mapping. Author: [MiaouKING](https://github.com/MiaouKING) ([PR #33](https://github.com/tennaproject/tenna-editor/pull/33)).
- Windows save path handling now uses a path variable for better portability. Author: [soulware1](https://github.com/soulware1).
- Dropdowns now render `Empty` in grey. Author: [Araraura](https://github.com/Araraura).
- Added missing White Ribbon armor to Ralsei. Thanks [Anonymously599](https://github.com/Anonymously599) for reporting! ([Issue #36](https://github.com/tennaproject/tenna-editor/issues/36))
- Added missing Glass Light World item to Chapter 1. Thanks [Anonymously599](https://github.com/Anonymously599) for reporting! ([Issue #36](https://github.com/tennaproject/tenna-editor/issues/36))

## [0.7.11-beta] - 2026-05-23

### Added

- Added flags per page control to the Flags editor. Author: [Araraura](https://github.com/Araraura) ([PR #26](https://github.com/tennaproject/tenna-editor/pull/26))

### Fixed

- Improved accessibility across form controls and dialogs.
- Added additional mitigations against LastPass autofill issues.
- Corrected the King Defeated flag. Author: [afreetoplaynoob](https://github.com/afreetoplaynoob) ([PR #22](https://github.com/tennaproject/tenna-editor/pull/22))

## [0.7.10-beta] - 2026-02-02

### Added

- Added new Flags editing page for advanced users. This allows direct editing of individual flags in the save file.

### Fixed

- Empty armor doesn't show as "Invalid" on Kris anymore. Author: [boopboy](https://github.com/afreetoplaynoob) ([PR #20](https://github.com/tennaproject/tenna-editor/pull/20))

## [0.7.9-beta] - 2026-01-15

### Fixed

- Link to Flowey's Time Machine in About tab is now correct. Author: [Matojeje](https://github.com/Matojeje) ([PR #18](https://github.com/tennaproject/tenna-editor/pull/18))
- Linux path for save files is now correct. Paths now can be copied easily. Author: [KrisGra](https://github.com/krisgrant) ([PR #19](https://github.com/tennaproject/tenna-editor/pull/19))

## [0.7.8-beta] - 2026-01-03

### Fixed

- Fixed 'nan' value handling for weapon style in legacy demo save files. Thanks [Zakarith](https://github.com/Zakarith) for reporting! ([Issue #16](https://github.com/tennaproject/tenna-editor/issues/16))
- Fixed serialization of number fields, now they correctly use scientific notation when needed. Thanks [Zakarith](https://github.com/Zakarith) for reporting! ([Issue #15](https://github.com/tennaproject/tenna-editor/issues/15))
- Added missing Vessel legs variant. Thanks [Zakarith](https://github.com/Zakarith) for reporting! ([Issue #15](https://github.com/tennaproject/tenna-editor/issues/15))

## [0.7.7-beta] - 2025-12-31

### Fixed

- Save parser now handles save files with unexpected trailing newlines or null values. Thanks [Zakarith](https://github.com/Zakarith) and many more from Steam Tutorial Page for reporting! ([Issue #14](https://github.com/tennaproject/tenna-editor/issues/14))
- Save parsing errors now display detailed error messages to help identify the issue.

## [0.7.6-beta] - 2025-11-29

### Fixed

- Fixed vessel color option "Yellow" to correctly display "Cyan". Thanks [titen96](https://github.com/titen96) for reporting! ([Issue #12](https://github.com/tennaproject/tenna-editor/issues/12))
- Fixed "Berdly's Arm Broken" flag to correctly display the value. Thanks [ǝɹǝɥǝǝsoʇƃuᴉɥʇou](https://steamcommunity.com/profiles/76561199786538394) for reporting!

## [0.7.5-beta] - 2025-10-15

### Fixed

- Vessel (Goner) values are now correctly applied. Thanks [sam gaming](https://steamcommunity.com/id/samgaming2008) and [Dawn](https://steamcommunity.com/id/BreezeOfDawn) for reporting!

## [0.7.4-beta] - 2025-10-02

### Added

- Now by default only rooms with save point are shown as options. There is a toggle to show all rooms.

### Changed

- Stats limit was increased from 999 to 9999.

### Fixed

- Chapter 4 save files are now correctly handled. Thanks [XtronXI](https://github.com/XtronXI) for reporting! ([Issue #11](https://github.com/tennaproject/tenna-editor/issues/11))

## [0.7.3-beta] - 2025-09-21

### Fixed

- Chapter selector is now working correctly. Thanks [XtronXI](https://github.com/XtronXI) for reporting! ([Issue #6](https://github.com/tennaproject/tenna-editor/issues/6))
- Saves do not re-add themselves after being deleted anymore. Thanks [XtronXI](https://github.com/XtronXI) for reporting! ([Issue #6](https://github.com/tennaproject/tenna-editor/issues/6))

## [0.7.2-beta] - 2025-09-21

### Added

- Reduced motion setting is now respected across the app.
- Missing rooms in Chapter 4 were added.

## [0.7.1-beta] - 2025-09-19

### Added

- Better support for search engines for SEO purposes.

### Fixed

- When route in URL is invalid, it now redirects to the Home page instead of showing a blank page.
- Removed unnecessary assets being included in the build.

## [0.7.0-beta] - 2025-09-18

### Added

- Changelog page was added to the About tab.
- Demo save files are now considered supported.
- New version notification was added.
- Added 10 new flags to Chapter 4.

### Changed

- Internal save structure was refactored to be more maintainable and reliable.
- Many components were refactored to simplify the code.
- Codebase was cleaned up, and some dead code was removed.
- Toast component was improved with better styling and formatting.
- "Gave Tenna away" flag was incorrect and was replaced with "Talked with Mettaton about Tenna" flag which is the correct one.

### Fixed

- Home icon on sidebar is now highlighted while being on the Welcome page.
- Changing from the Overview to the Welcome page is no longer causing reload of the whole content.
- There are no 3 "Talked to Burgerpants" labeled flags in Chapter 1 anymore. Thanks [XtronXI](https://github.com/XtronXI) and [ticktockdoomapproaches](https://steamcommunity.com/profiles/76561199782178857) for reporting! ([Issue #6](https://github.com/tennaproject/tenna-editor/issues/6))
- Replaced duplicate "Carnival Gift Recipient" flag with "Weirdroute Progress" flag in Chapter 2. Thanks [XtronXI](https://github.com/XtronXI) for reporting! ([Issue #6](https://github.com/tennaproject/tenna-editor/issues/6))
