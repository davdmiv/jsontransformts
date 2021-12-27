// import {
//   CardListJSON,
//   Variation,
//   Nomenclature,
//   Card,
//   Addin,
//   ObjWithReadableParams,
// } from './indexTypes'

const jsonTransform = require('./index')
const testData = require('./test_data/dataForTests')
const fs = require('fs')
const path = require('path')

// Подготовка данных для теста функции iterateNomenclatures()
const iterateNomenclaturesInput = testData.iterateNomenclaturesInput
const iterateNomenclaturesOutput = testData.iterateNomenclaturesOutput
// -------------

// Подготовка данных для теста функции tranformAddinParam()
const tranformAddinParamInput = testData.tranformAddinParamInput
const tranformAddinParamOutput = testData.tranformAddinParamOutput
// -------------

// Подготовка данных для теста функции transformAddin()
const transformAddinInput = testData.transformAddinInput
const transformAddinOutput = testData.transformAddinOutput
// -------------

// Подготовка данных для теста функции getObjFromArrayObjs()
const getObjFromArrayObjsInput = testData.getObjFromArrayObjsInput
const getObjFromArrayObjsOutput = testData.getObjFromArrayObjsOutput
// -------------

// Подготовка данных для теста функции iterateVariations()
const iterateVariationsInput = testData.iterateVariationsInput
const iterateVariationsOutput = testData.iterateVariationsOutput
// -------------

// Подготовка данныз для теста функции transformCardListJSON()
// Загружаем исходный JSON response_1640176879625.json
const sourceFile1 = fs.readFileSync(
  path.resolve(__dirname, `test_data/${testData.urlInputJSON_1}`),
  'utf8'
)

// Загружаем исходный JSON response_1640248376958.json
const sourceFile2 = fs.readFileSync(
  path.resolve(__dirname, `test_data/${testData.urlInputJSON_2}`),
  'utf8'
)

// Загружаем модифицированный JSON response_modified_1640176879625.json
const modifiedFile1 = fs.readFileSync(
  path.resolve(__dirname, `test_data/${testData.urlModifiedJSON_1}`),
  'utf8'
)

// Загружаем модифицированный JSON response_modified_1640248376958.json
const modifiedFile2 = fs.readFileSync(
  path.resolve(__dirname, `test_data/${testData.urlModifiedJSON_2}`),
  'utf8'
)

// Подготавливаем оба файла в виде объекта
const sourceFile1json = JSON.parse(sourceFile1)
const modifiedFile1json = JSON.parse(modifiedFile1)
// Подготавливаем оба файла в виде объекта
const sourceFile2json = JSON.parse(sourceFile2)
const modifiedFile2json = JSON.parse(modifiedFile2)
// -------------

// Подготовка данных для теста функции iterateCards()
// Загружаем модифицированный JSON
const iterateCardsRes = fs.readFileSync(
  path.resolve(__dirname, `test_data/${testData.iterateCardsResultUrl}`),
  'utf8'
)

// Приводим JSON к виду объекта
const iterateCardsResJSON = JSON.parse(iterateCardsRes)
const iterateCardsInput = testData.iterateCardsInput
// -------------

