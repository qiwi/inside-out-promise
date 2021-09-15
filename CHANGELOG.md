## [2.1.4](https://github.com/qiwi/inside-out-promise/compare/v2.1.3...v2.1.4) (2021-09-15)


### Bug Fixes

* **package:** up deps, fix vuls ([34459a0](https://github.com/qiwi/inside-out-promise/commit/34459a09f10e6177286ac08542ba6c3e6a3e8766))

## [2.1.3](https://github.com/qiwi/inside-out-promise/compare/v2.1.2...v2.1.3) (2021-05-09)


### Bug Fixes

* **pkg:** up dev deps, fix vuls ([32601bb](https://github.com/qiwi/inside-out-promise/commit/32601bbc4d7c56d117d9069cc14fb478fa7ae47f))

## [2.1.2](https://github.com/qiwi/inside-out-promise/compare/v2.1.1...v2.1.2) (2020-10-30)


### Performance Improvements

* **package:** up deps, fix vuls ([000b286](https://github.com/qiwi/inside-out-promise/commit/000b286beebdc061ee1f515d45c38e47249f88da))

## [2.1.1](https://github.com/qiwi/inside-out-promise/compare/v2.1.0...v2.1.1) (2020-10-09)


### Performance Improvements

* **package:** up deps ([cae889e](https://github.com/qiwi/inside-out-promise/commit/cae889e4133c05c9b916fa6cbd8c4fb29ab13d6f))

# [2.1.0](https://github.com/qiwi/inside-out-promise/compare/v2.0.0...v2.1.0) (2020-06-19)


### Features

* autobind resolve and reject methods ([1085156](https://github.com/qiwi/inside-out-promise/commit/108515675f531d59fa32ab31e71ab14de69abe9d)), closes [#13](https://github.com/qiwi/inside-out-promise/issues/13)
* let resolve/reject params be optional ([4727d29](https://github.com/qiwi/inside-out-promise/commit/4727d29630db6c20e6ff7856fc2fef892a494e12))

# [2.0.0](https://github.com/qiwi/inside-out-promise/compare/v1.4.3...v2.0.0) (2020-05-16)


### Performance Improvements

* **package:** up deps ([a275af2](https://github.com/qiwi/inside-out-promise/commit/a275af23d9297c773661daad60da063e8d7c3cc9))


### BREAKING CHANGES

* **package:** tslib 2.0 requires TS 3.9+

## [1.4.3](https://github.com/qiwi/inside-out-promise/compare/v1.4.2...v1.4.3) (2019-12-15)


### Performance Improvements

* **package:** up deps & repack ([1cd25d5](https://github.com/qiwi/inside-out-promise/commit/1cd25d5b696f5dc988892b86df46fd931624d3ee))

## [1.4.2](https://github.com/qiwi/inside-out-promise/compare/v1.4.1...v1.4.2) (2019-11-06)


### Bug Fixes

* typing updates & fixes ([4549aa9](https://github.com/qiwi/inside-out-promise/commit/4549aa99f40e4e20a412b53d2212e7748ea86605))
* up deps, fix TS 3.7 typings ([376a145](https://github.com/qiwi/inside-out-promise/commit/376a1454a0e696342197b83c6f00ba155a9b990e))

## [1.4.1](https://github.com/qiwi/inside-out-promise/compare/v1.4.0...v1.4.1) (2019-09-15)


### Bug Fixes

* expose constructor name getters ([ca70b92](https://github.com/qiwi/inside-out-promise/commit/ca70b92))
* make compatible with Promise<T> ([220fb70](https://github.com/qiwi/inside-out-promise/commit/220fb70)), closes [#12](https://github.com/qiwi/inside-out-promise/issues/12)

# [1.4.0](https://github.com/qiwi/inside-out-promise/compare/v1.3.1...v1.4.0) (2019-09-13)


### Features

* assign promise rejection to `reason` field ([2663d11](https://github.com/qiwi/inside-out-promise/commit/2663d11)), closes [#5](https://github.com/qiwi/inside-out-promise/issues/5)

## [1.3.1](https://github.com/qiwi/inside-out-promise/compare/v1.3.0...v1.3.1) (2019-09-09)


### Bug Fixes

* correct value and status resolution for descendant promises ([657289b](https://github.com/qiwi/inside-out-promise/commit/657289b))

# [1.3.0](https://github.com/qiwi/inside-out-promise/compare/v1.2.0...v1.3.0) (2019-09-09)


### Features

* inherit original promise chain ([406dc0c](https://github.com/qiwi/inside-out-promise/commit/406dc0c))

# [1.2.0](https://github.com/qiwi/inside-out-promise/compare/v1.1.0...v1.2.0) (2019-09-08)


### Features

* **factory:** modify proto chain on Promise impl change ([13e79e9](https://github.com/qiwi/inside-out-promise/commit/13e79e9))

# [1.1.0](https://github.com/qiwi/inside-out-promise/compare/v1.0.0...v1.1.0) (2019-09-08)


### Features

* add finally method ([0a174bb](https://github.com/qiwi/inside-out-promise/commit/0a174bb))
* **factory:** add options support ([7d49ef7](https://github.com/qiwi/inside-out-promise/commit/7d49ef7)), closes [#4](https://github.com/qiwi/inside-out-promise/issues/4)
* add aliases for state (status) and result (value) ([b93045b](https://github.com/qiwi/inside-out-promise/commit/b93045b))
* add isResolved method ([fe3ca93](https://github.com/qiwi/inside-out-promise/commit/fe3ca93)), closes [#3](https://github.com/qiwi/inside-out-promise/issues/3) [#2](https://github.com/qiwi/inside-out-promise/issues/2)
* expose promise result as public field ([4481bc3](https://github.com/qiwi/inside-out-promise/commit/4481bc3))

# 1.0.0 (2019-09-07)


### Features

* expose promise state field ([11da9f3](https://github.com/qiwi/inside-out-promise/commit/11da9f3)), closes [#1](https://github.com/qiwi/inside-out-promise/issues/1)
* **factory:** add configurable Promise impl ([a683ce8](https://github.com/qiwi/inside-out-promise/commit/a683ce8))
* return promise ref as a result of resolve, reject invocations ([eafbb83](https://github.com/qiwi/inside-out-promise/commit/eafbb83))
