import { Types } from 'mongoose';

export const pipelineForOverAllDoctor = (params: { from: Date; to: Date }) => {
  return [
    {
      $match: {
        dueAmount: { $eq: 0 },
        createdAt: {
          $lte: new Date(params.to),
          $gte: new Date(params.from),
        },
        discountedBy: { $ne: 'free' },
      },
    },
    {
      $lookup: {
        from: 'transations',
        localField: '_id',
        foreignField: 'ref',
        as: 'paymentRef',
      },
    },
    {
      $unwind: { path: '$paymentRef', preserveNullAndEmptyArrays: true },
    },
    {
      $match: {
        'paymentRef.transactionType': 'credit',
      },
    },
    {
      $group: {
        _id: '$_id',
        totalCommission: { $sum: '$paymentRef.amount' },
        totalSell: { $first: '$totalPrice' },
        refBy: { $first: '$refBy' },
      },
    },

    {
      $group: {
        _id: '$refBy',
        sell: { $sum: '$totalSell' },
        exp: { $sum: '$totalCommission' },
      },
    },
    {
      $lookup: {
        from: 'doctors',
        localField: '_id',
        foreignField: '_id',
        as: 'doctor',
      },
    },

    {
      $unwind: '$doctor',
    },
    {
      $setWindowFields: {
        sortBy: { sell: 1 }, // or any other field you want to sort by
        output: {
          SL: { $documentNumber: {} },
        },
      },
    },
  ];
};

export const doctorPerformanceSummeryPipeline = (params: {
  from: Date;
  to: Date;
  refBy: string;
}) => {
  return [
    {
      $match: {
        refBy: new Types.ObjectId(params.refBy),
        dueAmount: 0,
        discountedBy: { $ne: 'free' },
        createdAt: {
          $lte: new Date(params.to),
          $gte: new Date(params.from),
        },
      },
    },
    {
      $lookup: {
        from: 'patients',
        localField: 'uuid',
        foreignField: 'uuid',
        as: 'patientData',
      },
    },
    {
      $unwind: {
        path: '$patientData',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        name: {
          $cond: {
            if: { $eq: ['$patientType', 'registered'] },
            then: { $ifNull: ['$patientData.name', '$patient.name'] },
            else: '$patient.name',
          },
        },
      },
    },
    {
      $unwind: '$tests',
    },
    {
      $match: {
        'tests.status': { $eq: 'delivered' },
      },
    },
    {
      $lookup: {
        from: 'tests',
        localField: 'tests.test',
        foreignField: '_id',
        as: 'testData',
      },
    },
    {
      $unwind: {
        path: '$testData',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'departments',
        localField: 'testData.department',
        foreignField: '_id',
        as: 'departmentData',
      },
    },
    {
      $unwind: {
        path: '$departmentData',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: '$_id',

        name: { $first: '$name' },
        oid: { $first: '$oid' },
        uuid: { $first: '$uuid' },
        departments: {
          $push: {
            departmentName: '$departmentData.label',
            price: '$testData.price',
          },
        },
        testNames: { $addToSet: '$testData.label' },
      },
    },
    {
      $unwind: '$departments',
    },
    {
      $group: {
        _id: {
          orderId: '$_id',
          name: '$name',
          departmentName: '$departments.departmentName',
        },
        totalPrice: { $sum: '$departments.price' },
        testNames: { $first: '$testNames' },
        oid: { $first: '$oid' },
        uuid: { $first: '$uuid' },
      },
    },
    {
      $group: {
        _id: '$_id.orderId',
        name: { $first: '$_id.name' },
        departments: {
          $push: {
            name: '$_id.departmentName',
            price: '$totalPrice',
          },
        },
        testNames: { $first: '$testNames' },
        oid: { $first: '$oid' },
        uuid: { $first: '$uuid' },
      },
    },
    {
      $project: {
        _id: '$_id',
        name: '$name',
        departments: 1,
        testNames: 1,
        oid: 1,
        uuid: 1,
      },
    },
  ];
};

