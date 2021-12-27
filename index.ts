import {
  CardListJSON,
  Variation,
  Nomenclature,
  Card,
  Addin,
  ObjWithReadableParams,
} from './indexTypes'

const сardListJSON = {
  /**
   * mapper
   * @param {string | any[] | number} param
   * @returns {string | number}
   */
  // Формирует из значений ключей объекта строку,
  // если ключ один, то возвращает его значение
  tranformAddinParam: function tranformAddinParam(
    param: string | any[] | number
  ): string | number {
    let values = Object.values(param)

    return values && values.length > 1 // много значений
      ? values.join(', ') // собираем их в строку
      : values && values.length === 1 // если одино значение
      ? values[0] // возвращаем его
      : values
  },

  /**
   * mapper
   * @param {Addin} addin
   * @returns {ObjWithReadableParams}
   */
  // Преобразует объект addin меняет ключи type, value, преобразует params
  transformAddin: function transformAddin(addin: Addin): ObjWithReadableParams {
    let value: typeof addin.params
    if (addin.params && addin.params.length !== 0) {
      // Преобраует params
      value = (addin.params as any[]).map(сardListJSON.tranformAddinParam)
    } else {
      value = ''
    }
    return {
      [addin.type]: value && value.length === 1 ? value[0] : value,
    }
  },

  /**
   * reducer
   * @param {ObjWithReadableParams} pre
   * @param {ObjWithReadableParams} cur
   * @returns {ObjWithReadableParams} -- pre со свойствами из cur
   */
  // Формирует один объект из массива объектов
  getObjFromArrayObjs: function getObjFromArrayObjs(
    pre: ObjWithReadableParams,
    cur: ObjWithReadableParams
  ): ObjWithReadableParams {
    for (const [key, val] of Object.entries(cur)) {
      pre[key] = val
    }
    return pre
  },

  /**
   * Итератор по variations
   * @param { Variation } variation
   * @param { number } idx
   * @param { Variation[] } variations
   */
  // Итерируется по вариациям. Приводим addin из variations из массива в объект
  iterateVariations: function iterateVariations(
    variation: Variation,
    idx: number,
    variations: Variation[]
  ): void {
    if (variation.addin && variation.addin.length !== 0) {
      let newAddin = (variation.addin as Addin[]).map(
        сardListJSON.transformAddin
      )

      // Формирует один объект из массива объектов в addin
      variations[idx].addin = newAddin.reduce(
        сardListJSON.getObjFromArrayObjs,
        {}
      )
    }
  },

  /**
   * Итерaтор по массиву nomenclatures
   * @param { Nomenclature } nomenclature
   * @param { number } idx
   * @param { Nomenclature[] } nomenclatures
   */
  // Итерируем номенклатуры и вложенный в них вариации.
  // Приводим addin из nomenclature из массива в объект
  iterateNomenclatures: function iterateNomenclatures(
    nomenclature: Nomenclature,
    idx: number,
    nomenclatures: Nomenclature[]
  ): void {
    if (nomenclature.addin && nomenclature.addin.length !== 0) {
      let newAddin: ObjWithReadableParams[] = (
        nomenclature.addin as Addin[]
      ).map(сardListJSON.transformAddin)

      // Формирует один объект из массива объектов в addin
      nomenclatures[idx].addin = newAddin.reduce(
        сardListJSON.getObjFromArrayObjs,
        {}
      )
    }

    // Если в номенклаторе есть variations
    if (nomenclature.variations && nomenclature.variations.length !== 0) {
      // Вызываем итератор по массиву variations на следующем уровне вложенности
      nomenclature.variations.forEach(сardListJSON.iterateVariations)
    }
  },

  /**
   * Итерaтор по массиву cards
   * @param {Card} card
   * @param {number} idx
   * @param {Card[]} cards
   */
  // Итерируем карточки и вложенный номенклатор.
  // Приводим addin из card из массива в объект
  iterateCards: function iterateCards(
    card: Card,
    idx: number,
    cards: Card[]
  ): void {
    // Если в карточке есть addin и он не пустой
    if (card.addin && card.addin.length !== 0) {
      let newAddin: ObjWithReadableParams[] = (card.addin as Addin[]).map(
        сardListJSON.transformAddin
      )

      // Формирует один объект из массива объектов в addin
      cards[idx].addin = newAddin.reduce(сardListJSON.getObjFromArrayObjs, {})
    }
    // Если в карточке есть nomenclatures и он не пустой
    if (card.nomenclatures && card.nomenclatures.length !== 0) {
      // Вызываем итератор по массиву номенклатур на следующем уровне вложенности
      card.nomenclatures.forEach(сardListJSON.iterateNomenclatures)
    }
  },

  /**
   * Изменяет json из /card/list
   * @param {CardListJSON} json -- json из /card/list
   * @returns {CardListJSON} -- модифицированный json
   */
  // Трансформрует json из /card/list в человекочитаемый вид.
  // Меняет вложенные addin[] в
  //   json.result.cards[]
  //   json.result.cards[].nomenclatures[]
  //   json.result.cards[].nomenclatures[].variations
  transformCardListJSON: function transformCardListJSON(
    json: CardListJSON
  ): CardListJSON {
    if (json.result && json.result.cards && json.result.cards.length !== 0) {
      json.result.cards.forEach(сardListJSON.iterateCards)
    }
    return json
  },
}

module.exports = сardListJSON
