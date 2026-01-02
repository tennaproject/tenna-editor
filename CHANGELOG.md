# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
