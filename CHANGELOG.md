# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
