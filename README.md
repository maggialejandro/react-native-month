# React Native Month 📆

![BuildStatus](https://github.com/maggialejandro/react-native-month/actions/workflows/lint.yml/badge.svg) [![NPM version](https://img.shields.io/npm/v/react-native-month.svg)](https://www.npmjs.com/package/react-native-month) [![npm](https://img.shields.io/npm/dm/react-native-month.svg)](https://github.com/maggialejandro/react-native-month) [![CodeFactor](https://www.codefactor.io/repository/github/maggialejandro/react-native-month/badge)](https://www.codefactor.io/repository/github/maggialejandro/react-native-month) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/832690f286a5451cacdae664d63be3b9)](https://www.codacy.com/app/maggialejandro/react-native-month?utm_source=github.com&utm_medium=referral&utm_content=maggialejandro/react-native-month&utm_campaign=Badge_Grade)

<p align="center">
  <img alt="Screenshot" src="https://github.com/maggialejandro/react-native-month/blob/master/month.png?raw=true" width="400" />
</p>

## Installation

```console
npm install react-native-month --save
```

Using yarn

```console
yarn add react-native-month
```

## Usage

## API

| Prop                    | Description                            | Required?              | Default | Type             |
| ----------------------- | -------------------------------------- | ---------------------- | ------- | ---------------- |
| **`onPress`**           | Callback called when a day is pressed. | yes                    |         | Function         |
| **`minDate`**           | Minimum date that can be selected.     | no                     | null    | Date             |
| **`maxDate`**           | Maximum date that can be selected.     | no                     | null    | Date             |
| **`startDate`**         | Selected start date                    | no                     | null    | Date             |
| **`endDate`**           | Selected end date                      | requires _startDate_   | null    | Date             |
| **`theme`**             | Calendar StyleSheet                    | no                     | null    | ThemeType        |
| **`locale`**            | Calendar language                      | es, en, fr, br, zh, ru | 'en'    | LocaleType       |
| **`showWeekdays`**      | Show Week columns                      | no                     | true    | boolean          |
| **`firstDayMonday`**    | Monday as first day of the week        | no                     | false   | boolean          |
| **`monthHeight`**       | Change Month row height                | no                     | 370     | number           |
| **`disabledDays`**      | Disabled days                          | no                     | null    | {[string]: any } |
| **`renderDayContent`**  | Render custom Day content              | no                     | null    | Function         |
| **`disableOffsetDays`** | Remove offset Days.                    | no                     | false   | boolean          |

## License

MIT