describe('Тест функций jsonTransform', () => {
  describe('Тест функции getObjFromArrayObjs', () => {
    test('Тест getObjFromArrayObjs на []', () => {
      // Запускаем тестируемую функцию на []
      const modifiObj = [].reduce(jsonTransform.getObjFromArrayObjs, {})

      // Сравниваем на эвивалентность
      expect(modifiObj).toEqual({})
    })

    test('Тест getObjFromArrayObjs на подготовленных данных', () => {
      // Запускаем тестируемую функцию на тестовом массиве
      const modifiObj = getObjFromArrayObjsInput.reduce(
        jsonTransform.getObjFromArrayObjs,
        {}
      )

      // Сравниваем на эвивалентность с заранее подготовленным результатом
      expect(modifiObj).toEqual(getObjFromArrayObjsOutput)
    })
  })

  describe('Тест функции tranformAddinParam', () => {
    test('Тест tranformAddinParam на []', () => {
      // Запускаем тестируемую функцию на тестовом массиве
      const modifiParam = [].map(jsonTransform.tranformAddinParam)

      // Сравниваем на эвивалентность с заранее подготовленным результатом
      expect(modifiParam).toEqual([])
    })

    test('Тест tranformAddinParam на подготовленных данных', () => {
      // Запускаем тестируемую функцию на тестовом массиве
      const modifiParam = tranformAddinParamInput.map(
        jsonTransform.tranformAddinParam
      )

      // Сравниваем на эвивалентность с заранее подготовленным результатом
      expect(modifiParam).toEqual(tranformAddinParamOutput)
    })
  })

  describe('Тест функции transformAddin', () => {
    test('Тест transformAddin на []', () => {
      // Запускаем тестируемую функцию на []
      const modifiAddin = [].map(jsonTransform.transformAddin)

      // Сравниваем на эвивалентность с []
      expect(modifiAddin).toEqual([])
    })

    test('Тест transformAddin на подготовленных данных', () => {
      // Запускаем тестируемую функцию на тестовом массиве
      const modifiAddin = transformAddinInput.map(jsonTransform.transformAddin)

      // Сравниваем на эвивалентность с заранее подготовленным результатом
      expect(modifiAddin).toEqual(transformAddinOutput)
    })
  })

  describe('Тест функции iterateVariations', () => {
    test('Тест iterateVariations на массиве без целевых данных', () => {
      let emptyArray = [1, 1, 1]

      // Итерируемся по [1, 1, 1]
      emptyArray.forEach(jsonTransform.iterateVariations)

      // Сравниваем на эвивалентность с заранее подготовленным результатом
      expect(emptyArray).toEqual([1, 1, 1])
    })

    test('Тест iterateVariations на подготовленных данных', () => {
      // Запускаем тестируемую функцию на тестовом массиве
      iterateVariationsInput.forEach(jsonTransform.iterateVariations)

      // Сравниваем на эвивалентность с заранее подготовленным результатом
      expect(iterateVariationsInput).toEqual(iterateVariationsOutput)
    })
  })

  describe('Тест функции iterateNomenclatures', () => {
    test('Тест на iterateNomenclatures на массиве без целевых данных', () => {
      let emptyArray = [1, 1, 1]

      // Итерируемся по [1, 1, 1]
      emptyArray.forEach(jsonTransform.iterateNomenclatures)

      // Сравниваем на эвивалентность с заранее подготовленным результатом
      expect(emptyArray).toEqual([1, 1, 1])
    })

    test('Тест на iterateNomenclatures на подготовленных данных', () => {
      // Итерируемся по подготовленным карточкам с помощью iterateNomenclatures
      iterateNomenclaturesInput.forEach(jsonTransform.iterateNomenclatures)

      // Сравниваем на эвивалентность с заранее подготовленным результатом
      expect(iterateNomenclaturesInput).toEqual(iterateNomenclaturesOutput)
    })
  })

  describe('Тест функции iterateCards', () => {
    test('Тест iterateCards на подготовленных данных', () => {
      // Итерируемся по подготовленным карточкам с помощью iterateCards
      iterateCardsInput.forEach(jsonTransform.iterateCards)

      // Подготавливаем к удомному для сравнения виду
      const cards = iterateCardsInput

      // Сравниваем на эвивалентность с заранее подготовленным результатом
      expect(JSON.stringify({ cards })).toEqual(
        JSON.stringify(iterateCardsResJSON)
      )
    })
  })

  describe('Тест функции transformCardListJSON', () => {
    test('Тест transformCardListJSON на входной {}', () => {
      const res = jsonTransform.transformCardListJSON({})
      expect(res).toEqual({})
    })

    test('Тест transformCardListJSON на данных response_1640248376958.json', () => {
      // Запускаем тестируемую функцию на тестовом JSON объекте
      const testOutputJSON =
        jsonTransform.transformCardListJSON(sourceFile2json)

      // Сравниваем на эквивалентность с заранее подготовленным
      expect(JSON.stringify(testOutputJSON)).toEqual(
        JSON.stringify(modifiedFile2json)
      )
    })

    test('Тест transformCardListJSON на данных response_1640176879625.json', () => {
      // Запускаем тестируемую функцию на тестовом JSON объекте
      const testOutputJSON =
        jsonTransform.transformCardListJSON(sourceFile1json)

      // Сравниваем на эквивалентность с заранее подготовленным
      expect(JSON.stringify(testOutputJSON)).toEqual(
        JSON.stringify(modifiedFile1json)
      )
    })
  })
})