export const doctorOverAllSummeryByRefByPipeline = (params: {
  from: Date;
  to: Date;
  refBy: string;
}) => {
  return [
    {
      $match: {
        refBy: new Types.ObjectId(params.refBy),
        dueAmount: 0,
        discountedBy: { $ne: 'free' },
        createdAt: {
          $lte: new Date(params.to),
          $gte: new Date(params.from),
        },
      },
    },
    {
      $unwind: '$tests',
    },
    {
      $match: {
        'tests.status': { $eq: 'delivered' },
      },
    },
    {
      $lookup: {
        from: 'tests',
        localField: 'tests.test',
        foreignField: '_id',
        as: 'testData',
      },
    },
    {
      $unwind: '$testData',
    },
    {
      $lookup: {
        from: 'departments',
        localField: 'testData.department',
        foreignField: '_id',
        as: 'departmentData',
      },
    },
    {
      $unwind: '$departmentData',
    },

    {
      $addFields: {
        doctorCommission: {
          $cond: {
            if: { $eq: ['$departmentData.isCommissionFiexed', false] },
            then: {
              $divide: [
                {
                  $multiply: [
                    '$testData.price',
                    '$departmentData.commissionParcentage',
                  ],
                },
                100,
              ],
            },
            else: '$departmentData.fixedCommission',
          },
        },
        grossPrice: '$testData.price',
      },
    },
    {
      $addFields: {
        discountAmount: {
          $cond: {
            if: {
              $or: [
                { $gt: ['$tests.discount', 0] },
                { $gt: ['$parcentDiscount', 0] },
              ],
            },
            then: {
              $cond: {
                if: { $gt: ['$tests.discount', 0] },
                then: {
                  $divide: [
                    { $multiply: ['$testData.price', '$tests.discount'] },
                    100,
                  ],
                },
                else: {
                  $cond: {
                    if: { $gt: ['$parcentDiscount', 0] },
                    then: {
                      $divide: [
                        { $multiply: ['$testData.price', '$parcentDiscount'] },
                        100,
                      ],
                    },
                    else: 0,
                  },
                },
              },
            },
            else: 0,
          },
        },
        cdft: {
          $cond: {
            if: { $gt: ['$cashDiscount', 0] },
            then: {
              $toInt: {
                $multiply: [
                  { $divide: ['$testData.price', '$totalPrice'] },
                  '$testData.price',
                ],
              },
            },
            else: 0,
          },
        },
      },
    },

    {
      $addFields: {
        discountByDoctor: {
          $cond: {
            if: {
              $or: [
                { $eq: ['$discountedBy', 'doctor'] },
                { $eq: ['$discountedBy', 'both'] },
              ],
            },
            then: {
              $switch: {
                branches: [
                  {
                    case: { $eq: ['$discountedBy', 'doctor'] },
                    then: '$discountAmount',
                  },
                  {
                    case: { $eq: ['$discountedBy', 'both'] },
                    then: { $divide: ['$discountAmount', 2] },
                  },
                ],
                default: 0,
              },
            },
            else: 0,
          },
        },
      },
    },

    {
      $project: {
        grossPrice: 1,
        departmentData: 1,
        discountedBy: 1,
        parcentDiscount: 1,
        netCommission: {
          $subtract: ['$doctorCommission', '$discountByDoctor'],
        },
        cashDiscount: 1,
        orderPrice: '$totalPrice',
        discountAmount: 1,
        cdft: 1,
        discountByDoctor: 1,
      },
    },
    {
      $group: {
        _id: '$departmentData.label',
        total: { $sum: '$grossPrice' },
        commission: { $sum: '$netCommission' },
        percent: { $first: '$departmentData.commissionParcentage' },
        totalPrice: { $sum: '$grossPrice' },
        discount: { $sum: '$discountByDoctor' },
      },
    },
  ];
};

