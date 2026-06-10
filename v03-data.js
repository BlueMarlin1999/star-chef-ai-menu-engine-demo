window.__STAR_CHEF_V03_DATA__ = {
  "version": "v0.3",
  "generatedAt": "2026-06-10T11:06:20.995Z",
  "project": {
    "projectName": "华住",
    "region": "上海江桥",
    "week": "2026-06-01 至 2026-06-07",
    "source": "华住周菜单 + 微信价格截图 + 星厨成本卡"
  },
  "sourceSummary": {
    "weeklyMenuRecords": 234,
    "weeklyUniqueDishes": 103,
    "screenshotPriceRecords": 188,
    "screenshotUniqueItems": 148,
    "exactCostCardMatches": 11,
    "exactPriceMatches": 23,
    "calcReadyUniqueItems": 0,
    "priceConflictItems": 1,
    "priceOnlyItems": 125,
    "costCoverageRate": 0.10679611650485436,
    "priceCoverageRate": 0.22330097087378642,
    "calcReadyRate": 0
  },
  "assumptions": {
    "bigMeatPortions": 70,
    "smallMeatPortions": 55,
    "vegPortions": 85,
    "noodlePortions": 45,
    "specialtyPortions": 35,
    "dessertPortions": 60,
    "dinnerBigMeatPortions": 38,
    "dinnerSmallMeatPortions": 32,
    "dinnerVegPortions": 45,
    "bigMeatCostRate": 0.38,
    "smallMeatCostRate": 0.34,
    "vegCostRate": 0.28,
    "noodleCostRate": 0.36,
    "specialtyCostRate": 0.42,
    "dessertCostRate": 0.3,
    "freeRicePortions": 420,
    "freeRiceCostPerPortion": 0.65,
    "freeSoupPortions": 420,
    "freeSoupCostPerPortion": 0.25
  },
  "lines": [
    {
      "id": "L-M-01",
      "dishName": "红烧牛肉拉面",
      "meal": "午餐",
      "stall": "面档",
      "category": "面档",
      "windows": [],
      "windowAppearances": 0,
      "salePrice": 26,
      "portionCost": 0,
      "dataStatus": "售价+成本已齐",
      "defaultPortionsKey": "noodlePortions",
      "sourceNote": "周菜单 2026-06-03；价格截图 批次1-图3",
      "recommendedAction": "建立标准菜名映射或新增成本卡",
      "note": ""
    },
    {
      "id": "L-M-02",
      "dishName": "雪菜肉丝面",
      "meal": "午餐",
      "stall": "面档",
      "category": "面档",
      "windows": [],
      "windowAppearances": 0,
      "salePrice": 12,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "noodlePortions",
      "sourceNote": "价格截图 批次1-图4、批次1-图6",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": ""
    },
    {
      "id": "L-M-03",
      "dishName": "红烧大排面",
      "meal": "午餐",
      "stall": "面档",
      "category": "面档",
      "windows": [],
      "windowAppearances": 0,
      "salePrice": 15,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "noodlePortions",
      "sourceNote": "价格截图 批次1-图4、批次1-图6",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": ""
    },
    {
      "id": "L-S-01",
      "dishName": "隆江猪脚饭",
      "meal": "午餐",
      "stall": "特色档",
      "category": "特色",
      "windows": [],
      "windowAppearances": 0,
      "salePrice": 25,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "specialtyPortions",
      "sourceNote": "价格截图 批次2-图6",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": ""
    },
    {
      "id": "L-S-02",
      "dishName": "香辣小龙虾",
      "meal": "午餐",
      "stall": "特色档",
      "category": "特色",
      "windows": [],
      "windowAppearances": 0,
      "salePrice": 28,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "specialtyPortions",
      "sourceNote": "价格截图 批次1-图3",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": ""
    },
    {
      "id": "L-B-01",
      "dishName": "黄焖大骨",
      "meal": "午餐",
      "stall": "炒菜菜池",
      "category": "大荤",
      "windows": [
        "炒菜1"
      ],
      "windowAppearances": 1,
      "salePrice": 13,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "bigMeatPortions",
      "sourceNote": "价格截图 批次1-图2",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": "菜池采购，不按窗口重复"
    },
    {
      "id": "L-B-02",
      "dishName": "红烧狮子头",
      "meal": "午餐",
      "stall": "炒菜菜池",
      "category": "大荤",
      "windows": [
        "炒菜1",
        "炒菜2"
      ],
      "windowAppearances": 2,
      "salePrice": 8,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "bigMeatPortions",
      "sourceNote": "价格截图 批次1-图2",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": "出现2个窗口，采购仍按菜池口径"
    },
    {
      "id": "L-B-03",
      "dishName": "毛豆香菇炖鸡",
      "meal": "午餐",
      "stall": "炒菜菜池",
      "category": "大荤",
      "windows": [
        "炒菜1",
        "炒菜2",
        "炒菜3"
      ],
      "windowAppearances": 3,
      "salePrice": 10,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "bigMeatPortions",
      "sourceNote": "价格截图 批次1-图2",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": "出现3个窗口，不能乘以3采购"
    },
    {
      "id": "L-B-04",
      "dishName": "盐水基围虾",
      "meal": "午餐",
      "stall": "炒菜菜池",
      "category": "大荤",
      "windows": [
        "炒菜2",
        "炒菜3"
      ],
      "windowAppearances": 2,
      "salePrice": 12,
      "portionCost": 0,
      "dataStatus": "售价+成本已齐",
      "defaultPortionsKey": "bigMeatPortions",
      "sourceNote": "周菜单 2026-06-01；价格截图 批次1-图2",
      "recommendedAction": "建立标准菜名映射或新增成本卡",
      "note": "出现2个窗口，采购仍按菜池口径"
    },
    {
      "id": "L-B-05",
      "dishName": "辣椒炒肉",
      "meal": "午餐",
      "stall": "炒菜菜池",
      "category": "大荤",
      "windows": [
        "炒菜3"
      ],
      "windowAppearances": 1,
      "salePrice": 10,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "bigMeatPortions",
      "sourceNote": "价格截图 批次1-图2",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": ""
    },
    {
      "id": "L-SM-01",
      "dishName": "葱油鸡蛋糕",
      "meal": "午餐",
      "stall": "炒菜菜池",
      "category": "小荤",
      "windows": [
        "炒菜1"
      ],
      "windowAppearances": 1,
      "salePrice": 5,
      "portionCost": 0,
      "dataStatus": "售价+成本已齐",
      "defaultPortionsKey": "smallMeatPortions",
      "sourceNote": "周菜单 2026-06-01；价格截图 批次1-图2、批次2-图8",
      "recommendedAction": "建立标准菜名映射或新增成本卡",
      "note": ""
    },
    {
      "id": "L-SM-02",
      "dishName": "鱼香肉丝",
      "meal": "午餐",
      "stall": "炒菜菜池",
      "category": "小荤",
      "windows": [
        "炒菜2"
      ],
      "windowAppearances": 1,
      "salePrice": 6,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "smallMeatPortions",
      "sourceNote": "价格截图 批次1-图2、批次2-图1",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": ""
    },
    {
      "id": "L-V-01",
      "dishName": "黄瓜拌腐竹",
      "meal": "午餐",
      "stall": "炒菜菜池",
      "category": "素菜",
      "windows": [
        "炒菜1"
      ],
      "windowAppearances": 1,
      "salePrice": 3,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "vegPortions",
      "sourceNote": "价格截图 批次1-图2、批次2-图4",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": ""
    },
    {
      "id": "L-V-02",
      "dishName": "清炒空心菜",
      "meal": "午餐",
      "stall": "炒菜菜池",
      "category": "素菜",
      "windows": [
        "炒菜3"
      ],
      "windowAppearances": 1,
      "salePrice": 3,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "vegPortions",
      "sourceNote": "价格截图 批次1-图2、批次2-图1",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": ""
    },
    {
      "id": "L-D-01",
      "dishName": "酒酿圆子",
      "meal": "午餐",
      "stall": "甜品",
      "category": "甜品",
      "windows": [],
      "windowAppearances": 0,
      "salePrice": 3,
      "portionCost": 0,
      "dataStatus": "售价+成本已齐",
      "defaultPortionsKey": "dessertPortions",
      "sourceNote": "周菜单 2026-06-02、2026-06-03；价格截图 批次1-图8、批次2-图9",
      "recommendedAction": "建立标准菜名映射或新增成本卡",
      "note": "甜品单独售卖，不并入免费汤"
    },
    {
      "id": "D-B-01",
      "dishName": "剁椒龙利鱼",
      "meal": "晚餐",
      "stall": "炒菜1",
      "category": "大荤",
      "windows": [
        "炒菜1"
      ],
      "windowAppearances": 1,
      "salePrice": 10,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "dinnerBigMeatPortions",
      "sourceNote": "价格截图 批次1-图1",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": ""
    },
    {
      "id": "D-B-02",
      "dishName": "沙茶土豆牛腩",
      "meal": "晚餐",
      "stall": "炒菜1",
      "category": "大荤",
      "windows": [
        "炒菜1"
      ],
      "windowAppearances": 1,
      "salePrice": 15,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "dinnerBigMeatPortions",
      "sourceNote": "价格截图 批次1-图1",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": ""
    },
    {
      "id": "D-B-03",
      "dishName": "椒盐排条",
      "meal": "晚餐",
      "stall": "炒菜1",
      "category": "大荤",
      "windows": [
        "炒菜1"
      ],
      "windowAppearances": 1,
      "salePrice": 12,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "dinnerBigMeatPortions",
      "sourceNote": "价格截图 批次1-图1、批次1-图11",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": ""
    },
    {
      "id": "D-SM-01",
      "dishName": "芹菜香干炒肉",
      "meal": "晚餐",
      "stall": "炒菜1",
      "category": "小荤",
      "windows": [
        "炒菜1"
      ],
      "windowAppearances": 1,
      "salePrice": 6,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "dinnerSmallMeatPortions",
      "sourceNote": "价格截图 批次1-图1",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": ""
    },
    {
      "id": "D-V-01",
      "dishName": "手撕包菜",
      "meal": "晚餐",
      "stall": "炒菜1",
      "category": "素菜",
      "windows": [
        "炒菜1"
      ],
      "windowAppearances": 1,
      "salePrice": 3,
      "portionCost": null,
      "dataStatus": "仅有截图售价",
      "defaultPortionsKey": "dinnerVegPortions",
      "sourceNote": "价格截图 批次1-图1",
      "recommendedAction": "补成本卡、克重、SOP 或确认本周是否启用",
      "note": ""
    },
    {
      "id": "D-V-02",
      "dishName": "清炒油麦菜",
      "meal": "晚餐",
      "stall": "炒菜1",
      "category": "素菜",
      "windows": [
        "炒菜1"
      ],
      "windowAppearances": 1,
      "salePrice": 3,
      "portionCost": 0,
      "dataStatus": "售价+成本已齐",
      "defaultPortionsKey": "dinnerVegPortions",
      "sourceNote": "周菜单 2026-06-02；价格截图 批次1-图1、批次2-图7、批次2-图9",
      "recommendedAction": "建立标准菜名映射或新增成本卡",
      "note": ""
    }
  ],
  "breakfastCostExamples": [
    {
      "dishName": "南瓜发糕",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "南瓜杂粮小面包",
      "appearances": 2,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "卷饼",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "原味豆浆",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "咸/甜/豆花",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "大/小混沌",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "拌面",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "梅干菜包",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    }
  ],
  "exactCostExamples": [
    {
      "dishName": "三杯鸡",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 2.656845,
      "priceStatus": "缺售价",
      "recommendedAction": "补华住售卖价或餐标规则"
    },
    {
      "dishName": "剁椒娃娃菜",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "剁椒琵琶腿",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "剁椒花鲢鱼头",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "北海道燕麦牛乳",
      "mealPeriods": "下午茶",
      "categories": "饮品",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "南瓜发糕",
      "mealPeriods": "早餐",
      "categories": "包子类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "南瓜杂粮小面包",
      "mealPeriods": "早餐",
      "categories": "特色类",
      "appearances": 2,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "卷饼",
      "mealPeriods": "早餐",
      "categories": "特色类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "原味豆浆",
      "mealPeriods": "早餐",
      "categories": "粥类/饮品",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "咖喱牛腩",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "咸/甜/豆花",
      "mealPeriods": "早餐",
      "categories": "粥类/饮品",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "咸菜肉沫炒饭",
      "mealPeriods": "午餐",
      "categories": "主食",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "啤酒鸭",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "地三鲜",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "大/小混沌",
      "mealPeriods": "早餐",
      "categories": "粥类/饮品",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "大红袍啵啵奶茶",
      "mealPeriods": "下午茶",
      "categories": "饮品",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "孜然鸡腿",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "家常回锅肉",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "小炒攸县香干",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 2.5339,
      "priceStatus": "缺售价",
      "recommendedAction": "补华住售卖价或餐标规则"
    },
    {
      "dishName": "小酥肉",
      "mealPeriods": "下午茶",
      "categories": "油炸类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "尖椒小炒肉",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "山药木耳",
      "mealPeriods": "午餐",
      "categories": "特色面档",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "干豆角烧肉",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "干锅千叶豆腐",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "干锅花菜",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "拌面",
      "mealPeriods": "早餐",
      "categories": "粥类/饮品",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "排骨炖土豆",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "无骨鸡柳",
      "mealPeriods": "下午茶",
      "categories": "油炸类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "梅干菜包",
      "mealPeriods": "早餐",
      "categories": "包子类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "梅菜扣肉",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "汤面",
      "mealPeriods": "早餐",
      "categories": "粥类/饮品",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "油条",
      "mealPeriods": "早餐",
      "categories": "油炸类",
      "appearances": 5,
      "portionCost": 2.462145,
      "priceStatus": "缺售价",
      "recommendedAction": "补华住售卖价或餐标规则"
    },
    {
      "dishName": "泡椒腰花",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "洋葱爆肥肠",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "清炒塔菜",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "清炒小青菜",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "清炒油麦菜",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "清炒菠菜",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 2,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "清蒸龙利鱼",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "灌汤小笼包",
      "mealPeriods": "早餐",
      "categories": "特色类",
      "appearances": 2,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "火山石烤肠",
      "mealPeriods": "午餐",
      "categories": "特色档口",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "烤肠",
      "mealPeriods": "下午茶",
      "categories": "油炸类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "烧麦",
      "mealPeriods": "早餐",
      "categories": "包子类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "煎蛋",
      "mealPeriods": "早餐",
      "categories": "鸡蛋类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "牛奶鸡蛋醪糟",
      "mealPeriods": "午餐",
      "categories": "特色档口",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "牛肉馅饼",
      "mealPeriods": "早餐",
      "categories": "特色类",
      "appearances": 1,
      "portionCost": 4.77356,
      "priceStatus": "缺售价",
      "recommendedAction": "补华住售卖价或餐标规则"
    },
    {
      "dishName": "玉米甜豆鸡丁",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "玉米鲜肉酥饼",
      "mealPeriods": "早餐",
      "categories": "特色类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "甘梅地瓜条",
      "mealPeriods": "下午茶",
      "categories": "油炸类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "生煎马蹄鲜肉酥饼",
      "mealPeriods": "早餐",
      "categories": "特色类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "白煮蛋",
      "mealPeriods": "早餐",
      "categories": "鸡蛋类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "白菜炖豆皮",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "白菜炖豆腐",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "白菜鱼豆腐",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "盐水基围虾",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "盐水鸭",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "粉丝包",
      "mealPeriods": "早餐",
      "categories": "包子类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "糖醋小排",
      "mealPeriods": "午餐",
      "categories": "特色面档",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "红烧牛肉拉面",
      "mealPeriods": "午餐",
      "categories": "特色档口",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "红糖馒头",
      "mealPeriods": "早餐",
      "categories": "包子类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "红豆马蹄羹",
      "mealPeriods": "午餐",
      "categories": "特色档口",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "肉包",
      "mealPeriods": "早餐",
      "categories": "包子类",
      "appearances": 5,
      "portionCost": 1.717963,
      "priceStatus": "缺售价",
      "recommendedAction": "补华住售卖价或餐标规则"
    },
    {
      "dishName": "肉沫虎皮青椒",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "肉沫豆角",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "肉沫豆角炒饭",
      "mealPeriods": "午餐",
      "categories": "主食",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "脆皮烤鸡饭",
      "mealPeriods": "午餐",
      "categories": "特色档口",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "芝麻饼",
      "mealPeriods": "早餐",
      "categories": "特色类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "花菜炒肉片",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "芹菜炒肉丝",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "茄汁锅包肉",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "茶叶蛋",
      "mealPeriods": "早餐",
      "categories": "鸡蛋类",
      "appearances": 5,
      "portionCost": 0.9342308,
      "priceStatus": "缺售价",
      "recommendedAction": "补华住售卖价或餐标规则"
    },
    {
      "dishName": "菜包",
      "mealPeriods": "早餐",
      "categories": "包子类",
      "appearances": 5,
      "portionCost": 2.02699,
      "priceStatus": "缺售价",
      "recommendedAction": "补华住售卖价或餐标规则"
    },
    {
      "dishName": "葱油冬瓜",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "葱油饼",
      "mealPeriods": "午餐",
      "categories": "特色档口",
      "appearances": 1,
      "portionCost": 1.5433675,
      "priceStatus": "缺售价",
      "recommendedAction": "补华住售卖价或餐标规则"
    },
    {
      "dishName": "葱油鸡蛋糕",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "葱烧老豆腐",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "蒜蓉粉丝生蚝",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "虾饼",
      "mealPeriods": "下午茶",
      "categories": "油炸类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "蜂蜜柚子茶",
      "mealPeriods": "下午茶",
      "categories": "饮品",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "蝴蝶香脆鸡",
      "mealPeriods": "下午茶",
      "categories": "油炸类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "西红柿炒蛋",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "西葫芦炒蛋",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "豆角茄子",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "辣子鸡",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 3.60458,
      "priceStatus": "缺售价",
      "recommendedAction": "补华住售卖价或餐标规则"
    },
    {
      "dishName": "过桥米线",
      "mealPeriods": "午餐",
      "categories": "特色档口",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "酒酿圆子",
      "mealPeriods": "午餐",
      "categories": "汤类、特色档口",
      "appearances": 2,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "酸菜牛腩手擀面",
      "mealPeriods": "午餐",
      "categories": "特色档口",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "酸豆角包",
      "mealPeriods": "早餐",
      "categories": "包子类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "酸辣海带丝",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "酸辣鸡杂",
      "mealPeriods": "午餐",
      "categories": "特色面档",
      "appearances": 5,
      "portionCost": 2.19162,
      "priceStatus": "缺售价",
      "recommendedAction": "补华住售卖价或餐标规则"
    },
    {
      "dishName": "锅贴",
      "mealPeriods": "早餐",
      "categories": "特色类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "青椒炒绿豆芽",
      "mealPeriods": "午餐",
      "categories": "蔬菜类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "韭菜盒子",
      "mealPeriods": "早餐",
      "categories": "油炸类、特色类",
      "appearances": 6,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "韭香猪肝",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "韭黄炒蛋",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "香芋羹",
      "mealPeriods": "午餐",
      "categories": "汤类",
      "appearances": 2,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "香菇土豆炖鸡",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "香酥茄子",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "鱼香茄子",
      "mealPeriods": "午餐",
      "categories": "小荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "已匹配",
      "recommendedAction": "建立标准菜名映射或新增成本卡"
    },
    {
      "dishName": "鸡蛋饼",
      "mealPeriods": "早餐",
      "categories": "特色类",
      "appearances": 2,
      "portionCost": 1.24875,
      "priceStatus": "缺售价",
      "recommendedAction": "补华住售卖价或餐标规则"
    },
    {
      "dishName": "麻球",
      "mealPeriods": "早餐",
      "categories": "油炸类",
      "appearances": 5,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "麻辣鸡杂",
      "mealPeriods": "午餐",
      "categories": "大荤类",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    },
    {
      "dishName": "黑椒牛排饭",
      "mealPeriods": "午餐",
      "categories": "特色档口",
      "appearances": 1,
      "portionCost": 0,
      "priceStatus": "缺售价",
      "recommendedAction": "补售价并建立菜名映射/成本卡"
    }
  ],
  "operatingRules": [
    {
      "meal": "早餐",
      "open": "面档",
      "closed": "特色档、炒菜1、炒菜2、炒菜3",
      "output": "早餐 SKU 备货/出餐任务"
    },
    {
      "meal": "午餐",
      "open": "面档、特色档、炒菜1、炒菜2、炒菜3",
      "closed": "无",
      "output": "菜池采购 + 三窗口陈列 + 五档备餐"
    },
    {
      "meal": "晚餐",
      "open": "面档、炒菜1",
      "closed": "特色档、炒菜2、炒菜3",
      "output": "只生成一个炒菜窗口任务"
    }
  ],
  "hardWarnings": [
    "当前同时有售价和成本卡的周菜单菜品数为0，不能宣称已能自动算真实毛利。",
    "供应商报价与成本卡食材名映射缺失，不能自动用上海6月报价刷新菜品成本。",
    "米饭/汤免费自取不产生售价，但必须进入综合成本率。",
    "一菜多窗口展示不能按窗口重复采购，必须按菜池去重。"
  ]
};