export const testWiseIncomeStatementPipeline = (params: {
  from: Date;
  to: Date;
}) => {
  return [
    {
      $match: {
        discountedBy: { $ne: 'free' },
        createdAt: {
          $lte: new Date(params.to),
          $gte: new Date(params.from),
        },
      },
    },
    {
      $unwind: {
        path: '$tests',
      },
    },

    {
      $lookup: {
        from: 'tests',
        localField: 'tests.test',
        foreignField: '_id',
        as: 'td',
      },
    },
    {
      $unwind: {
        path: '$td',
      },
    },
    {
      $match: {
        'tests.status': { $ne: 'refunded' },
      },
    },
    {
      $addFields: {
        rg: {
          $cond: {
            if: { $eq: [{ $type: '$td.reportGroup' }, 'string'] },
            then: {
              $cond: {
                if: { $eq: [{ $strLenCP: '$td.reportGroup' }, 24] },
                then: { $toObjectId: '$td.reportGroup' },
                else: null,
              },
            },
            else: '$td.reportGroup',
          },
        },
      },
    },

    {
      $lookup: {
        from: 'reportgroups',
        localField: 'rg',
        foreignField: '_id',
        as: 'rgd',
      },
    },
    {
      $unwind: '$rgd',
    },
    {
      $addFields: {
        pd: {
          $cond: {
            if: {
              $or: [
                { $gt: ['$parcentDiscount', 0] },
                { $gt: ['$tests.discount', 0] },
              ],
            },
            then: {
              $cond: {
                if: { $gt: ['$tests.discount', 0] },
                then: {
                  $divide: [
                    { $multiply: ['$td.price', '$tests.discount'] },
                    100,
                  ],
                },
                else: {
                  $cond: {
                    if: { $gt: ['$parcentDiscount', 0] },
                    then: {
                      $divide: [
                        { $multiply: ['$td.price', '$parcentDiscount'] },
                        100,
                      ],
                    },
                    else: 0,
                  },
                },
              },
            },
            else: 0,
          },
        },
        cd: {
          $cond: {
            if: { $gt: ['$cashDiscount', 0] },
            then: {
              $floor: {
                $multiply: [
                  { $divide: ['$cashDiscount', '$totalPrice'] },
                  '$td.price',
                ],
              },
            },
            else: 0,
          },
        },
        va: {
          $cond: {
            if: { $gt: ['$vat', 0] },
            then: { $divide: [{ $multiply: ['$td.price', '$vat'] }, 100] },
            else: 0,
          },
        },
        pa: {
          $cond: {
            if: { $gt: ['paid', 0] },
            then: {
              $floor: {
                $multiply: [{ $divide: ['$paid', '$totalPrice'] }, '$td.price'],
              },
            },
            else: 0,
          },
        },
      },
    },
    {
      $addFields: {
        netDiscount: {
          $switch: {
            branches: [
              { case: { $eq: ['$discountedBy', 'doctor'] }, then: 0 },
              {
                case: { $eq: ['$discountedBy', 'both'] },
                then: { $divide: [{ $add: ['$cd', '$pd'] }, 2] },
              },
            ],
            default: { $add: ['$cd', '$pd'] },
          },
        },
      },
    },

    {
      $facet: {
        testWiseDocs: [
          {
            $group: {
              _id: '$td.label',
              sell: { $sum: '$td.price' },

              quantity: { $sum: 1 },
              price: { $first: '$td.price' },
              discount: { $sum: '$netDiscount' },
              vat: { $sum: '$va' },
              pa: { $sum: '$pa' },
              rg: { $first: '$rgd.label' },
            },
          },
          {
            $sort: { price: -1 },
          },
        ],
        reportGroupWiseData: [
          {
            $group: {
              _id: '$rgd.label',
              sell: { $sum: '$td.price' },

              quantity: { $sum: 1 },
              price: { $first: '$td.price' },
              discount: { $sum: '$netDiscount' },
              vat: { $sum: '$va' },
              pa: { $sum: '$pa' },
              rg: { $first: '$rgd.label' },
            },
          },
          {
            $sort: { price: -1 },
          },
        ],

        total: [
          {
            $group: {
              _id: null,
              sell: { $sum: '$td.price' },

              quantity: { $sum: 1 },
              discount: { $sum: '$netDiscount' },
              vat: { $sum: '$va' },
              pa: { $sum: '$pa' },
            },
          },
        ],

        tubePrice: [
          {
            $unwind: '$td.testTube',
          },
          {
            $group: {
              _id: '$oid',
              tube: {
                $addToSet: '$td.testTube',
              },
              cashDiscount: { $first: '$cashDiscount' },
              parcentDiscount: { $first: '$parcentDiscount' },
              vat: { $first: '$vat' },
              paid: { $first: '$paid' },
              totalPrice: { $first: '$totalPrice' },
            },
          },
          {
            $unwind: '$tube',
          },
          {
            $lookup: {
              from: 'vacuumtubes',
              localField: 'tube',
              foreignField: '_id',
              as: 'tubeData',
            },
          },
          {
            $unwind: '$tubeData',
          },
          {
            $addFields: {
              va: {
                $cond: {
                  if: { $gt: ['$vat', 0] },
                  then: {
                    $divide: [{ $multiply: ['$tubeData.price', '$vat'] }, 100],
                  },
                  else: 0,
                },
              },
              pa: {
                $cond: {
                  if: { $gt: ['paid', 0] },
                  then: {
                    $floor: {
                      $multiply: [
                        { $divide: ['$paid', '$totalPrice'] },
                        '$tubeData.price',
                      ],
                    },
                  },
                  else: 0,
                },
              },
            },
          },
          {
            $group: {
              _id: '$tubeData.label',
              sell: { $sum: '$tubeData.price' },
              price: { $first: '$tubeData.price' },
              vat: { $sum: '$va' },
              pa: { $sum: '$pa' },
              quantity: { $sum: 1 },
            },
          },
        ],
      },
    },
  ];
};

export const departmentWiseIncomeStatement = (params: {
  from: Date;
  to: Date;
}) => {
  return [
    {
      $match: {
        discountedBy: { $ne: 'free' },
        createdAt: {
          $lte: new Date(params.to),
          $gte: new Date(params.from),
        },
      },
    },
    {
      $unwind: {
        path: '$tests',
      },
    },

    {
      $lookup: {
        from: 'tests',
        localField: 'tests.test',
        foreignField: '_id',
        as: 'td',
      },
    },
    {
      $unwind: {
        path: '$td',
      },
    },
    {
      $match: {
        $and: [
          {
            'tests.status': { $ne: 'refunded' },
          },
          { 'tests.status': { $ne: 'free' } },
        ],
      },
    },
    {
      $addFields: {
        rg: {
          $cond: {
            if: { $eq: [{ $type: '$td.reportGroup' }, 'string'] },
            then: {
              $cond: {
                if: { $eq: [{ $strLenCP: '$td.reportGroup' }, 24] },
                then: { $toObjectId: '$td.reportGroup' },
                else: null,
              },
            },
            else: '$td.reportGroup',
          },
        },
      },
    },

    {
      $lookup: {
        from: 'reportgroups',
        localField: 'rg',
        foreignField: '_id',
        as: 'rgd',
      },
    },
    {
      $unwind: '$rgd',
    },
    {
      $addFields: {
        pd: {
          $cond: {
            if: {
              $or: [
                { $gt: ['$parcentDiscount', 0] },
                { $gt: ['$tests.discount', 0] },
              ],
            },
            then: {
              $cond: {
                if: { $gt: ['$tests.discount', 0] },
                then: {
                  $divide: [
                    { $multiply: ['$td.price', '$tests.discount'] },
                    100,
                  ],
                },
                else: {
                  $cond: {
                    if: { $gt: ['$parcentDiscount', 0] },
                    then: {
                      $divide: [
                        { $multiply: ['$td.price', '$parcentDiscount'] },
                        100,
                      ],
                    },
                    else: 0,
                  },
                },
              },
            },
            else: 0,
          },
        },
        cd: {
          $cond: {
            if: { $gt: ['$cashDiscount', 0] },
            then: {
              $floor: {
                $multiply: [
                  { $divide: ['$cashDiscount', '$totalPrice'] },
                  '$td.price',
                ],
              },
            },
            else: 0,
          },
        },
        va: {
          $cond: {
            if: { $gt: ['$vat', 0] },
            then: { $divide: [{ $multiply: ['$td.price', '$vat'] }, 100] },
            else: 0,
          },
        },
        pa: {
          $cond: {
            if: { $gt: ['paid', 0] },
            then: {
              $floor: {
                $multiply: [{ $divide: ['$paid', '$totalPrice'] }, '$td.price'],
              },
            },
            else: 0,
          },
        },
      },
    },
    {
      $lookup: {
        from: 'departments',
        localField: 'td.department',
        foreignField: '_id',
        as: 'dd',
      },
    },
    {
      $unwind: '$dd',
    },
    {
      $addFields: {
        netDiscount: {
          $switch: {
            branches: [
              { case: { $eq: ['$discountedBy', 'doctor'] }, then: 0 },
              {
                case: { $eq: ['$discountedBy', 'both'] },
                then: { $divide: [{ $add: ['$cd', '$pd'] }, 2] },
              },
            ],
            default: { $add: ['$cd', '$pd'] },
          },
        },
      },
    },

    {
      $facet: {
        deptWiseDocs: [
          {
            $group: {
              _id: '$dd.label',
              sell: { $sum: '$td.price' },

              discount: { $sum: '$netDiscount' },
              vat: { $sum: '$va' },
              pa: { $sum: '$pa' },
              quantity: { $sum: 1 },
            },
          },
          {
            $sort: { price: -1 },
          },
        ],
        total: [
          {
            $group: {
              _id: null,
              sell: { $sum: '$td.price' },

              discount: { $sum: '$netDiscount' },
              vat: { $sum: '$va' },
              pa: { $sum: '$pa' },
              quantity: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 'Total',
              sell: 1,
              discount: 1,
              vat: 1,
              pa: 1,
              quantity: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        combined: {
          $concatArrays: ['$deptWiseDocs', '$total'],
        },
      },
    },
    {
      $unwind: '$combined',
    },
    {
      $replaceRoot: { newRoot: '$combined' },
    },
  ];
};
